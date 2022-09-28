const net = require('node:net');
var prompt = require('prompt-sync')();

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const username = prompt("Username: ")
const userPort = parseInt(prompt("I would suggest using 8080. Port: "))

if (userPort !== 8080) {
  throw new Error("Server not found")
}

const client = net.createConnection({port: userPort}, () => {
  console.log(`${username} connected to the server`)

  client.on('data', (data) => {
    console.log(data.toString())
  })

  client.on('end', () => {
    console.log(`${username} disconnected from the server`)
    rl.close()
  })

  rl.on('line', (input) => {
    client.write(`${username}: ${input}`)
    if (input === 'quit') {
      client.end()
    }
  })

})

