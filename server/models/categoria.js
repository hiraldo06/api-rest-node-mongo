const mongoose=require('mongoose');

let Schema= mongoose.Schema


let categoriaSchema=new Schema({
    description:{
        type:String,
        required:[true,'el la description es requerida'],
        unique:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
});


module.exports=mongoose.model('Categoria',categoriaSchema);