const bcrypt = require('bcrypt');

async function generateHashes() {
  const adminPassword = 'admin123'; // Default admin password
  const userPassword = 'user123';   // Default user password

  const adminHash = await bcrypt.hash(adminPassword, 10);
  const userHash = await bcrypt.hash(userPassword, 10);

  console.log('Admin password: admin123');
  console.log('Admin hash:', adminHash);
  console.log('\nUser password: user123');
  console.log('User hash:', userHash);
}

generateHashes();
