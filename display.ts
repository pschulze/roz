import express from 'express';
import { Socket } from 'socket.io';
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3001;

app.set('view engine', 'ejs');

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/display', (req, res) => {
  res.render('pages/display');
});

io.on('connection', function (socket : Socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data: any) {
    console.log(data);
  });
});