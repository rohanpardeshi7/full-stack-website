    const userModel = require("../../models/usermodel")
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const jwt = require('jsonwebtoken');


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
        updateProfile: async (req,res) =>{
            let {name, phone, address } = req.body
            let token = (req.headers.authorization.split(' ')[1])
            let { id } = jwt.verify(token, process.env.TOKENKEY)
            let updateobj = {
                name,
                phone,
                address
            }
            if(req.file){
                if(req.file.filename){
                    updateobj['image'] = req.file.filename
                }
            }
            await userModel.updateOne(
                {
                    _id:id
                },
                {
                    $set:updateobj
                }
            )
            res.send({
                status:1,
                message:"Profile Updated"
            })

           
        }
    }

    module.exports = authController