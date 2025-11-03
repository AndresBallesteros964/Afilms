const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main/home', { page: 'inicio' });
});

router.get('/directorio', (req, res) => {
  res.render('main/directorio', { page: 'directorio' });
});

router.get('/top', (req, res) => {
  res.render('main/top', { page: 'top' });
});


router.get('/comunidad', (req, res) => {
  res.render('main/comunidad', { page: 'comunidad' });
});

router.get('/historial', (req, res) => {
  res.render('main/historial', { page: 'historial' });
});

router.get('/User', (req, res) => {
  res.render('main/User', { page: 'User' });
});


module.exports = router;
