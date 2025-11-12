const db = require('../db');

async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
}

async function findById(id) {
  const [rows] = await db.query('SELECT user_id, username, email, user_role, created_at FROM Users WHERE user_id = ?', [id]);
  return rows[0];
}

async function createUser(username, email, passwordHash, role='REGULAR') {
  const [result] = await db.query('INSERT INTO Users (username, email, password_hash, user_role) VALUES (?, ?, ?, ?)', [username, email, passwordHash, role]);
  return { insertId: result.insertId };
}

async function getAllUsers() {
  const [rows] = await db.query('SELECT user_id, username, email, user_role, created_at FROM Users');
  return rows;
}

async function deleteUser(id) {
  const [result] = await db.query('DELETE FROM Users WHERE user_id = ?', [id]);
  return result;
}

module.exports = { findByEmail, findById, createUser, getAllUsers, deleteUser };
