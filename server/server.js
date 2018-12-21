


require('./config/config');

const express=require('express');
const mongoose=require('mongoose');

const bodyParser=require('body-parser');
const path=require('path');

const app=express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//parser application/json
app.use(bodyParser.json());


//configuration routes
app.use(require('./routes/index'));

// carpeta public
app.use(express.static(path.resolve(__dirname,'../public')));



mongoose.connect('mongodb://mongo/cafe',{useCreateIndex:true},
                (err,res)=>{
    if(err) throw err;

    console.log('Base de dato connecte');
});

app.listen(process.env.PORT,()=>{
    console.log(`usando en el puerto ${process.env.PORT}`);
    
});