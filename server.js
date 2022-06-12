const express = require("express");
const routes = require("./app/routes/routes.js")

const app = express();


app.use('/', routes);


var port = process.env.PORT || 3000;

var server = app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});


module.exports = server