import express from 'express';
const app = express();
const port = 3001;

app.set('view engine', 'ejs');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/display', (req, res) => {
  res.render('pages/display');
});