const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');

const PORT = process.env.PORT || 3000;

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
    const sql = 'SELECT * FROM bikes';
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
        const sql = `SELECT * FROM bikes WHERE id = ${id}`;
        connection.query(sql, (error, results) => {
            if(error) throw error;
            if(results.length > 0){
                res.json(results);
            }else  {
                res.send('Not results');      
            }
        })   
});

app.get('/userbikes/:userId',(req,res) =>{
    
    const id  = req.params.userId;
    const sql = `SELECT * FROM bikes WHERE userId = ${id}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else  {
            res.send('Not results');      
        }
    })   
});

app.get('/userbikes/:id/:userId',(req,res) =>{
    
    const idUser  = req.params.userId;
    const id = req.params.id;
    const sql = `SELECT * FROM bikes WHERE userId = ${idUser} AND id=${id}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else  {
            res.send('Not results');      
        }
    })   
});

app.post('/', body('totalKms').isFloat({ min: 0 }), (req,res) =>{

    const sql = 'INSERT INTO bikes SET ?';
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customerObj = {
        userId: req.body.userId,
        name: req.body.name, 
        type: req.body.type,
        totalKms: req.body.totalKms   
    }
    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Bike created');
    })   
});

app.put('/:id', (req,res) =>{
    const id = req.params.id;
    const sql = 'UPDATE bikes SET ? WHERE id = ?'; 
    connection.query(sql, [req.body, id], (error, result) => {
        if (error
            ) throw error;
        if(result.length>0){
             throw error;
        }
        res.send('Bike updated successfully.');
    });
});

app.delete('/:id', (req,res) =>{
    const id = req.params.id;
    const sql = 'DELETE FROM bikes WHERE id = ?'; 
    
    connection.query(sql, id, (error, result) => {
        if (error) throw error;
        if(result>0){
             throw error;
        }
        res.send('Bike deleted succesfully.');
    });
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