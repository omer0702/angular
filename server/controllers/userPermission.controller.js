const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/db.json');

const readDB = () => JSON.parse(fs.readFileSync(dbPath));

exports.getAll = (req, res) => {
  res.json(readDB().userPermissions);
};

exports.create = (req, res) => {
  const db = readDB();
  const up = { id: Date.now(), ...req.body };
  db.userPermissions.push(up);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(up);
};

exports.remove = (req, res) => {
  const db = readDB();
  db.userPermissions = db.userPermissions.filter(up => up.id !== +req.params.id);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.sendStatus(204);
};
