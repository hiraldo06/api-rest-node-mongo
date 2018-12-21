const express=require('express');

const{verificarToken}=require('../middlewares/authentication');

let app=express();
let Producto=require('../models/producto');



/**
 * Listar Productos con pupo usuario y categoria
 */
app.get('/producto',verificarToken,(req,res)=>{
    let limite =req.query.limite || 5;
    limite=Number(limite);
    let desde=req.query.desde || 0;
    desde=Number(desde);
    Producto.find({disponible:true})
    .populate('usuario','nombre email')
    .populate('categoria','description')
    .limit(limite)
    .skip(desde)
    .sort('nombre')
    .exec((err, productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
    Producto.countDocuments({disponible:true},(err,total)=>{
        res.json({
            ok:true,
            productos:productoDB,
            total
        })
    });
    })
});

/**
 * Buscar productos por id
 */
app.get("/producto/:id",verificarToken,(req,res)=>{
    let id=req.params.id;

    Producto.findById(id)
    .populate('usuario','nombre email')
    .populate('categoria','description')
    .exec((err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{message:'Usuario no existe en bd'}
            });
        }

        res.json({
            ok:true,
            producto:productoDB
        })
    })
})


/**
 * Crear post con categoria y usuarios
 */
app.post('/producto',verificarToken,(req,res)=>{
    let body=req.body;
    let producto=new Producto({
        nombre:body.nombre,
        precioUni:body.precioUni,
        description:body.description,
        disponible:body.disponible,
        categoria:body.categoria,
        usuario:req.usuario._id
    })
    producto.save((err,productoBD)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoBD){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            producto:productoBD
        })
    })
})

/**
 * Delete productos por id
 */
app.delete("/producto/:id",verificarToken,(req,res)=>{
    let id=req.params.id;
    let dispProducto={
        disponible:false
    }
    Producto.findByIdAndUpdate(id,dispProducto,{new:true},(err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{message:'Usuario no existe en bd'}
            });
        }

        res.json({
            ok:true,
            producto:productoDB
        })
    })
})




module.exports=app;