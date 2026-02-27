class apierr extends Error{
    constructor(statuscode,message="Some thing went wrong",errors=[],
        //what is the stack trace in error handling?
//it save what is the  error which function is caling and in which file it has  
               stack=" "
    ){
        this.statuscode=statuscode;
        this.message=message;
        this.errors=errors;
         this.data=null;
          if(stack){
            this.stack=stack
          }else{
            Error.captureStackTraceO(this,this.constructor);
          }

    }
}
export {apierr}