/*
* ROUTE: 'POST' /schedule
*/

const filmScheduler = require('./filmScheduler.js');
const util = require('./util');
exports.handler = async(event) => {
    try {
        if(!event.body)
            throw Error('Empty payload');
        //perform logic
        let payload = JSON.parse(event.body);
        let completedSchedule = filmScheduler.getSchedule(payload);
        completedSchedule = util.cleanSchedule(JSON.stringify(completedSchedule));
        console.log(completedSchedule);
        //send it back
        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: completedSchedule /*csv here*/ 
        }
    }
    catch(err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                err: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown Error"
            })
        }
    }
};