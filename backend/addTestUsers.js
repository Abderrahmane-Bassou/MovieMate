const bcrypt = require('bcrypt');
const db = require('./db');

async function addTestUsers() {
  try {
    console.log('\n=== Adding New Test Users ===\n');

    // Generate password hashes
    const adminPassword = 'testadmin123';
    const userPassword = 'testuser123';

    const adminHash = await bcrypt.hash(adminPassword, 10);
    const userHash = await bcrypt.hash(userPassword, 10);

    // Insert test admin user
    const [adminResult] = await db.query(
      'INSERT INTO Users (username, email, password_hash, user_role) VALUES (?, ?, ?, ?)',
      ['TestAdmin', 'testadmin@moviemate.com', adminHash, 'ADMIN']
    );
    console.log('✓ Test Admin user created');
    console.log(`  Email: testadmin@moviemate.com`);
    console.log(`  Password: testadmin123`);
    console.log(`  User ID: ${adminResult.insertId}\n`);

    // Insert test regular user
    const [userResult] = await db.query(
      'INSERT INTO Users (username, email, password_hash, user_role) VALUES (?, ?, ?, ?)',
      ['TestUser', 'testuser@moviemate.com', userHash, 'REGULAR']
    );
    console.log('✓ Test Regular user created');
    console.log(`  Email: testuser@moviemate.com`);
    console.log(`  Password: testuser123`);
    console.log(`  User ID: ${userResult.insertId}\n`);

    console.log('=== Users Added Successfully! ===\n');
    console.log('You can now login with:');
    console.log('- Admin: testadmin@moviemate.com / testadmin123');
    console.log('- User: testuser@moviemate.com / testuser123\n');

    // Show all users
    const [users] = await db.query('SELECT user_id, username, email, user_role FROM Users ORDER BY user_id');
    console.log('All users in database:');
    console.table(users);

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('\n✗ Error: Users already exist with these email addresses');
      console.error('   The test users have already been added.\n');
      console.log('Login credentials:');
      console.log('- Admin: testadmin@moviemate.com / testadmin123');
      console.log('- User: testuser@moviemate.com / testuser123\n');
    } else {
      console.error('\n✗ Error adding users:', error.message);
    }
  } finally {
    process.exit(0);
  }
}

addTestUsers();
