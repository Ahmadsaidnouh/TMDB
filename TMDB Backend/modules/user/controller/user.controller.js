const userModel = require("../../../DB/models/user.model");
const jwt = require("jsonwebtoken");
const fs = require("fs")
const { resolve } = require('path');
// const bcrypt = require("bcrypt");
const sendEmail = require("../../../common/email.handling");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLECLIENTID);
const CryptoJs = require("crypto-js")


const signUp = async (req, res) =>
{
    console.log(req.file);
    let { userName, email, password } = req.body;
    console.log(userName, email, password);
    try {
        const createdUser = new userModel({ userName, email, password });
        const addedUser = await createdUser.save();
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 120 });
        const refreshToken = jwt.sign({ email }, process.env.SECRET_KEY);
        const message = `<a href= "${req.protocol}://${req.headers.host}/user/confirmEmail/${token}">Click to confirm email.</a>
        <p>Note: the confirmation link will expire within two minutes.</p>
        <a href= "${req.protocol}://${req.headers.host}/user/resendConfirmationEmail/${refreshToken}">Click to resend confirm email.</a>
        `
        sendEmail(email, message);
        addedUser.password = undefined;
        res.json({ message: "Success", addedUser });
    } catch (error) {
        res.status(400).json({ message: "User with such email already exists!!", error });
    }
}

const confirmEmail = async (req, res) =>
{
    let { token } = req.params;
    try {
        let { email } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findOne({ email });
        if (user) {
            if (user.isConfirmed) {
                res.json({ message: "Email already confirmed!!" });
            }
            else {
                const updatedUser = await userModel.findByIdAndUpdate(user._id, { isConfirmed: true }, { new: true });
                res.json({ message: "Done. Email confirmed successfully!!", user: updatedUser });
            }
        }
        else {
            res.status(400).json({ message: "No user with such email!!" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid token!!" });
    }
}
const resendConfirmation = async (req, res) =>
{
    let { token } = req.params;
    try {
        let { email } = await jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await userModel.findOne({ email });
        
        if (user) {
            if (user.isConfirmed) {
                res.json({ message: "Email already confirmed!!" });
            }
            else {
                const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 60 });
                const message = `<a href= "${req.protocol}://${req.headers.host}/user/confirmEmail/${token}">Click to confirm email.</a>
                                <p>Note: the confirmation link will expire within one minute.</p>`
                sendEmail(email, message);
                res.json({ message: "Confirmation email resent successfully(expires within one minute)." });
                
            }
        }
        else {
            res.status(400).json({ message: "No user with such email!!" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid token!!" });
    }
}

const signInGoogle = (req, res) =>
{
    let { googleResponse } = req.body;
    const idToken = googleResponse.idToken;
    client.verifyIdToken({ idToken, audience: process.env.GOOGLECLIENTID }).then(async (response) =>
    {
        const { email, email_verified } = response.payload;
        if (email_verified) {
            const user = await userModel.findOne({ email });
            if (user) {
                const token = jwt.sign({ user }, process.env.SECRET_KEY);
                res.json({ message: `Success`, token });
            }
            else {
                const newUserData = { userName: response.payload.name.slice(0, 10), email: response.payload.email, isConfirmed: true, accountType: "google", profilePic: response.payload.picture }
                const newUser = await userModel.insertMany(newUserData);
                const token = jwt.sign({ newUser }, process.env.SECRET_KEY);
                res.json({ message: `Success`, token });
            }
        }
        else {
            res.status(400).json({ message: "Email isn't confirmed!!" })
        }

    })
}

const editProfilePic = async (req, res) =>
{
    let user = req.user;
    try {
        if (req.file) {
            const profilePicURL = `${req.protocol}://${req.headers.host}/${req.file.path}`;
            if (user.profilePic) {

                let oldProfilePicURL = user.profilePic.replace(`${req.protocol}://${req.headers.host}/uploads\\`, "");
                let pathh = resolve('./uploads') + "\\" + oldProfilePicURL;
                console.log(pathh);
                fs.unlink(pathh, (err) =>
                {
                    if (err)
                        console.log("error while deleteting");
                    else
                        console.log("deleted successfully");
                })

            }
            const updatedUser = await userModel.findByIdAndUpdate(user._id, { profilePic: profilePicURL }, { new: true });
            res.json({ message: "Profile picture updated successfully!!", updatedUser });
        }
        else {
            res.status(400).json({ message: "No photo was uploaded!!" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error will saving!!" })
    }
}
const signIn = async (req, res) =>
{
    let { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        if (user.isConfirmed) {
            
            let userPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJs.enc.Utf8);
            console.log(userPassword, password);
            if (password == userPassword) {
                user.password = undefined;
                const token = jwt.sign({ user }, process.env.SECRET_KEY);
                res.json({ message: `Success`, token });
            }
            else {
                res.status(400).json({ message: "Password is incorrect!!" })
            }
        }
        else {
            res.status(400).json({ message: "Email isn't confirmed!!" })
        }
    }
    else {
        res.status(400).json({ message: "No user with such email!!" })
    }
}



module.exports = {
    signUp,
    confirmEmail,
    resendConfirmation,
    signInGoogle,
    editProfilePic,
    signIn,
    signInGoogle
}