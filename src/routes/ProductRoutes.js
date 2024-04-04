const ProductController=require('../controllers/ProductController');
const Auth=require('../utils/AuthMiddlewares');

const ProductRoutes=(base, app)=>{
    
    const controller= new ProductController();

    app.post(`${base}/`, Auth.isAuth, Auth.isAdmin, async(req, res, next)=>{
        
        try {
        
            const {title, description, category}=req.body;
            await controller.Create(title, description, category);
            return res.status(201).json({message:"Exito al crear un nuevo producto"})

        } catch (error) {
            console.error("Error al crear un producto", error);
            return res.status(500).json({message:"Ocurrió un error al intentar crear un nuevo producto"});
        }
    

    });

    app.get(`${base}/`, async(req, res)=>{
        try {
            const {filtro, busqueda}=req.query;
            console.log("VALOR DE LA QUERY FILTRO", filtro);
            const response=await controller.GetAllProducts(filtro, busqueda);
            return res.status(200).json(response);

        } catch (error) {
            console.error("Error al obtener todos los productos-->", error);
            return res.status(500).json({message:"Ocurrio un error al intentar obtener los productos"});
        }
    });

    app.get(`${base}/:id`, async(req, res)=>{
        try {
            const {id}=req.params;
            const response=await controller.GetById(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error(`Error al obtener el producto con id--> ${id}`, error);
            return res.status(500).json({message:"Ocurrio un error al intentar producto"});
        }
    })

    app.put(`${base}/update`,Auth.isAuth, Auth.isAdmin ,async (req, res)=>{
        try {
            const product=req.body;
            await controller.UpdateProduct(product);
            return res.status(200).json({message:"Exito"});
        } catch (error) {
            console.error("Error al actualizar un producto-->", error);
            return res.status(500).json({message:"Ocurrio un error al intentar actualizar el producto"});
        }
    })

}

module.exports=ProductRoutes;