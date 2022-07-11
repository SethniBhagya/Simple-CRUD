const express= require("express");
const mysql = require('mysql')
const bodyParser =require("body-parser");
const cors =require('cors');
const app = express();
app.use(cors());

app.use(express.json());

const db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_db'
});

app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req,res) => {

    const name=req.body.name
    const district=req.body.district
    const email=req.body.email

    const sqlSelect="SELECT * FROM user;"
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
    
   

});

app.post("/api/insert", (req,res) => {

    const name=req.body.name
    const district=req.body.district
    const email=req.body.email

    const sqlInsert="INSERT INTO user (name,district,email) VALUES (?,?,?);"
    db.query(sqlInsert,[name,district,email],(err,result)=>{
        console.log(result);
    })
});

app.delete("/api/delete/:id", (req,res) => {

    const id=req.params.id;
    // const name=req.params.name;
    // const district=req.params.district
    // const email=req.params.email

    const sqlDelete="DELETE FROM user WHERE id=?";
    db.query(sqlDelete,id,(err,result)=>{
        console.log(err);
    })
});
app.put("/api/update", (req,res) => {

    const name=req.body.name;
    const district=req.body.district
    const email=req.body.email

    const sqlUpdate="UPDATE user SET district = ?  WHERE name=?";
    db.query(sqlUpdate,[district,name],(err,result)=>{
        console.log(err);
    })
});
app.listen(3001,()=>{
   
   console.log(`Server is started`);
});