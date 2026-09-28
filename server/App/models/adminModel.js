const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: "",
    },
    CompnyName: {
      type: String,
      default: "",
    },
    officalEmail: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    mapURL: {
      type: String,
      default: "",
    },
    otp: {
        type: String,
        default: null
      },
      otpExpires: {
        type: Date,
        default: null
      }
  },
  {
    timestamps: true, // isse createdAt aur updatedAt automatically add ho jayenge
  }
);

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;