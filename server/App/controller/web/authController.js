const userModel = require("../../models/usermodel")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { transporter } = require("../../config/helper");
const crypto = require("crypto");


let authController = {
    register: async (req, res) => {
        let { name, email, password } = req.body

        let checkEmail = await userModel.findOne({ email })
        if (checkEmail) {
            return (
                res.send(
                    {
                        status: false,
                        message: "Email Already Exist"
                    }
                )
            )
        } else {
            const hash = bcrypt.hashSync(password, saltRounds);
            let obj = {
                name,
                email,
                password: hash
            }
            let userRes = await userModel.create(obj)
            return res.send({
                status: true,
                message: "User Creates",
                userRes
            }

            )
        }

    },
    login: async (req, res) => {
        let { email, password } = req.body
        let userData = await userModel.findOne({ email })
        if (userData) {
            let dbpassword = userData.password
            if (bcrypt.compareSync(password, dbpassword)) {  //login
                let token = jwt.sign({ id: userData._id }, process.env.TOKENKEY);
                res.send({
                    status: 1,
                    data: userData,
                    token
                })
            }
            else {
                return res.send(
                    {
                        status: false,
                        message: "Invalid Password"
                    }
                )
            }; // true




        } else {
            return (res.send(
                {
                    status: false,
                    message: "Email Not Found"
                }
            )
            )
        }

    },
    // After login apies
    changePassword: async (req, res) => {
      let { oldPassword, newPassword, confirmPassword } = req.body;
      try {
        if (!req.headers.authorization) {
          return res.send({
            status: 0,
            message: "Please send token",
          });
        }
    
        let token = req.headers.authorization.split(" ")[1];
        let { id } = jwt.verify(token, process.env.TOKENKEY);
    
        let userData = await userModel.findOne({ _id: id });
        if (!userData) {
          return res.send({
            status: 0,
            message: "User not found",
          });
        }
    
        let dbpassword = userData.password;
    
        if (bcrypt.compareSync(oldPassword, dbpassword)) {
          if (newPassword === confirmPassword) {
            const hash = bcrypt.hashSync(newPassword, saltRounds);
    
            await userModel.updateOne(
              { _id: id },
              {
                $set: { password: hash },
              }
            );
    
            return res.send({
              status: 1,
              message: "Password Changed Successfully",
            });
          } else {
            return res.send({
              status: 0,
              message: "New Password and Confirm Password do not match",
            });
          }
        } else {
          return res.send({
            status: 0,
            message: "Invalid old password",
          });
        }
      } catch (err) {
        return res.send({
          status: 0,
          message: "Please send token or session expired",
        });
      }
    },
    updateProfile: async (req, res) => {
        let { name, phone, address } = req.body
        let token = (req.headers.authorization.split(' ')[1])
        let { id } = jwt.verify(token, process.env.TOKENKEY)
        let updateobj = {
            name,
            phone,
            address
        }
        if (req.file) {
            if (req.file.filename) {
                updateobj['image'] = req.file.filename
            }
        }
        await userModel.updateOne(
            {
                _id: id
            },
            {
                $set: updateobj
            }
        )
        res.send({
            status: 1,
            message: "Profile Updated"
        })


    },

    // forgotPassword controller ke andar:
    forgotPassword: async (req, res) => {
      try {
        const { email } = req.body;
        if (!email) {
          return res.send({ status: 0, message: "Email is required" });
        }
  
        const cleanEmail = email.trim().toLowerCase();
        const checkEmail = await userModel.findOne({
          email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
        });
  
        if (!checkEmail) {
          return res.send({ status: 0, message: "Email Not Found" });
        }
  
        // Generate random unique token
        const resetToken = crypto.randomBytes(32).toString("hex");
  
        // Save token and 30-minute expiry to DB
        checkEmail.resetToken = resetToken;
        checkEmail.resetTokenExpire = Date.now() + 30 * 60 * 1000;
        await checkEmail.save();
  
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
  
        await transporter.sendMail({
          from: '"Furniture Store" <rohanpardeshi93@gmail.com>',
          to: checkEmail.email,
          subject: "Password Reset Request (Valid for 30 mins)",
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Password Reset Request</h2>
              <p>This link is valid for 30 minutes and can only be used once:</p>
              <a href="${resetLink}" 
                 style="background-color: #c09578; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Reset Password
              </a>
            </div>
          `,
        });
  
        return res.send({
          status: 1,
          message: "Reset Password Link Sent to Your Email ID",
        });
      } catch (error) {
        return res.send({
          status: 0,
          message: error.message || "Something went wrong",
        });
      }
    },
  
    // 2. Check Token on Page Load
    verifyResetToken: async (req, res) => {
      try {
        const { token } = req.params;
  
        const user = await userModel.findOne({
          resetToken: token,
          resetTokenExpire: { $gt: Date.now() },
        });
  
        if (!user) {
          return res.send({
            status: 0,
            message: "Link has expired or has already been used.",
          });
        }
  
        return res.send({
          status: 1,
          message: "Token is valid",
        });
      } catch (error) {
        return res.send({ status: 0, message: "Server error" });
      }
    },
  
    // 3. Update Password & Invalidate Token
    resetPassword: async (req, res) => {
      try {
        const { token } = req.params;
        const { password } = req.body;
  
        if (!password) {
          return res.send({ status: 0, message: "Password is required" });
        }
  
        const user = await userModel.findOne({
          resetToken: token,
          resetTokenExpire: { $gt: Date.now() },
        });
  
        if (!user) {
          return res.send({
            status: 0,
            message: "Link has expired or has already been used.",
          });
        }
  
        // Hash password and destroy the token
        const hash = bcrypt.hashSync(password, saltRounds);
        user.password = hash;
        user.resetToken = null;
        user.resetTokenExpire = null;
        await user.save();
  
        return res.send({
          status: 1,
          message: "Password updated successfully!",
        });
      } catch (error) {
        return res.send({
          status: 0,
          message: error.message || "Something went wrong",
        });
      }
    },
  };

module.exports = authController