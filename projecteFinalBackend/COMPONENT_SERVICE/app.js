const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');

const PORT = process.env.PORT || 3010;

const app = express();

app.use(express.json());

const connection = mysql.createConnection( {
	connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bikelive_v1'
});

//Routes

app.get('/',(req,res) =>{
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

app.get('/:id',(req,res) =>{
    
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

app.post('/', (req,res) =>{

    const sql = 'INSERT INTO components SET ?';  
    const componentData = {
        name: req.body.name,
        liveKms: req.body.liveKms
    }
    connection.query(sql, componentData, (error,result) => {
        if (error) throw error;
        res.json({msg: 'Component created', id: result.insertId});
    })   
});

app.put('/:id', (req,res) =>{
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

app.delete('/:id', (req,res) =>{
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