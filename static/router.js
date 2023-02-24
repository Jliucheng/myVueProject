let express = require("express");
let router = express.Router();
let name = require("./API/Name");
let data = require("./API/Data");
let user = require("./API/user");
//let GetCarton = require("./API/GetCarton");


router.get("/name/search", name.search);
router.get("/name/insertName", name.insertName);
router.get("/name/searchName", name.searchName);
router.get("/name/deleteVideo", name.deleteVideo);
router.get("/name/refresh", name.refresh);
router.get("/data/loadData", data.loadData);
router.get("/data/search", data.search);
router.get("/data/insertData", data.insertData);
router.get("/data/searchName", data.searchName);
router.get("/data/loadView", data.loadView);
router.get("/user/login", user.login);


module.exports = router;