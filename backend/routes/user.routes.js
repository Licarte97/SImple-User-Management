const router = require('express').Router();
const { getUsers, addUser, deleteUser, updateUser } = require('../controller/user.controller');
const { authenticateToken } = require('../controller/auth.controller');

// router.get('/', authenticateToken, getUsers);
router.get('/', getUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;