const util = require('../src/util');

describe('Shuffle Function tests', () => {
  test('Suffle the array, should exist and not return null. Then check should not be the same as what was provided', () => {
    const result = JSON.stringify(util.shuffle([1,2,3,4,5,6,7,8,9]));
    expect(result).toBeDefined();
    expect(result).not.toBe([1,2,3,4,5,6,7,8,9]);
  });
});

//describe('Parse function tests', () => {});

describe('Response Headers Tests', () => {
  it('should return this "Access-Control-Allow-Origin": "*"', ()=>{
    const result = util.getResponseHeaders();
    const expectedResult = {
      'Access-Control-Allow-Origin': '*'
    }
    expect(result).toStrictEqual(expectedResult)
  });
});


