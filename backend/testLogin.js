const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

async function testLogin() {
  try {
    console.log('\n=== Testing Login Functionality ===\n');

    // Test 1: Check if users exist
    console.log('1. Checking users in database...');
    const [users] = await db.query('SELECT user_id, username, email, user_role FROM Users');
    console.log(`   Found ${users.length} users`);
    users.forEach(u => {
      console.log(`   - ${u.username} (${u.email}) [${u.user_role || 'REGULAR'}]`);
    });

    // Test 2: Verify password hashes
    console.log('\n2. Checking password hashes...');
    const [adminUser] = await db.query('SELECT * FROM Users WHERE email = ?', ['admin@moviemate.com']);
    if (adminUser.length > 0) {
      const admin = adminUser[0];
      console.log('   Admin user found:', admin.email);

      // Test password: admin123
      const isValidAdmin = await bcrypt.compare('admin123', admin.password_hash);
      console.log(`   Admin password (admin123): ${isValidAdmin ? '✓ Valid' : '✗ Invalid'}`);
    } else {
      console.log('   ✗ Admin user not found!');
    }

    const [regularUser] = await db.query('SELECT * FROM Users WHERE email = ?', ['john@example.com']);
    if (regularUser.length > 0) {
      const user = regularUser[0];
      console.log('   Regular user found:', user.email);

      // Test password: user123
      const isValidUser = await bcrypt.compare('user123', user.password_hash);
      console.log(`   User password (user123): ${isValidUser ? '✓ Valid' : '✗ Invalid'}`);
    } else {
      console.log('   ✗ Regular user not found!');
    }

    // Test 3: Test JWT generation
    console.log('\n3. Testing JWT token generation...');
    if (adminUser.length > 0) {
      const admin = adminUser[0];
      const payload = {
        user_id: admin.user_id,
        username: admin.username,
        user_role: admin.user_role
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
      console.log('   ✓ JWT token generated successfully');
      console.log('   Token preview:', token.substring(0, 50) + '...');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('   ✓ JWT token verified successfully');
      console.log('   Decoded payload:', decoded);
    }

    // Test 4: Check movies
    console.log('\n4. Checking movies in database...');
    const [movies] = await db.query('SELECT movie_id, title, release_year FROM Movies');
    console.log(`   Found ${movies.length} movies`);
    movies.forEach(m => {
      console.log(`   - ${m.title} (${m.release_year})`);
    });

    console.log('\n=== All Tests Completed Successfully! ===\n');
    console.log('You can now:');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Open frontend/index.html in a browser');
    console.log('3. Login with:');
    console.log('   - Email: admin@moviemate.com, Password: admin123 (Admin)');
    console.log('   - Email: john@example.com, Password: user123 (Regular User)\n');

  } catch (error) {
    console.error('\n✗ Error during testing:', error.message);
    console.error('\nPlease check:');
    console.error('1. MySQL server is running');
    console.error('2. Database "moviemate" exists');
    console.error('3. Run sql/init.sql to create tables and seed data');
    console.error('4. .env file has correct database credentials\n');
  } finally {
    process.exit(0);
  }
}

testLogin();
