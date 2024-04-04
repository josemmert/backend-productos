const ProductModel=require('../models/ProductModel');
const helpers=require('../utils/helpersFunctions');

class ProductController{
    
    async Create(title, description, category){
        try {
            
            if (!helpers.ValidateTitle(title)||!helpers.ValidateDescription(description)||!helpers.ValidateCategory(category)) {
                throw new Error("Error en alguno de los campos")
            }

            const product=new ProductModel({
                title:title,
                description:description,
                category:category,
            });

            await product.save();

        } catch (error) {
            throw error;
        }
    };

    async GetAllProducts(filtro, busqueda){
        try {
            let finalResponse=[];
            let query={};

            if (filtro!==undefined) {
                query["category"]=filtro;
            };

            if (busqueda!==undefined) {
                query["title"]={$regex:busqueda, $options:"i"};
            };

            console.log("###QUERY-->", JSON.stringify(query));

            /*if (filtro===undefined) {
                finalResponse=await ProductModel.find();
            }else{
                finalResponse=await ProductModel.find({
                    category: filtro
                });
            }*/
            finalResponse=await ProductModel.find(query);
            
            return finalResponse;

        } catch (error) {
            throw error;
        }
    }

    async GetById(id){
        try {

            const product=await ProductModel.findById(id);
            return product;

        } catch (error) {
            
            throw error;
            
        }
    }

    async UpdateProduct(product){
        try {

            //AQUI TENDRIAMOS QUE APLICAR LAS MISMAS VALIDACIONES QUE EN EL CREATE
            await ProductModel.findByIdAndUpdate(product._id, product);
        } catch (error) {
            throw error;
        }
    }

};

module.exports=ProductController;