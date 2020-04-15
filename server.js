const express = require('express')
const path = require('path')
const route = require('./routes/todos')

const app = express();

app.use('/',express.json())
app.use('/',express.urlencoded({extended:true}))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/todos', route)

app.listen(4200, () => console.log('Server started at http://localhost:4200'))