const connectDB = require('./db/connect')
const express = require('express')
const tasks = require('./routes/tasks')
require('dotenv').config()
const notFound = require('./middleware/not-found')

const port = 3000;
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.redirect('/api/v1/tasks');
})

app.use('/api/v1/tasks', tasks);

app.use(notFound); 

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        })
    } catch (err) {
        console.log(err);
    }
}

start();