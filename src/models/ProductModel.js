const mongoose=require('mongoose');
const {Schema}=mongoose;

const ProductSchema=new Schema({
    title:{
        type:String,
        required:[true, "El titulo es requerido"],
        minLenght:4,
        maxLenght:30,
        unique:true,

    },
    description:{
        type:String,
        required:[true, "La descripcion es requerida"],
        minLenght:4,
        maxLenght:200,
    },
    category:{
        type:String,
        required:[true, "La categoria es requerida"],
    }
});

const ProductModel=mongoose.model("product", ProductSchema);

module.exports=ProductModel;