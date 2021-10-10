const express = require('express')
const app = express()
const cors = require('cors');
const port = 3005

const fs = require('fs')

app.use(cors());


const raw = fs.readFileSync('./activities.json')
const data = JSON.parse(raw)

// this will send all data
app.get('/', (req, res) => {
    res.status(200).json(data)
})

app.get('/search', (req, res) => {
    let { search } = req.query    // Lets get the full search query 
    let queries = search.toString().trim().toLowerCase().split(' ') // conver the search string to muliple string array
   
    let result = []   // to store final result 
    let index = {}    // to avoid duplicate search reasult 
    
    /*
    * here is how the search working 
    * it has two loops , first loop for each json record
    * second loop for each search query to be checked 
    */
    data.tours.map((record) => {  // the outer loop 
        queries.map((query) => {  // the inner loop
            record.title = record.title.toString().toLowerCase()
            record.id = record.id.toString().toLowerCase()
            if(record.title.search(query) != -1 || record.id.search(query) !=-1) { // simply checking if the query existes in this record.title or record.id 
                if(index[record.id] == undefined) {     // checking if it is not added
                    result.push(record) 
                }
                index[record.id] = record.id  // this keeps the results that are added and then used for checking
            }
        })
    })
    
    return res.status(403).json(result)
 })

// search only by title 
// app.get('/search', (req, res) => {
//    let { search } = req.query
//    search = search.toLowerCase()  //just to match any search query, changed it to lowercase 
//    let result = []   // when search found , we store it here and final send it to to react app
   
//    for(let i = 0; i < data.tours.length; i++) {
//        let tmp_title = data.tours[i].title.toLowerCase()  //search by title , can be done by id or both
//        if(tmp_title.search(search) != -1) {
//             result.push(data.tours[i])
//        }
//    }

//    if(result.length > 0 ) return res.status(200).json(result)
//    return res.status(403).json([])
// })


app.listen(port, () => 
   console.log(`Demo server listening on port ${port}!`)
)