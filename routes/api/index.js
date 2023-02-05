const router = require('express').Router();
const userRoutes = require('./user');
// const thoughtRoutes = require('./thought');

router.use('/users', userRoutes);  // Routing to .com/api/users/
// router.use('/thoughts', thoughtRoutes); // Routing to .com/api/thoughts/

module.exports = router;
