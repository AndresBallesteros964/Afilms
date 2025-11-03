const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const port = process.env.PORT || 3001;

//configurando EJS COMO MOTOR DE VISTA
app.set('view engine', 'ejs');

//------------MIDDLEWARES----------------
//Configurando directorios publicos
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//rutas
const Routes = require('./routes/index.js');

//usar las rutas
app.use('/', Routes);
app.listen (port, () => {
    console.log("Servidor sonando en : http://localhost:" + port )
});