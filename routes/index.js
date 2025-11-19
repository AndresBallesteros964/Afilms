const express = require('express');
const router = express.Router();

//  controladores
const { homeController } = require('../controller/homeController');
const { directorioController, apiDirectorio } = require("../controller/directorioController");

// rutas
router.get('/', homeController);

router.get("/directorio", directorioController);
router.get("/api/directorio", apiDirectorio);


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
