import 'dotenv/config';
import   dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import pkg from 'pg';
const {Pool}=pkg;
const connect=new Pool({
     connectionString:process.env.SUPABASE_URI,
     ssl:{
         rejectUnauthorized: false
     }
});
async function attach(){
   try{
    await connect.query('select now()');
    console.log(`The Database is connected`);
   }catch(err){
      console.log(`The error is here ${err}`);
   }
}
export default attach;