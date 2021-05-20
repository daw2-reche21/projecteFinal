const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');

const PORT = process.env.PORT || 1037;

const app = express();

app.use(express.json());

const connection = mysql.createConnection( {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bikelive_v1'
});

const getKmsBike = async function(id){
    const sql = `SELECT totalKms FROM bikes WHERE id= ?`;
    return new Promise( (resolve) => {
       connection.query(sql,id, (error, result) => {
            if(error) throw error
            if(result.length> 0){
                result=JSON.parse(JSON.stringify(result));
                resolve (result[0].totalKms);
            }else{
               throw({httpStatus:404, result: "not found"});
            } 
        });
    }); 
}

const updateKmsBike = async function(kms, kmsUpdate, id){  
    var kmsTotales = kms + kmsUpdate;  
    mensaje = "";
    const sql = `UPDATE bikes set totalKms = ? where id = ?`;
    return new Promise( (resolve) => {
        connection.query(sql, [kmsTotales, id], (error, result) => {
            if(error || result.affectedRows === 0 ) throw error;
            resolve('Kms bike updated');
        });
    });
}

const getKmsComponents = async function(id){
    const sql = `SELECT id,currentKms FROM userbikecomponents WHERE idBike= ? AND isSet=1`;
    return new Promise( (resolve) => {
       connection.query(sql,id, (error, result) => {
            if(error) throw error
            result=JSON.parse(JSON.stringify(result));
            resolve (result); 
        });
    }); 
}

const updateKmsComponents = async function(result, kms){
    const sql= `UPDATE userbikecomponents set currentKms = ? where id = ?`;
    var promises = [];
    for(var component of result){
        var sumaKms = component.currentKms+kms;
        promises.push( new Promise( (resolve) => {
            connection.query(sql, [sumaKms, component.id], (error, result) => {
                if(error || result.affectedRows === 0 ) throw error;  
                resolve('Kms component updated');  
            });
            
        }))
    }
    return Promise.all(promises);
}

//Routes
app.post('/', body('kms').isFloat({min : 0}), async(req, res, next) =>{
   const idBike = req.body.idBike;
   const kms = req.body.kms;
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        getKmsBike(idBike).then(result => {
           updateKmsBike(result,kms, idBike);   
        }).then(result =>{
            return getKmsComponents(idBike);
        }).then(result =>{
            return updateKmsComponents(result,kms);
        }).then(result =>{
            res.json(result);
        })             
    }catch (error){
        res.status(500).json({error: error, msg: error.msg});
    }
})

app.post('/forwardKms', async(req, res, next) =>{
    const idBike = req.body.idBike;
    const kms = req.body.kms;
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     try{
         getKmsBike(idBike).then(result => {
            updateKmsBike(result,kms, idBike);   
         }).then(result =>{
             return getKmsComponents(idBike);
         }).then(result =>{
             return updateKmsComponents(result,kms);
         }).then(result =>{
             res.json(result);
         })             
     }catch (error){
         return next(error);
     }
 })

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err+'Unknown error!');
});

connection.connect(error => {
    if(error){
        throw error;
    }else{
        console.log('Database server running');
    }
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})