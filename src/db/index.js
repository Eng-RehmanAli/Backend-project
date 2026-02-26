import express from 'express';
import 'dotenv/config';
import pkg from 'pg';
const app=express();
const {Pool}=pkg;
// make the  connection of the supabase
function connectdb(){
    const connection=new Pool({
    connectionString:process.env.SUPABASE_URI,
    ssl:{
        rejectUnauthorized:false,
    },
    family:4
});
connection.connect().then(()=>{
    console.log(`the db is connect `);
}).catch((error)=>{
    console.log(`database is not coonect  with erroe`,error);
})
app.get('/',async(req,res)=>{
    try{
        const  take= await connection.query("Select now()");
        res.json(take.rows);
    }catch(err){         
        res.status(500).json({error:err.message});
    }
});
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`The server at the listining on`,PORT);
})
}
export default connectdb;
