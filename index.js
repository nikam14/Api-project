const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config() //The require('dotenv').config() function in Node.js loads environment variables from a .env file 
                            //into the process.env object.

const PORT = process.env.PORT || 5000 //process.env.PORT-> contains the port number that your application is listening on

const app = express()   //The app variable is an object that represents your Express application. You can use this object to 
                        //configure your application and to define routes.

//Rate limiting
const limiter = rateLimit({
    windowMs:10 * 60 * 1000,//10 mins
    max:5//can make 5 request in 10 minutes.
})
app.use(limiter)
app.set('trust proxy', 1)

//set static folder
app.use(express.static('public'))//.use() - method to define the middleware and .static() to serve static files.
                                //will look for public folder

//Routes
app.use('/api', require('./routes'))//if get the /api url then we are using the router method of express which is declared in routes.


//enable cors
app.use(cors())

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
