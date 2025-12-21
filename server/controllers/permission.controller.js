const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/db.json');

const readDB = () => JSON.parse(fs.readFileSync(dbPath));

exports.getAll = (req, res) => {
  res.json(readDB().permissions);
};

exports.create = (req, res) => {
  const db = readDB();
  const perm = { id: Date.now(), ...req.body };
  db.permissions.push(perm);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(perm);
};

exports.update = (req, res) => {
  const db = readDB();
  const id = +req.params.id;
  const idx = db.permissions.findIndex(p => p.id === id);
  db.permissions[idx] = { ...db.permissions[idx], ...req.body };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(db.permissions[idx]);
};

exports.remove = (req, res) => {
  const db = readDB();
  db.permissions = db.permissions.filter(p => p.id !== +req.params.id);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.sendStatus(204);
};
