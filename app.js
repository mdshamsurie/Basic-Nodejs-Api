const express = require('express')
const app = express()

//pakai env pangil port
require('dotenv').config()

//kalau nak pakai kat prod, tambah cors utk 
//bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API
//npm i cors
//app.use(cors())

let users = []

//body-parse
app.use(express.json())

// get, post, delete, put
app.get('/', (req, res) => {
    res.send(users)
    })

app.post('/', (req, res) => {
    const data = req.body
    users = [...users, data]

    res.send('user created')
    })

app.delete('/:name?',(req,res) => {
    const params = req.params.name
    let deleteUser = users.filter(val => val.name!==params)

    users = deleteUser
    res.send(users)
    })

app.put('/', (req,res) => {
    const data = req.body

    
    users.map(val => {
        if(val.email === data.email) val.name = data.name
    })

    res.send(users)
})



app.listen(process.env.PORT, ()=>  {
    console.log('Server is running on port ' + process.env.PORT)
})