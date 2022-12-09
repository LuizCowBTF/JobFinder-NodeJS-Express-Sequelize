const express = require ('express');
const app = express();
const db = require ('./db/connection');
const bodyParser = require ('body-parser');

const port = 3000;

app.listen(3000, function() {
   console.log(`SERVIDOR na porta ${port}`);
})

/** body-parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
   res.send("Esta rodando!");
});

/** jobs routes */
app.use('/jobs', require("./routes/jobs"));


