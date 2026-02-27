import 'dotenv/config';
import   dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import attach from './db/index.js';
import { app } from './app.js';
const PORT=process.env.Port||4000
attach().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Database is connected ${PORT}`)
    })
    console.log(`Database is connected`);
}).catch((error)=>{
   console.log(`The error catch by the promiss is ${error}`);
})