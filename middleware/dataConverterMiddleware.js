const xml2js = require('xml2js');
const yaml = require('js-yaml');
const { toXML } = require('jstoxml');

const dataConverterMiddleware = (req, res, next) => {
  // Deserialization: Parse XML or YAML request bodies
  const contentType = req.headers['content-type'] || '';

  if (contentType.includes('application/xml') || contentType.includes('text/xml')) {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      xml2js.parseString(data, { explicitArray: false }, (err, result) => {
        if (!err && result) {
          req.body = result.root || result;
        }
        next();
      });
    });
    return;
  }

  if (contentType.includes('application/x-yaml') || contentType.includes('text/yaml')) {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try {
        req.body = yaml.load(data);
      } catch (e) {
        console.warn('YAML parsing warning:', e.message);
      }
      next();
    });
    return;
  }

  // Multi-format Serialization based on Accept header or query param ?format=xml/yaml
  const originalJson = res.json.bind(res);
  const requestedFormat = (req.query.format || '').toLowerCase();
  const acceptHeader = req.headers['accept'] || '';

  res.sendFormatted = (data) => {
    if (requestedFormat === 'xml' || acceptHeader.includes('application/xml')) {
      res.header('Content-Type', 'application/xml');
      const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>\n<response>${toXML(data)}</response>`;
      return res.send(xmlOutput);
    }
    if (requestedFormat === 'yaml' || acceptHeader.includes('application/x-yaml')) {
      res.header('Content-Type', 'application/x-yaml');
      return res.send(yaml.dump(data));
    }
    return originalJson(data);
  };

  next();
};

module.exports = dataConverterMiddleware;
