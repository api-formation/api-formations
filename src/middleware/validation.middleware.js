import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("email").isEmail().withMessage("email must be valid"),
  body("mdp").isLength({ min: 8 }).withMessage("password min 8 chars"),
  body("nom").exists().withMessage("nom required"),
  body("prenom").exists().withMessage("prenom required"),
  body("age").isInt({ min: 0 }).exists().withMessage("age must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("email must be valid"),
  body("mdp").exists().withMessage("password required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export const validateUserCreate = [
  body("email").isEmail().withMessage("email must be valid"),
  body("mdp").isLength({ min: 8 }).withMessage("password min 8 chars"),
  body("name").exists().withMessage("name required"),
  body("prenom").exists().withMessage("prenom required"),
  body("age").isInt({ min: 0 }).exists().withMessage("age must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export const validateUserUpdate = [
  body("email").isEmail().withMessage("email must be valid"),
  body("mdp").isLength({ min: 8 }).withMessage("password min 8 chars"),
  body("name").exists().withMessage("name required"),
  body("prenom").exists().withMessage("prenom required"),
  body("age").isInt({ min: 0 }).exists().withMessage("age must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
export const validateFormationCreate = [
  body("email").isEmail().withMessage("email must be valid"),
  body("mdp").isLength({ min: 8 }).withMessage("password min 8 chars"),
  body("name").exists().withMessage("name required"),
  body("prenom").exists().withMessage("prenom required"),
  body("age").isInt({ min: 0 }).exists().withMessage("age must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export const validateFormationUpdate = [
  body("email").isEmail().withMessage("email must be valid"),
  body("mdp").isLength({ min: 8 }).withMessage("password min 8 chars"),
  body("name").exists().withMessage("name required"),
  body("prenom").exists().withMessage("prenom required"),
  body("age").isInt({ min: 0 }).exists().withMessage("age must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];


