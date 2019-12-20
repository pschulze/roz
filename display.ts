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

app.get('/testroute', (req, res) => {
  res.send('test route');
})

io.on('connection', function (socket : Socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data: any) {
    console.log(data);
  });

  socket.on('change view', (data : any) => {
    console.log("change view called");
  })
});

function testFunc(){
  console.log("Test called");
  io.emit('change view');
}

module.exports = {testFunc}