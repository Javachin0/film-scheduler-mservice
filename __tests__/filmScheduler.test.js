const filmScheduler = require('../src/filmScheduler');
const utilMock = require('../src/util');
const schedulizer = require('../src/schedulizer');
jest.mock('../src/schedulizer')
jest.mock('../')
//auto mocks
const mockDay = utilMock.parseDays = jest.fn();
utilMock.parseFilms = jest.fn();

jest.mock('../src/schedulizer'); // this happens automatically with automocking
Schedulizer.populateDay = jest.fn();

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Schedulizer.mockClear();
});

//Setup --catelogue Test data
test('if the function returns atleast 7 days worth of data', () =>{
    mockDay.mockReturnValue(7);
    const result = filmScheduler.getSchedule();
    expect(result.length).toEqual(7)
});