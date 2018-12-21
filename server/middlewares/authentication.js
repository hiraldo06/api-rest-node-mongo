
const jwt=require('jsonwebtoken');

/**
 * Verificar token
 */

 let verificarToken=(req,res, next)=>{
     
    let token=req.get('authorization').split(' ')[1];
    // console.log(token);
    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        }

        req.usuario=decoded.usuario;
        next()
    });
 }

 //==============================
 // Verificador de roles
 //==============================
let verificarRole=(req,res,next)=>{
   
        let usuario =req.usuario;
        if(usuario.role != 'ADMIN_ROLE'){
            return res.status(401).json({
                ok:false,
                err:'no autorizado'
            });
        }
        
        next();
   
}


 module.exports={
     verificarToken,
     verificarRole
 }