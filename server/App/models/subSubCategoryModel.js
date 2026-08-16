const mongoose = require("mongoose");

let subSubCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please fill the name"],
        minLength: [2, "Sub Sub Category name must be at least 2 characters long"],
        maxLength: [100, "Sub Sub Category name cannot exceed 100 characters"]
    },
    parant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    },
    image: String,
    order: {
        type: Number,
        required: [true, "Fill the order"]
    },
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

let subSubCategoryModel = mongoose.model("subSubcategory", subSubCategorySchema);

module.exports = subSubCategoryModel;