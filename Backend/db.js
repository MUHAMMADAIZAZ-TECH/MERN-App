const mongoose = require("mongoose");

module.exports = () =>{
    const connectionParams = {
        useNewUrlParse:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    }
}
try{
    mongoose.connect(process.env.DB,{
        // useNewUrlParse:true,
        useUnifiedTopology:true,
        // useFindAndModify:false
    })
    console.log("Connected to database success")
}catch(error){
console.log("Error",error)
console.log("Not Connected to database")
}