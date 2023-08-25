//copy paste in middleware.js
const path = require('path');
const fs = require('fs');
const { is } = require('bluebird');

const ROLES_FILE = path.join(__dirname, 'roles.txt');

function checkRole(mapper, localScope, action, role) {
  for (let i of mapper) {
    if (role === i.role) {
      const { scopes } = i;
      if (scopes[localScope]) {
        return scopes[localScope].includes(action);  
      }
    }
  }
  return false;
}

module.exports = (scope) => (req, res, next) => {
  const role = req.headers["x-role"];
  if (!role) {
    res.status(403).json({});
    return;  // Added return to exit the function
  }

  fs.readFile(ROLES_FILE, "utf8", (err, data) => {
    if (err) {
      res.status(403).json({});
      return;  // Added return to exit the function
    }

    const [localScope, action] = scope.split(".");
    const mapper = JSON.parse(data.toString("utf8").replace(/^\uFEFF/, ""));
    const isAllowed = checkRole(mapper, localScope, action, role);  
    
    if (isAllowed) {
      next();
    } else {
      res.status(403).json({});
    }
  });
};


// and change routes/tasks.js var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/tasks.controller');
var middleware = require('../middleware');

router
    .post('/',
        middleware('tasks.create'),
        tasksController.create)
    .get('/',tasksController.getAll)
    .get('/:id',
        middleware('tasks.getById'),
        tasksController.getById);

module.exports = router;

