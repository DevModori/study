var events = require('events');

var eventEmitter = new events.EventEmitter();

var connectHandler = function conneted() {
    console.log("Connection Successful");

    eventEmitter.emit("data_received");
}

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function() {
    console.log("Data Received");
})

eventEmitter.emit('connection');

console.log("Program has ended");