const express=require('express');


let {verificarToken,verificarRole}=require('../middlewares/authentication');

let app =express();

let Categoria = require('../models/categoria');


/**
 * Get todas las categorias
 * el segundo parametro del populate nos filtra por esos campos
 * sort ordena dependiendo el campo deseado
 */
app.get('/categoria',verificarToken,(req,res)=>{
    Categoria.find({})
    .populate("usuario","nombre email") //nos permite buscar por el id del usuario
    .sort('description')
    .exec((err,categorias)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categorias
        })
    });
});

/**
 * Get  categoria by id
 */
app.get('/categoria/:id',verificarToken,(req,res)=>{
    let id =req.params.id;
    Categoria.findById(id,(err,categorias)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaBD){
            return res.status(400).json({
                ok:false,
                err:{message:"no existe el elemento"}
            })
        }
        res.json({
            ok:true,
            categorias
        })
    });
});

/**
 * Crear  categoria by id
 */
app.post('/categoria',verificarToken,(req,res)=>{

        let categoria = new Categoria();
        categoria.description=req.body.description;
        categoria.usuario=req.usuario._id;
        categoria.save((err,categoriaBD)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
            if(!categoriaBD){
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            res.json({
                ok:true,
                categoria:categoriaBD
            })
        })
});

/**
 * Eliminar  categoria by id
 */
app.delete('/categoria/:id',[verificarToken,verificarRole],(req,res)=>{

    let id = req.params.id;
    Categoria.findByIdAndRemove(id,(err,categoriaBD)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!categoriaBD){
            return res.status(400).json({
                ok:false,
                err:{message:"no existe el elemento"}
            })
        }
        res.json({
            ok:true,
            categoria:categoriaBD
        })
    })
});

/**
 * Eliminar  categoria by id
 */
app.put('/categoria/:id',[verificarToken,verificarRole],(req,res)=>{

    let id = req.params.id;
    let body=req.body;
    let descCategoria={
        description:body.description
    }
    Categoria.findByIdAndUpdate(id,descCategoria,{new:true,runValidators},(err,categoriaBD)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!categoriaBD){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categoria:categoriaBD
        })
    })
});

module.exports=app;