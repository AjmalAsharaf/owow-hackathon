import Joi from "joi";
export const createProfileSchema = Joi.object({
  skills: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    "array.base": `"skills" should be an array`,
    "array.min": `"skills" should have at least one item`,
    "any.required": `"skills" is required`,
  }),

  experience:  Joi.array().items(Joi.string()).required().messages({
    "array.base": `"experience" should be a array`,
    "array.min": `"experience" should have at least one item`,
    "any.required": `"experience" is required`,
  }),

  resume: Joi.string().uri().trim().required().messages({
    "string.uri": `"resume" should be a valid URL`,
    "any.required": `"resume" is required`,
  }),
});
