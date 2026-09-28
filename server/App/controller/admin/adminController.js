const adminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
let adminController = {
    login: async (req,res) =>{
        try{
            let {email,password} =req.body
            if(!email || !password){
                return res.send({
                    status:0,
                    message:"Please Enter Email and Password"
                })
            }

            //Check Email

            let admin = await  adminModel.findOne({email:email.trim()})

            if(!admin){
                return res.send({
                    status:0,
                    message:"Email Not Exist"
                })
            }

            // check password

            let isMatch = bcrypt.compareSync(password, admin.password)

            if(!isMatch){
                return res.send({
                    status:0,
                    message:"Invalid Password"
                })
            }

            // generate jwt token

            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                process.env.TOKENKEY || "admin_secret_key",
                { expiresIn: "7d" }
              );
              return res.send({
                status: 1,
                message: "Login successful!",
                token: token,
                admin: {
                  id: admin._id,
                  email: admin.email,
                },
              });

        }catch (error) {
            return res.send({
              status: 0,
              message: "Server Error: " + error.message,
            });
          }
       
    },
    // 1. FORGOT PASSWORD (OTP Generate)
    forgotPassword: async (req, res) => {
      try {
        const { email } = req.body;
    
        if (!email) {
          return res.status(400).json({
            status: 0,
            message: "Email address is required."
          });
        }
    
        const admin = await adminModel.findOne({ email: email.trim() });
        if (!admin) {
          return res.status(404).json({
            status: 0,
            message: "Account not found with this email."
          });
        }
    
        // Generate 4-digit numeric OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
        // Set expiry to 10 minutes from now
        admin.otp = otp;
        admin.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await admin.save();
    
        // Configure mail transporter with correct SMTP credentials from .env
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
    
        const mailOptions = {
          from: `"Security Team" <${process.env.SMTP_USER}>`,
          to: admin.email,
          subject: "Password Reset Request - OTP Verification",
          text: `Your one-time verification code is: ${otp}. It will expire in 10 minutes. If you did not request this, please ignore this email.`
        };
    
        await transporter.sendMail(mailOptions);
    
        return res.status(200).json({
          status: 1,
          message: "A verification OTP has been sent to your registered email."
        });
      } catch (error) {
        return res.status(500).json({
          status: 0,
          message: "Internal server error: " + error.message
        });
      }
    },
  
  // 2. VERIFY OTP
  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      if (!email || !otp) {
        return res.send({ status: 0, message: "Email aur OTP dono zaroori hain!" });
      }
  
      const admin = await adminModel.findOne({ email: email.trim() });
  
      if (!admin || admin.otp !== otp) {
        return res.send({ status: 0, message: "Galat OTP daala hai!" });
      }
  
      if (admin.otpExpires < Date.now()) {
        return res.send({ status: 0, message: "OTP expire ho chuka hai!" });
      }
  
      return res.send({
        status: 1,
        message: "OTP verified successfully!"
      });
    } catch (error) {
      return res.send({ status: 0, message: "Server error: " + error.message });
    }
  },
  
  // 3. RESET PASSWORD (Naya Password Save Karna)
  resetPassword: async (req, res) => {
    try {
      const { email, newPassword, confirmPassword } = req.body;
  
      if (!email || !newPassword || !confirmPassword) {
        return res.send({ status: 0, message: "Sabhi fields bharna zaroori hai!" });
      }
  
      if (newPassword !== confirmPassword) {
        return res.send({ status: 0, message: "Passwords match nahi kar rahe!" });
      }
  
      const admin = await adminModel.findOne({ email: email.trim() });
      if (!admin) {
        return res.send({ status: 0, message: "Admin nahi mila!" });
      }
  
      // New password hash karein
      const saltRounds = 10;
      const hash = bcrypt.hashSync(newPassword, saltRounds);
  
      admin.password = hash;
      admin.otp = null; // OTP clear kar do
      admin.otpExpires = null;
      await admin.save();
  
      return res.send({
        status: 1,
        message: "Password successfully change ho gaya hai! Ab login karein."
      });
    } catch (error) {
      return res.send({ status: 0, message: "Server error: " + error.message });
    }
  }
}

module.exports = adminController;