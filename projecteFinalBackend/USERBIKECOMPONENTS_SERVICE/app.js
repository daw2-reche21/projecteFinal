const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
var cors = require('cors');
const PORT = process.env.PORT || 1020;

const app = express();

app.use(express.json());
app.options('*',cors());

const connection = mysql.createConnection( {
	connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bikelive_v1'
});

//Routes

app.get('/bike/:id', cors(),(req,res) =>{
    const {id } = req.params;
    const sql = 'SELECT * FROM userbikecomponents u, components c where u.idBike = ? AND c.id=u.idComponent';
    connection.query(sql, id,  (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.status(200).json(results);
        }else  {
            res.status(400).json({msg:'ID not found'});;       
        }
    })
});


app.post('/', cors(), (req,res) =>{
    const sql = 'INSERT INTO userbikecomponents SET ?';  
    const userBikeComponentsData = {
        idBike: req.body.idBike,
        idComponent: req.body.idComponent      
    }
    connection.query(sql, userBikeComponentsData, (error,result) => {
        if (error) throw error;
        res.status(200).json({msg:'created', id:result.insertId});
    })   
});

app.put('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'UPDATE userbikecomponents SET ? WHERE id = ?'; 
    connection.query(sql, [req.body, id], (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
            res.status(200).json({msg:'Component updated succesfully.'});
        }    
    });
});

app.delete('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'DELETE FROM userbikecomponents WHERE id = ?'; 
    connection.query(sql, id, (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
            res.status(200).json({msg:'Component deleted succesfully.'});
        }     
    });
})

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