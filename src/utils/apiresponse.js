class apiresponse{
    constructor(statuscode,message="Somsthing is happing",data){
        this.statuscode=statuscode;
        this.data=data;
        this.message=message;
        this.success=statuscode<400 // for the case of the sccuess we are making the standard 
    }
}