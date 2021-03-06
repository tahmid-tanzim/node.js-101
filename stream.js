/**
 * Note: 'fs' is a core module to deal with File System.
 * */
var fileSystem = require('fs');
var stream = fileSystem.createReadStream('./data/flights.json');

stream.pause();
console.log('paused');

setTimeout(function () {
    console.log('resuming...');
    stream.resume();
}, 1000);

stream.on('data', function (chunk) {
    console.log('-------- Begin Chunk -------');
    console.log(chunk.toString());
    console.log('-------- End Chunk -------');
});

stream.on('data', function (chunk) {
    console.log('Chunk Length is: ' + chunk.length);
});

stream.on('end', function (chunk) {
    console.log('-------- Reached File End -------');
});
