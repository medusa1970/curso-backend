const router = require('express').Router();
const petController = require('../controllers/petController');

router.post('/', petController.post); // POST: /api/pets register
router.get('/', petController.get); // GET: /api/pets list
router.post('/login', petController.login); // POST: /api/pets login
router.put('/:id', petController.put); // PUT: /api/pets/:id update
router.delete('/:id', petController.delete); // DELETE: /api/pets/:id delete

module.exports = router;
