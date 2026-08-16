const categoryModel = require("../../models/categoryModel");
const colorModel = require("../../models/colorModel");
const materialModel = require("../../models/materialModel");
const productModel = require("../../models/productModel");
const subCategoryModel = require("../../models/subCategoryModel");
const subSubCategoryModel = require("../../models/subSubCategoryModel");

let productController = {
  create: async (req, res) => {
    let insertObj = { ...req.body };

    // Safe File Extraction
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        insertObj['image'] = req.files.image[0].filename;
      }
      if (req.files.backImage && req.files.backImage[0]) {
        insertObj['backImage'] = req.files.backImage[0].filename;
      }
      if (req.files.gallery && req.files.gallery.length > 0) {
        insertObj['gallery'] = req.files.gallery.map((obj) => obj.filename);
      }
    }

    try {
      // 1. Check if Name or Order already exists
      let checkProduct = await productModel.findOne({
        $or: [
          { name: insertObj.name },
          { order: Number(insertObj.order) }
        ]
      });

      if (checkProduct) {
        let errorObj = {};

        if (checkProduct.name && insertObj.name && checkProduct.name.toLowerCase() === insertObj.name.toLowerCase()) {
          errorObj.name = "Product Name Already Exists";
        }
        if (checkProduct.order === Number(insertObj.order)) {
          errorObj.order = "Product Order Number Already Exists";
        }

        return res.status(400).json({
          status: false,
          message: "Duplicate Product Error",
          error: errorObj
        });
      }

      // 2. Create Product
      let ProductRes = await productModel.create(insertObj);

      return res.status(200).json({
        status: true,
        message: "Product Added Successfully",
        ProductRes
      });

    } catch (err) {
      let errorObj = {};

      if (err.errors) {
        for (let key in err.errors) {
          errorObj[key] = err.errors[key].message;
        }
      } else {
        errorObj['system'] = err.message;
      }

      return res.status(500).json({
        status: false,
        message: "Product Error",
        error: errorObj
      });
    }
  },

  view: async (req, res) => {
    try {
      let orCondition = [];
      if (req.query.name) {
        orCondition.push({ name: new RegExp(req.query.name, "i") });
      }

      let filter = {};
      if (orCondition.length >= 1) {
        filter.$or = orCondition;
      }

      let data = await productModel
        .find(filter)
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
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message
      });
    }
  },
  details:(req,res) => {
    let {id} = req.params
    let data = await productModel
        .findOne({_id:id})
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
  },
  parant: async (req, res) => {
    try {
      let data = await categoryModel.find({ status: true }).select('name');
      return res.status(200).json({
        status: true,
        data,
        message: "Product Category Data found"
      });
    } catch (err) {
      return res.status(500).json({ status: false, error: err.message });
    }
  },

  subCategory: async (req, res) => {
    try {
      let { parantID } = req.params;
      let data = await subCategoryModel.find({ parant: parantID, status: true }).select('name');
      return res.status(200).json({
        status: true,
        message: "Product SubCategory Data Found",
        data
      });
    } catch (err) {
      return res.status(500).json({ status: false, error: err.message });
    }
  },

  subSubCategory: async (req, res) => {
    try {
      let { parantID } = req.params;
      let data = await subSubCategoryModel.find({ subCategory: parantID, status: true }).select('name');
      return res.status(200).json({
        status: true,
        message: "Product subSubCategory Data Found",
        data
      });
    } catch (err) {
      return res.status(500).json({ status: false, error: err.message });
    }
  },

  color: async (req, res) => {
    try {
      let data = await colorModel.find({ status: true }).select('name');
      return res.status(200).json({
        status: true,
        message: "color found",
        data
      });
    } catch (err) {
      return res.status(500).json({ status: false, error: err.message });
    }
  },

  material: async (req, res) => {
    try {
      let data = await materialModel.find({ status: true }).select('name');
      return res.status(200).json({
        status: true,
        message: "material found",
        data
      });
    } catch (err) {
      return res.status(500).json({ status: false, error: err.message });
    }
  }
};

module.exports = productController;