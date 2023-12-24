const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validationMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name Required")
    .not()
    .isNumeric()
    .withMessage("Invalid name format")
    .isLength({ min: 2, max: 32 })
    .withMessage("Name length must be between 3 and 32 characters"),
  check("category")
    .notEmpty()
    .withMessage("Category id Required")
    .isMongoId()
    .withMessage("Invalid Category id format"),

  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];
