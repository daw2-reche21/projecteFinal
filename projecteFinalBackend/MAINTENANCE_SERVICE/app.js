const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');

const PORT = process.env.PORT || 3037;

const app = express();

app.use(express.json());

const connection = mysql.createConnection( {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bikelive_v1'
});

const getKms = async function(id){
    const sql = `SELECT totalKms FROM bikes WHERE id= ?`;
    var resultado = 0;
    return new Promise( (resolve) => {
       connection.query(sql,id, (error, result) => {
            if(error) throw error
            result=JSON.parse(JSON.stringify(result));
            resolve (result[0].totalKms); 
        });
    }); 
}

const updateKms = async function(kms, kmsUpdate, id){
    
    var kmsTotales = kms + kmsUpdate;  
    mensaje = "";
    const sql = `UPDATE bikes set totalKms = ? where id = ?`;
    return new Promise( (resolve) => {
        connection.query(sql, [kmsTotales, id], (error, results) => {
            if(error) throw error;
            resolve('Kms bike updated');
        });
    });
}

//Routes
app.post('/updatebike/:id', body('kmsUpdate').isFloat({min : 0}), async(req, res, next) =>{
   const id = req.params.id;
   const kmsUpdate = req.body.kms;
   var kms = "";
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        getKms(id).then(result => {
           return updateKms(result,kmsUpdate, id);
        }).then(result =>{
            res.send(result);
        })          
    }catch (error){
        return next(error);
    }
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Unknown error!');
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