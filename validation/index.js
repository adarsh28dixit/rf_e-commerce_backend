const joi = require("joi");

const createUserValidation = joi.object({
  // Optionall
  email: joi.string().email().optional(),
  name: joi
    .string()
    .regex(/^[a-zA-Z ]{2,30}$/)
    .optional(),
  password: joi.string().optional().min(6),
});

const signinUserValidation = joi.object({
    // Optionall
    email: joi.string().email().optional(),
    
    password: joi.string().optional().min(6),
  });

  const uploadProductValidation = joi.object({
    name: joi.string().optional(),
    description: joi.string().optional(),
    reviews: joi.number().optional(),
    price: joi.number().optional(),
    type: joi.string().optional(),
    color: joi.string().optional(),
    image: joi.string().optional()
  })

module.exports = {createUserValidation, signinUserValidation, uploadProductValidation};
