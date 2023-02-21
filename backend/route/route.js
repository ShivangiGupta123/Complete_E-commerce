const express = require("express");
const auth = require("../middleware/userauth");
const adminAuth = require("../middleware/adminauth");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
const { Signup, Signin } = require("../controller/userController");
const { adminSignup, adminSignin } = require("../controller/adminController");
const { getProducts } = require("../controller/productController");
const {forgotPassword , resetPassword} = require("../controller/passwordResetController")
const {
  uploadProduct,
  deleteProducts,
  getProductsbyAdmin,
} = require("../controller/adminProductController");

const {
  postCart,
  getAddedCart,
  delSpecificCart,
  payment,
} = require("../controller/cartController");
const {
  addCategory,
  viewCategory,
  deleteCategory
} = require("../controller/categoryController");
router.post("/signup", Signup);

router.post("/signin", Signin);

router.post("/adminsignup", adminSignup);

router.post("/adminsignin", adminSignin);

router.get("/getproduct", auth, getProducts);

router.get("/getproductsByadmin",adminAuth, getProductsbyAdmin);

router.post(
  "/uploadproductByadmin",
  adminAuth,
  upload.single("myFile"),
  uploadProduct
);

router.delete("/:id", deleteProducts);

router.delete("/deleteCategory/:id",deleteCategory)

router.post("/postcart", auth, postCart);

router.get("/getaddedcart"  , auth , getAddedCart);

router.delete("/:cartId", delSpecificCart);

router.post("/payment", payment);

router.post("/addcategory", addCategory);

router.get("/viewcategory", viewCategory);

router.post("/forgotpassword" , forgotPassword)

router.post("/resetpassword" , resetPassword)

// router.get('/mensproducts',MensProducts)

// router.get("/getorder" , getOrder)

// router.get("/:order_id", getorderById)

// router.delete("/:orderId", deleteorderById)

// router.put("/Updateproduct/:id" , auth ,  updateProducts)

// router.route('/signup').post(Signup)

//  router.post('/uploadproductByadmin' ,adminAuth,  uploadProduct)

module.exports = router;
