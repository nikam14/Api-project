const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

//Env vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

//initialis cache
let cache = apicache.middleware//the middleware function to create new cache instance.

router.get('/', cache('2 minutes'), async (req, res) => { // cache the response for only 2 minute
    try{
       
        
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query, // parsing the url string to url object then making it's query and adding it to params
        })                                      //so that we can send it to openweather API
        
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)//allow you to make http request and that data is stored.
        const data = apiRes.body
        
//      log the request to public api
        if(process.env.NODE_ENV != 'production'){ // The process.env.NODE_ENV variable is an environment it has 3 val - development, staging, production
                                                    //this code will run when it is staging or dev.    
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        res.status(200).json(data)
    }catch(eror){
        res.status(500).json({ error })
    }
})

module.exports = router