const app=require('./app');
require('dotenv').config();
const connectDatabase=require('./connection/database');
connectDatabase();
app.listen(process.env.PORT,function(err){ 
    if(err)
    console.log(err);
    console.log("Server listening on port 5000");
})

