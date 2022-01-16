const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require('express-session');
const fuzzysort = require('fuzzysort')
var cors = require('cors');

/*
 Issues: Some database files are missing for this example. I am using what was provided.
 Author: Joshua Duma
*/

app.use(express.json())
app.use(cors())

var fs = require("fs"),
    json;

function readJsonFileSync(filepath, encoding) {

    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file) {

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

// Assume that config.json is in application root.
// Assumes that username is name.

json = getConfig('mock.json');

function findDuplicates() {
    duplicates =[]
    names = []
    for (var i = 0, l = json.length; i < l; i++) {
        if(names.includes(json[i]['name'])){
            console.log(json[i]['name'])
            duplicates.push(json[i]['name'])
        }
        names.push(json[i]['name'])
    }
    console.log(duplicates)
}

function sortByFrequencyAndRemoveDuplicates(array) {
    var frequency = {},
        value;

    // compute frequencies of each value
    for (var i = 0; i < array.length; i++) {
        value = array[i];
        if (value in frequency) {
            frequency[value]++;
        } else {
            frequency[value] = 1;
        }
    }

    // make array from the frequency object to de-duplicate
    var uniques = [];
    for (value in frequency) {
        uniques.push(value);
    }

    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
}

var allowed_results = {
    single_user: 1,
    user_search: 15
}

// Sort by date for posts.
function custom_sort(a, b) {
    var splitDate

    if(typeof a.date_posted === 'string'){
        splitDate = a.date_posted.split("/")
        a.dateCalc = new Date(splitDate[2], splitDate[1], splitDate[0])
    }

    if(typeof b.date_posted === 'string'){
        splitDate = b.date_posted.split("/")
        b.dateCalc = new Date(splitDate[2], splitDate[1], splitDate[0])
    }

    return b.dateCalc.getTime() - a.dateCalc.getTime();
}

app.get('/feed', function (req, res) {
    var feed = new feed_filters({limit: req.query.limit, page: req.query.page})
    var results = []

    // Sorts every time in case of changes to database.
    var sorted = json.sort(custom_sort)

    // Sends back amount requested at a time, allows for pagination.
    for (var i = 0; i < feed.limit * feed.page; i++) {
        results.push(sorted[i])
    }

    res.json(
        {
            results: results,
            page: feed.page,
            limit: feed.limit,
            hits: sorted.length
        }
        )
});

class feed_filters{
    limit = 15
    page = 1
    constructor(params){
        console.log(params)
        if(params.limit !== undefined){
            if(params.limit <= json.length){
                this.limit = params.limit
            }
            else{
                this.limit = json.length
            }
        }
        params.page !== undefined ? this.page = params.page : false
    }
}

app.get('/user/:id', function (req, res) {
    var feed = new feed_filters({limit: req.query.limit, page: req.query.page})
    var id = req.params.id
    var results = [], all_results = []
    var count = 0
    
    // Sorts every time in case of changes to database.

    for (var i = 0; i < json.length; i++) {
        if (json[i]['name'] == id) {
            all_results.push(json[i])
            count++
        }
    }

    for (var i = 0; i < json.length; i++) {
        if (json[i]['name'] == id) {
            results.push(json[i])
            count++
        }
        if (count >= feed.limit * feed.page) {
            break
        }
    }

    results = results.sort(custom_sort)
    
    res.json(
        {
            results: results,
            page: feed.page,
            limit: feed.limit,
            hits: all_results.length
        }
        )
});

app.get('/user_post_summary', function (req, res) {
    var feed = new feed_filters({limit: req.query.limit, page: req.query.page})
    var id = req.params.id
    var results = [], all_results = []
    var count = 0
    var results = []
    var quaziOutput = {}
    
    // Sorts every time in case of changes to database.

    for (var i = 0; i < json.length; i++) {
        if(quaziOutput[json[i]['name']] === undefined){
            quaziOutput[json[i]['name']] = {totalPosts: 1, totalLikes: json[i]['likes']}
        } 
        else{
            quaziOutput[json[i]['name']].totalLikes += json[i]['likes']
            quaziOutput[json[i]['name']].totalPosts += 1
        }
    }

    for (const quazi in quaziOutput) {
        results.push({name: quazi, totalLikes: quaziOutput[quazi]['totalLikes'], totalPosts: quaziOutput[quazi]['totalPosts']})
    }
    
    res.json(results)
});

app.get('/search_users', function (req, res) {
    var query = req.query.name
    var results = []
    var count = 0
    var fuzzysortResults = fuzzysort.go(query, json, {keys: ['name', 'company']})
    for (var j = 0; j < fuzzysortResults.length; j++) {
        results.push(fuzzysortResults[j].obj)
        if (count >= allowed_results.user_search) {
            break
        }
        count++
    }
    res.json(results)
});

app.use('*', function (req, res) {
    res.json({
        message: "Forbidden",
        errors: {
            message: "Invalid request"
        },
        code: 403
    })
});

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server has started at port " + PORT));