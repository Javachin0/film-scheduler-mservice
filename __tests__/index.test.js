const index = require('../src/index.js');
var event = require('../events/event.json');

test('Test the handler', () =>{
    const testResult = index.handler(event);
    expect(testResult).toBeDefined();
})
