const productModel = require("../../models/productModel");

let homeController = {
    slider:() =>{

    },
    review: ()=>{

    },
    homeProduct: async (rew,res)=>{
        let data = await productModel
        .find()
        .populate('parant', 'name')
        .populate('subCategory', 'name')
        .populate('subSubCategory', 'name')
        .populate('colors', 'name')
        .populate('materials', 'name')
        .sort({ order: 1 });

      let basePath = process.env.PRODUCTSTATICPATH || "http://localhost:8000/uploads/product/";
      if (!basePath.endsWith("/")) {
        basePath += "/";
      }

      let obj = {
        status: true,
        path: basePath,
        message: "Product found",
        data
      };

      return res.status(200).json(obj);
    },
    productDetail: async (req, res) => {
      try {
        const { slug } = req.params;
    
        // Direct slug se find karo (bina status condition ke)
        const product = await productModel
          .findOne({ slug: slug })
          .populate("parant", "name")
          .populate("subCategory", "name")
          .populate("subSubCategory", "name");
    
        if (!product) {
          return res.status(404).json({
            status: false,
            message: "Product not found"
          });
        }
    
        let basePath = process.env.PRODUCTSTATICPATH || "http://localhost:8000/uploads/product/";
        if (!basePath.endsWith("/")) basePath += "/";
    
        return res.status(200).json({
          status: true,
          path: basePath,
          data: product
        });
      } catch (err) {
        return res.status(500).json({
          status: false,
          message: err.message
        });
      }
    }

}

module.exports = homeController