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

//this will search by title
app.get('/search', (req, res) => {
   let { search } = req.query
   search = search.toLowerCase()  //just to match any search query, changed it to lowercase 
   let result = []   // when search found , we store it here and final send it to to react app
   
   for(let i = 0; i < data.tours.length; i++) {
       let tmp_title = data.tours[i].title.toLowerCase()  //search by title , can be done by id or both
       if(tmp_title.search(search) != -1) {
            result.push(data.tours[i])
       }
   }

   if(result.length > 0 ) return res.status(200).json(result)
   return res.status(403).json([])
})


//if you want the search to be by id - uncomment this and comment the upove code
// app.get('/search', (req, res) => {
//     let { search } = req.query
//     search = search.toLowerCase()  //just to match any search query, changed it to lowercase 
//     let result = []   // when search found , we store it here and final send it to to react app
    
//     for(let i = 0; i < data.tours.length; i++) {
//         let tmp_id = data.tours[i].id.toString()
//         if(tmp_id.search(search) !=-1) {
//              result.push(data.tours[i])
//         }
//     }
 
//     if(result.length > 0 ) return res.status(200).json(result)
//     return res.status(403).json([])
//  })


app.listen(port, () => 
   console.log(`Demo server listening on port ${port}!`)
)