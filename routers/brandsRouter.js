"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var getData_1 = require("../controllers/getData");
router.get('/getall', getData_1.getBrands);
router.post('/seeddata', getData_1.seedData);
exports.default = router;
