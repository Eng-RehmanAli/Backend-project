import { DataTypes, Model, Sequelize } from "sequelize";

const   conect=new Sequelize('nodejs','postgres','35503r',{
    host:'localhost',
    dialect:'postgres'
});

const Video=conect.define('Video',{
    videofile:{
        type:DataTypes.STRING, // cloudinary link 
        allowNull:false
    },
    thumbnail:{
        type:DataTypes.STRING,
        allowNull:false
    },
     title:{
        typeype:DataTypes.STRING,
        allowNull:false
    },
     description:{
        type:DataTypes.STRING,
        allowNull:false
    },
      duration:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
      views:{
        type:DataTypes.NUMBER,
        allowNull:false,
        defaultValue:0,
    },
    ispublished:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
     owner:{
        references:{
            Model:'User',
            key:'id',
        }
    },
})