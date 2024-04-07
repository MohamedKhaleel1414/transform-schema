"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = exports.getBrands = void 0;
var Brands = require("../models/brands-schema.ts");
var faker_1 = require("@faker-js/faker");
var getBrands = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, transformedBrands_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Brands.find({}, {})];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, result.map(function (brand) { return brand.toJSON(); })];
            case 2:
                transformedBrands_1 = _a.sent();
                return [4 /*yield*/, result.forEach(function (item, index) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Brands.findOneAndReplace({ _id: item._id }, transformedBrands_1[index], { new: true, upsert: true, setDefaultsOnInsert: true })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _a.sent();
                res.send(result);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(400).send("Something went wrong");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getBrands = getBrands;
var seedData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function createRandomBrands() {
        return {
            brandName: faker_1.faker.string.alpha({ length: 6 }),
            headquarters: faker_1.faker.string.alpha({ length: { min: 4, max: 12 } }),
            numberOfLocations: faker_1.faker.number.int({ min: 1, max: 1000 }),
            yearFounded: faker_1.faker.number.int({
                min: 1600,
                max: new Date().getFullYear(),
            }),
        };
    }
    var newData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, faker_1.faker.helpers.multiple(createRandomBrands, {
                        count: 10,
                    })];
            case 2:
                newData = _a.sent();
                newData.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var created;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Brands(item)];
                            case 1:
                                created = _a.sent();
                                created
                                    .save()
                                    .then(function (data) { })
                                    .catch(function (error) {
                                    console.log(error);
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                res.status(201).send("Data seeded successfully");
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).send("Something went wrong");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.seedData = seedData;
