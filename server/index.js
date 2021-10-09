const express = require('express')
const app = express()
const cors = require('cors');
const port = 3005

const fs = require('fs')

app.use(cors());


const raw = fs.readFileSync('./activities.json')
const data = JSON.parse(raw)


app.get('/', (req, res) => {
    res.status(200).json(data)
})

app.get('/search', (req, res) => {
   let { search } = req.query
   search = search.toLowerCase()
   let result = []
   
   for(let i = 0; i < data.tours.length; i++) {
       let tmp_title = data.tours[i].title.toLowerCase()
       if(tmp_title.search(search) != -1) {
            result.push(data.tours[i])
       }
   }

   if(result.length > 0 ) return res.status(200).json(result)
   return res.status(403).json([])
})





app.listen(port, () => 
console.log(`Demo server listening on port ${port}!`)
)