const express = require ('express')
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
var cors = require('cors');

const PORT = process.env.PORT || 1080;

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

app.get('/',cors(),(req,res) =>{
    const sql = 'SELECT * FROM users';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.status(200).json(results);
        }else  {
            res.status(400).json({msg:"Users not found"});      
        }
    })
});


app.get('/:id',cors(),(req,res) =>{
    
    const {id } = req.params;
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.status(200).json(results);
        }else  {
            res.status(400).json({msg:"ID not found"});      
        }
    })   
});

app.post('/email',cors(),(req,res) =>{
    
    const email  = req.body.email;
    const sql = `SELECT * FROM users WHERE email = ?`;
    connection.query(sql, email, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.status(200).json(results);
        }else  {
            res.status(400).json({msg:"ID not found"});      
        }
    })   
});

app.post('/', cors(), (req,res) =>{

    const sql = 'INSERT INTO users SET ?';  
	if(req.body.email == null || req.body.password == null){
		res.send('Invalid data');
	}
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    connection.query(sql, userData, (error,result) => {
        if (error) throw error;
        res.status(200).json({msg: 'User created', id: result.insertId});
    })   
});

app.post('/userexist', cors(),(req,res) =>{
     email = req.body.email;
	if(!email || email === undefined){
		email = 'a';
	}
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, email, (error,result) =>{
        if(result.length>0){
            res.json({msg:'Exist'});
        }else{
            res.json({msg:'NotExist'});
        }
    })
})

app.put('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'UPDATE users SET ? WHERE id = ?'; 
    connection.query(sql, [req.body, id], (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
           res.status(200).json({msg: "User update succesfully"}); 
        }    
    });
});

app.post('/login', cors(), (req,res) =>{
    const password = req.body.password;
    const email = req.body.email;
	if(req.body.email == null || req.body.password == null){
		res.send('Invalid data');
	}
    const sql = 'SELECT isLogged from users where email = ? AND password = ?'; 
    connection.query(sql, [email,password], (error, result) => {
        if (error) throw error;
        if(result.length > 0){
           connection.query('UPDATE users set isLogged = true WHERE email = ? AND password = ?',
            [email, password], (error, result) =>{
                res.status(200).json({msg: "logged", email: email, password:password});
            })
        }else  {
            res.status(400).json({msg: "Not login"});      
        }
    });
});

app.delete('/:id', cors(), (req,res) =>{
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?'; 
    
    connection.query(sql, id, (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
            res.status(200).json({msg:'User deleted succesfully.'});
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