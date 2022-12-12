const express     = require('express');
const { engine }  = require('express-handlebars');
const app         = express();
const path        = require('path');  
const db          = require('./db/connection');
const bodyParser  = require('body-parser');

const port = 3000;

app.listen(3000, function() {
   console.log(`SERVIDOR na porta ${port}`);
})

/** body-parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** handle bars */
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({extname: '.handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/** static folder */
app.use(express.static(path.join(__dirname, 'public')));

/** databank connection */
db
   .authenticate()
   .then(() => {
      console.log("BANCO DE DADOS CONECTADO COM SUCESSO!");
   })
   .catch(err => {
      console.log("Ocorreu um erro ao conectar ao banco de dados!", err);
   });

/** routes */
app.get('/', (req, res) => {
   res.render('index');
});

/** jobs routes */
app.use('/jobs', require('./routes/jobs'));


