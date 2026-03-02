import { DataTypes, Sequelize } from "sequelize";
import  Jwt  from "jsonwebtoken";
import bcript from "bcrypt";
const Connection=new Sequelize('nodejs','postgres','35503r',{
    host:'localhost',
    dialect:'postgres'

})
const User=Connection.define('User',{
    id:{
        type:DataTypes.UUIDV4,
        primarykey:true,
    },
    Username:{
        type:DataTypes.STRING,
         allowNull:false,
         unique:true,
         indexs:[
            {
                fields:[Username]
            }
         ]
    },
     email:{
        type:DataTypes.STRING,
         allowNull:false,
         unique:true,
         
    },   
    Fullname:{
        type:DataTypes.STRING,
         allowNull:false,
    },
    avater:{
        type:DataTypes.STRING, // cloudainry link we will use  here 
        allowNull:false
    },
    covarimag:{
   type:DataTypes.STRING,
    },
    watchistory:[
        {
        references:{
            Modle:'vidoes',
            key:'id',
        }
        }
    ],
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    refereshtoken:{
         type:DataTypes.STRING,
         
    }
},{timestamps:true})

User.beforeSave('save',async function(next){
    if(!this.isModified("password")) return next();
     this.password= bcript.hash(this.password, 10);
     next();
})
module.exports=User; 