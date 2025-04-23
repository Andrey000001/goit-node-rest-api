const express = require('express');
const cors = require('cors');

const app = express()
const contactsRouter = require('./routes/contactsRoute')

app.use(cors())
app.use(express.json())

app.use('/api/contacts',contactsRouter)

app.use((req,res) => {
    res.status(404).json({message: 'Not found'})
})

app.use((err,req,res,next) => {
    const {status = 500, message = 'Server error'} = err
    res.status(status).json({message})
})


app.listen(3000,() => {
    console.log('Server is running on port 3000');
})

