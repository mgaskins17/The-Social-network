const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes); // Routing to .com/api/

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;