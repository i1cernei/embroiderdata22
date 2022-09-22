const express = require("express");
const cors = require('cors');
const path = require('path');


// Set default port for express app
const PORT = process.env.PORT || 4001

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {origin: "*"}
});

io.on('connection', (socket) => {
  console.log('user connected', socket.id);

  socket.on('newData', (data) => {
    // console.log('interfaceData:', data);
    // console.log(data);
    io.emit('stateChange', data);
  })


  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
})

app.use(express.static(__dirname + '/build'));
app.use(cors());


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
server.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)

})

