import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app=express();
app.use(cors({
 // set the origin of the  data sharing 
 origin:process.env.CORSE_ORIGIN,
 credentials:true
}))
// here we are handle the json fromate how much it can send 
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("public")); 
// handle the cookei  of the broswer
app.use(cookieParser()); //simply 
export {app};