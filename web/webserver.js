//Modules
const Express = require('express');
const multer = require('multer');
const Path = require('path');
const csv = require('fast-csv');
const fs = require('fs');
const axios = require('axios')
const totalSlots = 14;

//Configuration
const upload = multer({ dest: 'tmp/csv/' }); //temporary location for uploaded csv to go
const router = Express.Router();
const hostname = '127.0.0.1';
const port = 8888;
const api = 'https://z97iyznws3.execute-api.eu-west-2.amazonaws.com/Prod/api' //http://127.0.0.1:3000/api;

//Setup
const app = Express();
app.use('/create', router);
app.listen(port, ()=> console.log(`Server running at http://${hostname}:${port}/`));

//return upload page
app.get('/', (request, response) => {
    response.sendFile(Path.join(__dirname + '/index.html'));
})

//recieve post
router.post('/', upload.single('file'), function (req, res) {
    apiCall(req, (csvOutput)=>{ //callback returns schedule response, as response to original post from client
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-disposition': 'attachment;filename=schedule.csv',
            'Content-Length': csvOutput.length
        });
        res.end(Buffer.from(csvOutput)); 
    })    
});


//send post
async function apiCall(req, callback) {
    try{
        //destructure array (first row is days) 
        let [days, ...films] = await parseFileStream(req); 
        //Get rid of temporary file
        fs.unlinkSync(req.file.path);  
        //post to FSmicroService
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.data = 
        axios({
            method: 'post',
            url: api,
            data: {
                    films:films, days:days
                }
            })
        .then(
        (response) => {
            let csvOutput = '';
            let arr = response.data;
            console.log(arr);
            try{
                for (let slot = 0; slot < totalSlots; slot++) {
                    csvOutput = csvOutput + '\n'
                    for (let index = 0; index < arr.length; index++) {
                        const day = arr[index];
                        csvOutput = csvOutput + `${(day[slot])},`;
                    }
                }
                console.log(csvOutput);
                callback(csvOutput);

            } catch (err) {
                console.log(err);
            }
          
        }, (error) => {
        console.log(error);
        });
    } catch(error) {
        throw error;
    }    
}

//need to await file being parsed, because of JSs annoying inherent asyncronity 
function parseFileStream(req) {
    return new Promise((resolve, reject) => {       
        let fileRows = [];
        fs.createReadStream(req.file.path)
            .pipe(csv.parse())
                .on('error', err => reject(err))
                .on('data', row => fileRows.push(row[0])) //each row is another array; only need first value
                .on('end', () => resolve(fileRows));
    })
}