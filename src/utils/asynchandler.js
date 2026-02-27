// in fn we passed the logic and then it will excute and the 
// it will gives you the actula object 

const asynchandler=(fn)=>async(req,res,next)=>{
 try{
 await  fn(req,res,next)
 }catch(err){
    res.status(err.code||500).json({
        // here the success is telling that promise is not runing 
        success:false,
        message:err.message||"Something is want wromg "
    })
 }
}
export {asynchandler};