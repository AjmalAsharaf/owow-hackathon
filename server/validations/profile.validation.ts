import Joi from "joi";
export const createProfileSchema = Joi.object({
  skills: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    "array.base": `"skills" should be an array`,
    "array.min": `"skills" should have at least one item`,
    "any.required": `"skills" is required`,
  }),

  experience: Joi.array()
  .items(
    Joi.object({
      title: Joi.string().required().messages({
        "string.base": `"title" should be a string`,
        "any.required": `"title" is required`,
      }),
      company: Joi.string().required().messages({
        "string.base": `"company" should be a string`,
        "any.required": `"company" is required`,
      }),
      startDate: Joi.string().isoDate().required().messages({
        "string.base": `"startDate" should be a valid ISO date string`,
        "any.required": `"startDate" is required`,
      }),
      endDate: Joi.string().isoDate().allow("present").required().messages({
        "string.base": `"endDate" should be a valid ISO date string or "present"`,
        "any.required": `"endDate" is required`,
      }),
      roleDescription: Joi.string().optional().messages({
        "string.base": `"roleDescription" should be a string`,
      }),
      location: Joi.string().optional().messages({
        "string.base": `"location" should be a string`,
      }),
    })
  )
  .messages({
    "array.base": `"experience" should be an array`,
    "array.min": `"experience" should have at least one item`
  }),


  resume: Joi.string().uri().trim().required().messages({
    "string.uri": `"resume" should be a valid URL`,
    "any.required": `"resume" is required`,
  }),
});
