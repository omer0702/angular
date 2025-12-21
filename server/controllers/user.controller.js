const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/db.json');

const readDB = () => JSON.parse(fs.readFileSync(dbPath));

exports.getAll = (req, res) => {
  res.json(readDB().users);
};

exports.create = (req, res) => {
  const db = readDB();
  const newUser = { id: Date.now(), ...req.body };
  db.users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newUser);
};

exports.update = (req, res) => {
  const db = readDB();
  const id = +req.params.id;
  const idx = db.users.findIndex(u => u.id === id);
  db.users[idx] = { ...db.users[idx], ...req.body };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(db.users[idx]);
};

exports.remove = (req, res) => {
  const db = readDB();
  db.users = db.users.filter(u => u.id !== +req.params.id);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.sendStatus(204);
};
