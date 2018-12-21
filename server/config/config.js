//==============================
//Puerto
//==============================

process.env.PORT=process.env.PORT || 3000


//==============================
//fecha que dura el del token
//==============================
//60*60*24/30

process.env.FECHA_DURACION_TOKEN=60*60*24*30;

//==============================
//SEED O LLAVE DE SEGURIDAD JWT
//==============================
process.env.SEED=process.env.SEED||'hola-seed';


//==============================
//Google Client
//==============================

process.env.CLIENT_ID=process.env.CLIENT_ID || "371756195413-5bvp1gpdk5reui466g54efoeutagve2p.apps.googleusercontent.com"