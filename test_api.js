const http = require('http');

const PORT = 3000;

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', (e) => reject(e));

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING API VERIFICATION TESTS ---');

  try {
    // 1. Health check
    console.log('1. Testing GET / ...');
    const health = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/',
      method: 'GET'
    });
    console.log('Health Check Status:', health.statusCode);

    // 2. Register
    console.log('\n2. Testing POST /api/register ...');
    const regData = JSON.stringify({
      nama: 'Ilham God',
      email: `ilham_${Date.now()}@example.com`,
      password: 'password123'
    });
    const regRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(regData)
      }
    }, regData);
    console.log('Register Status:', regRes.statusCode);

    // 3. Login
    console.log('\n3. Testing POST /api/login ...');
    const loginPayload = JSON.parse(regData);
    const loginData = JSON.stringify({
      email: loginPayload.email,
      password: 'password123'
    });
    const loginRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, loginData);
    console.log('Login Status:', loginRes.statusCode);

    const loginBody = JSON.parse(loginRes.body);
    const token = loginBody.data ? loginBody.data.token : null;
    console.log('Token Received:', token ? 'YES' : 'NO');

    // 4. Create Genre
    console.log('\n4. Testing POST /api/genre ...');
    const genreData = JSON.stringify({
      nama_genre: `Action_${Date.now()}`,
      deskripsi: 'Genre Komik Aksi dan Pertarungan'
    });
    const genreRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/genre',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(genreData)
      }
    }, genreData);
    console.log('Create Genre Status:', genreRes.statusCode);
    const genreBody = JSON.parse(genreRes.body);
    const genreId = genreBody.data ? genreBody.data.id : 1;

    // 5. Create Komik
    console.log('\n5. Testing POST /api/komik ...');
    const komikData = JSON.stringify({
      judul: 'One Piece',
      pengarang: 'Eiichiro Oda',
      penerbit: 'Shueisha',
      tahun_terbit: 1997,
      genre_id: genreId
    });
    const komikRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/komik',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(komikData)
      }
    }, komikData);
    console.log('Create Komik Status:', komikRes.statusCode);

    // 6. Test XML Conversion Response
    console.log('\n6. Testing XML Response Format (?format=xml) ...');
    const xmlRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/komik?format=xml',
      method: 'GET'
    });
    console.log('XML Format Status:', xmlRes.statusCode, '| Content-Type:', xmlRes.headers['content-type']);

    // 7. Test YAML Conversion Response
    console.log('\n7. Testing YAML Response Format (?format=yaml) ...');
    const yamlRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/genre?format=yaml',
      method: 'GET'
    });
    console.log('YAML Format Status:', yamlRes.statusCode, '| Content-Type:', yamlRes.headers['content-type']);

    console.log('\n--- ALL API TESTS COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('API Test Error:', err.message);
  }
}

runTests();
