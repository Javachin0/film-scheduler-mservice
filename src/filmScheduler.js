const util = require('./util');
const Schedulizer = require('./schedulizer');
exports.getSchedule = function (payload) {

    let films = util.parseFilms(payload);
    let totalDays = util.parseDays(payload);
    let schedule = [];

    //instantiate new schedulizer with possible films
    let schedulizer = new Schedulizer(films);

    for (let day = 0; day < totalDays; day++) {
        schedule[day] = schedulizer.populateDay();       
    }
    return schedule;    
}

