const express = require ('express')
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());


const connection = mysql.createConnection( {
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

app.post('/', (req,res,next) =>{

    const sql = 'INSERT INTO bikes SET ?';
    var kms = 0;
    if(req.body.totalKms < 0){
        next();
    }else if(req.body.totalKms || req.body.totalKms === 0){   
        kms = req.body.totalKms; 
    }
    const customerObj = {
        userId: req.body.userId,
        name: req.body.name, 
        type: req.body.type,
        totalKms: kms   
    }
    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Bike created');
    })   
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(301).send('Invalid data!');
});

app.put('/:id', (req,res) =>{
    res.send('Update bike');
})

app.delete('/:id', (req,res) =>{
    res.send('Delete bike');
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