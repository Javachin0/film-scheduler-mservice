import Schedulizer from '../src/schedulizer';
const fs = require('fs');
let testDataCatelogue;

//Setup --catelogue Test data
beforeEach(() => {
    testDataCatelogue = fs.readFileSync(__dirname +'/Assets/films.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()); // remove white spaces for each line
    //.map(e => e.split(',').map(e => e.trim())); // split each line to array;   
});

  test('Instantiate a schedulizer object, test that it returns a whole scheduled day', () => {
    const obj = new Schedulizer(testDataCatelogue);
    const testResult = obj.populateDay();
    expect(testResult).toBeDefined();
  });