//Figure out what keys to return
if(process.env.NODE_ENV === 'production'){
    //Pulling the keys in and exporting them prod
    module.exports = require('./prod');
}
else{
    //Pulling the keys in and exporting them dev
    module.exports = require('./dev');
}