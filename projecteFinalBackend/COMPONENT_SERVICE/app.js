const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
var cors = require('cors');

const PORT = process.env.PORT || 1067;

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

app.get('/', cors(),(req,res) =>{
    const sql = 'SELECT * FROM components';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else  {
            res.send('Not results');      
        }
    })
});

app.get('/:id', cors(),(req,res) =>{
    
        const {id } = req.params;
        const sql = `SELECT * FROM components WHERE id = ${id}`;
        connection.query(sql, (error, results) => {
            if(error) throw error;
            if(results.length > 0){
                res.json(results);
            }else  {
                res.send('Not results');      
            }
        })   
});

app.get('/biketype/:biketype', cors(),(req,res) =>{
    
        const bikeType = req.params.bikeType;
        const sql = `SELECT * FROM components WHERE bikeType = ${bikeType}`;
        connection.query(sql, (error, results) => {
            if(error) throw error;
            if(results.length > 0){
                res.json(results);
            }else  {
                res.send('Not results');      
            }
        })   
});


app.post('/', cors(),(req,res) =>{

    const sql = 'INSERT INTO components SET ?';  
    const componentData = {
        name: req.body.name,
        liveKms: req.body.liveKms,
		bikeType: req.body.bikeType,
		brand: req.body.brand,
		model: req.body.model
    }
    connection.query(sql, componentData, (error,result) => {
        if (error) throw error;
        res.json({msg: 'Component created', id: result.insertId});
    })   
});

app.put('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'UPDATE components SET ? WHERE id = ?'; 
    connection.query(sql, [req.body, id], (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
           res.status(200).json({msg:'Component updated successfully.'}); 
        }    
    });
});

app.delete('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'DELETE FROM components WHERE id = ?'; 
    
    connection.query(sql, id, (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
            res.status(200).json({msg:'Component deleted successfully.'});
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