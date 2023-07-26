const express=require("express");
const app=express();
const path=require("path")
const multer=require("multer");
const storage = multer.diskStorage({
    destination:'./uploads/',
      // Specify the destination folder where uploaded files will be saved
    filename:  (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique (using the current timestamp) and preserve the original filename
    }   
});
const upload = multer({ storage });
const cors=require('cors')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.static(path.join(__dirname,"/uploads")))
app.post('/uploads',upload.single('image'),(req,res)=>{
    console.log(req.file)
    const pic=req.file.filename;
    res.send(pic);
})
//Route Imports
const product=require('./routes/productRoute')
app.use('/routes',product)
const users=require('./routes/userRoutes')
app.use('/users',users)
app.use("/orders", require("./routes/orderRoute"))
const cart=require("./routes/cartRoutes");
app.use("/cart",cart)
const Chat=require('./routes/chatRoutes');
app.use("/Chat",Chat)
module.exports=app;