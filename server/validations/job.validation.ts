import Joi from "joi";

export const jobPostSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" is required`,
    "string.base": `"title" should be a string`
  }),
  description: Joi.string().required().messages({
    "any.required": `"description" is required`,
    "string.base": `"description" should be a string`
  }),
  company: Joi.string().required().messages({
    "any.required": `"company" is required`,
    "string.base": `"company" should be a string`
  }),
  location: Joi.string().required().messages({
    "any.required": `"location" is required`,
    "string.base": `"location" should be a string`
  }),
  requiredSkills: Joi.array().items(Joi.string()).required().messages({
    "any.required": `"requiredSkills" is required`,
    "array.base": `"requiredSkills" should be an array`
  }),
  salary: Joi.string().required().messages({
    "any.required": `"salary" is required`,
    "string.base": `"salary" should be a string`
  })
});
