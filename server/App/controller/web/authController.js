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
        let { oldPassword, newPassword, confirmPassword } = req.body
        try {
            let token = (req.headers.authorization.split(' ')[1])
            let { id } = jwt.verify(token, process.env.TOKENKEY)
            let userData = await userModel.findOne({ _id: id })
            let dbpassword = await userData.password
            if (bcrypt.compareSync(oldPassword, dbpassword)) {
                if (newPassword == confirmPassword) {
                    const hash = bcrypt.hashSync(newPassword, saltRounds)
                    await userModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                password: hash
                            }

                        }

                    )
                    res.send({
                        status: 1,
                        message: ' Password Changed Successfully'
                    })
                } else {
                    res.send({
                        status: 0,
                        message: 'New Password and Confirm Password are Not Matched'
                    })
                }
            } else {
                res.send({
                    status: 0,
                    message: 'Invalid old password'
                })
            }
        } catch (err) {
            res.send({
                status: 0,
                message: 'Please send token'
            })
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
          let { email } = req.body;
          if (!email) {
            return res.send({ status: 0, message: "Email is required" });
          }
    
          const cleanEmail = email.trim().toLowerCase();
          let checkEmail = await userModel.findOne({
            email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
          });
    
          if (!checkEmail) {
            return res.send({ status: 0, message: "Email Not Found" });
          }
    
          // Generate a secure random token
          const resetToken = crypto.randomBytes(32).toString("hex");
    
          // Save token and set expiry to 30 minutes from now
          checkEmail.resetToken = resetToken;
          checkEmail.resetTokenExpire = Date.now() + 30 * 60 * 1000;
          await checkEmail.save();
    
          // Send the temporary token in the URL instead of user _id
          const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    
          await transporter.sendMail({
            from: '"Furniture Website" <rohanpardeshi93@gmail.com>',
            to: checkEmail.email,
            subject: "Password Reset Link (Valid for 30 mins)",
            html: `
              <div style="font-family: sans-serif; padding: 20px;">
                <h2>Password Reset Request</h2>
                <p>This link is valid for <strong>30 minutes</strong> and can only be used <strong>once</strong>.</p>
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
    
      // Step 2: Check if link is still valid when page loads
      verifyResetToken: async (req, res) => {
        let { token } = req.params;
    
        // Check if token exists in DB and expiry time is still in the future
        let user = await userModel.findOne({
          resetToken: token,
          resetTokenExpire: { $gt: Date.now() },
        });
    
        if (!user) {
          return res.send({
            status: 0,
            message: "This link has expired or has already been used.",
          });
        }
    
        return res.send({
          status: 1,
          message: "Token is valid",
        });
      },
    
      // Step 3: Update Password and Invalidate Token
      resetPassword: async (req, res) => {
        let { token } = req.params;
        let { password } = req.body;
    
        let user = await userModel.findOne({
          resetToken: token,
          resetTokenExpire: { $gt: Date.now() },
        });
    
        if (!user) {
          return res.send({
            status: 0,
            message: "Link has expired or already used.",
          });
        }
    
        // Hash the new password
        const hash = bcrypt.hashSync(password, saltRounds);
        user.password = hash;
    
        // Invalidate the token so it cannot be used again
        user.resetToken = null;
        user.resetTokenExpire = null;
        await user.save();
    
        return res.send({
          status: 1,
          message: "Password Updated Successfully",
        });
      },
}

module.exports = authController