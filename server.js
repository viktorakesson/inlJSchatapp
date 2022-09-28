const net = require('node:net');

var server = net.createServer()

const sockets = []

const broadcast = (socket, message) => {
  sockets
    .filter((sock) => sock !== socket)
    .forEach((sock) => {
    sock.write(message)
  })
}

const startMessage = (socket) => {
  socket.write(`Welcome. There are currently ${sockets.length} user(s) in the chat. To leave the chat type 'quit'`)
  
}

server.on('connection', (socket) => {

  console.log('Client connected')
  sockets.push(socket)
  startMessage(socket)
  
  socket.on('data', (data) => {
    console.log(data.toString())
    broadcast(socket, data.toString())
  })

  socket.on("close", () => { 
    console.log("Client connection closed.");
    const index = sockets.indexOf(socket)
    sockets.splice(index, 1)
  }); 

})

server.on('error', (err) => {
  console.log(err)
});

server.listen(8080, () => {
  console.log('Server listening on port', server.address().port)
})

