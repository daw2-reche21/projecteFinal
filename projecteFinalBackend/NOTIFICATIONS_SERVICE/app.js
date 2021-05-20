const express = require ('express');
const mysql = require('mysql');


const PORT = process.env.PORT || 1015;

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

app.get('/:idUser',(req,res) =>{
    const id = req.params.idUser;
    const sql = 'SELECT * FROM notifications WHERE idUser = ?  ';
    connection.query(sql, id, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.status(200).json(results);
        }else  {
            res.status(400).json({msg:"Users not found"});      
        }
    })
});

app.get('/unseen/:id',(req,res) =>{
    
    const idUser = req.params.idUser;
    const sql = `SELECT * FROM notifications WHERE idUser = ${idUser} AND seen=0 ORDER by createdDate DESC `;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.status(200).json(results);
        }else  {
            res.status(400).json({msg:"ID not found"});      
        }
    })   
});

app.post('/', (req,res) =>{

    const sql = 'INSERT INTO notifications SET ?';  
    const notificationData = {
        idUser: req.body.idUser,
        message: req.body.message
    }
    connection.query(sql, notificationData, (error,result) => {
        if (error) throw error;
        res.status(200).json({msg: 'Notification created', id: result.insertId});
    })   
});

app.put('/:id', (req,res) =>{
    const id = req.params.id;
    const sql = 'UPDATE notification SET ? WHERE id = ?'; 
    connection.query(sql, [req.body, id], (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
           res.status(200).json({msg: "Notification update succesfully"}); 
        }    
    });
});

const getKmsComponents = async function(idBike){
    const sql = `SELECT u.id, u.currentKms, c.liveKms from userbikecomponents u, components c WHERE u.idComponent = c.id AND u.idBike = ?`;
    return new Promise( (resolve) => {
       connection.query(sql,idBike, (error, result) => {
            if(error) throw error
            if(result.length> 0){
                result=JSON.parse(JSON.stringify(result));
                resolve (result);
            }else{
               throw({httpStatus:404, result: "not found"});
            } 
        });
    }); 
}

const getPercentage = async function(result){
    result.percentage = [];
    for(var component of result){
        var calculatedPercentage = (component.currentKms/component.liveKms)*100;
        result.percentage.push(calculatedPercentage);  
    }
    return (result);
}

const createNotificationComponent = async function(result,idUser){
    const sql= `INSERT INTO notifications set ? where idBike = ?`;
    var promises = [];
    for(var component of result){
        if(component.percentage > 90){
            const notificationData = {
                idUser: idUser,
                idUserBikeComponent: component.id,
                message: 'Be careful the live of your component is almost over'
            }
            promises.push( new Promise( (resolve) => {
                connection.query(sql, notificationData, (error,result) => {
                    if (error) throw error;
                    resolve ({msg: 'Notification created', id: result.insertId});
                })   
            }))
        }
    }
    return Promise.all(promises);
}

app.put('/livenotifications',(req,res) => {
    const idBike = req.body.idBike;
    const idUser = req.body.idUser;
    try{
        getKmsComponents(idBike).then(result => {
           return getPercentage(result);   
        }).then(result =>{
            return createNotificationComponent(result, idUser);
        }).then(result =>{
            res.status(200).json({msg: 'live notifications updated'});
        })             
    }catch (error){
        res.status(500).json({error: error, msg: error.msg});
    }

});

app.delete('/:id', (req,res) =>{
    const id = req.params.id;
    const sql = 'DELETE FROM notifications WHERE id = ?'; 
    
    connection.query(sql, id, (error, result) => {
        if (error) throw error;
        if(result.affectedRows === 0){
            res.status(400).send('Unknown ID');
        }else{
            res.status(200).json({msg:'Notification deleted succesfully.'});
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