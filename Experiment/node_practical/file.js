const fs = require('fs');

fs.writeFileSync('student.txt', 'Rahul logged in\n');
console.log("File created and data written");

const data = fs.readFileSync('student.txt', 'utf8');
console.log("File Content:", data);

fs.appendFileSync('student.txt', 'Aman submitted assignment\n');
console.log("Data appended");

const updatedData = fs.readFileSync('student.txt', 'utf8');
console.log("Updated Content:");
console.log(updatedData);