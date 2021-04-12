const express = require('express')
app = express()
path = require('path')
const http = require('http')
const server = http.createServer(app)

// settings

app.set('port', process.env.PORT || 3000)


// leer archivos estáticos

app.use("/", express.static("source"));

app.get('/', (req, res) => {
    res.render("index")
})

// escuchamos el puerto

server.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})