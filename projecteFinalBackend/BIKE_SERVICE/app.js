const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
var cors = require('cors');

const PORT = process.env.PORT || 1057;

const app = express();
app.options('*',cors());

app.use(express.json());

const connection = mysql.createConnection( {
	connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bikelive_v1'
});

//Routes

app.get('/', cors(),(req,res) =>{
    const sql = 'SELECT * FROM bikes';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else  {
            res.status(400).json({msg:'Not results'});      
        }
    })
});

app.get('/:id', cors(),(req,res) =>{
    
        const {id } = req.params;
        const sql = `SELECT * FROM bikes WHERE id = ${id}`;
        connection.query(sql, (error, results) => {
            if(error) throw error;
            if(results.length > 0){
                res.json(results);
            }else  {
                res.status(400).json({msg:'Not results'});      
            }
        })   
});

app.get('/userbikes/:idUser',cors(),(req,res) =>{
    
    const id  = req.params.idUser;
    const sql = `SELECT * FROM bikes WHERE idUser = ${id}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else  {
            res.status(400).json({msg:'Not results'});      
        }
    })   
});

app.get('/userbikes/:id/:idUser', cors(),(req,res) =>{
    
    const idUser  = req.params.idUser;
    const id = req.params.id;
    const sql = `SELECT * FROM bikes WHERE idUser = ${idUser} AND id=${id}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.status(200).json(results);
        }else  {
            res.status(404).json({msg:'Not results'});      
        }
    })   
});

app.post('/', body('totalKms').isFloat({ min: 0 }), cors(), (req,res) =>{

    const sql = 'INSERT INTO bikes SET ?';
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const bikeData = {
        idUser: req.body.idUser,
        name: req.body.name, 
        type: req.body.type,
        totalKms: req.body.totalKms   
    }
    connection.query(sql, bikeData, (error,result) => {
        if (error) throw error;
        res.json({msg:'Bike created', id:result.insertId});
    })   
});

app.put('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'UPDATE bikes SET ? WHERE id = ?'; 
    connection.query(sql, [req.body, id], (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
            res.status(200).json({msg:'Bike updated successfully.'});
        }
    });
});

app.delete('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'DELETE FROM bikes WHERE id = ?'; 
    
    connection.query(sql, id, (error, result) => {
        if (error) throw error;
        if(result>0){
            res.status(400).send('Unknown ID');
        }
        res.status(200).json({msg:'Bike deleted succesfully.'});
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