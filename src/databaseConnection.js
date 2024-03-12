const mongoose = require('mongoose');


const databaseConnection=()=>{
    const connectionString=process.env.DDBB;

    mongoose.connect(connectionString);

    const connection=mongoose.connection;
    connection.once('open', ()=>{
        console.log('DDBB CONNECT SUCCESFUL');
    });
};

module.exports=databaseConnection;