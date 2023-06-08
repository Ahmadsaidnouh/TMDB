const router = require("express").Router();
const upload = require("../../middleware/image.upload");
const {
    signUp,
    confirmEmail,
    resendConfirmation,
    signInGoogle,
    editProfilePic,
    signIn
} = require("./controller/user.controller");
const validationFunc = require("../../middleware/validation");
const {
    signUpValidation,
    signInValidation,
} = require("./user.validation");
const auth = require("../../middleware/auth");
const userModel = require("../../DB/models/user.model");


// apis start*************************
const jwt = require("jsonwebtoken");
router.get("/tok/:id", (req, res) => {
    let {id} = req.params
    const token = jwt.sign({ id, isLoggedIn:true }, process.env.SECRET_KEY); 
    res.json({token})
});
router.post("/user/signUp", validationFunc(signUpValidation), signUp);
router.get("/user/confirmEmail/:token", confirmEmail);
router.get("/user/resendConfirmationEmail/:token", resendConfirmation);
router.patch("/user/editProfilePic",auth("User"), upload.single('avatar'),editProfilePic);
router.post("/user/signInGoogle", signInGoogle);
router.post("/user/signIn", validationFunc(signInValidation), signIn);
// apis end*************************


module.exports = router;