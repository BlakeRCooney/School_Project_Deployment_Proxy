const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')

const app = express()
var corsOptions = {
    origin: (clientOrigin, callback) => {
        // The callback siginiture follows: callback(error, allowOrigin)
        callback(null, true)
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
const port = 4000
var path = __dirname + "/dist/"
app.use(express.static(path))
app.get("/", (req, res) => {
    res.sendFile(path + "index.html")
})

app.use('/api', proxy('http://localhost:3000/',{
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        return proxyReqOpts;
    }
}));

app.listen(port, () => {
    console.log("API is listening on port 4000")
})

