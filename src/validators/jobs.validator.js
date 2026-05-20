const Joi = require('joi');

const JobPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),

  companyId: Joi.string(),
  categoryId: Joi.string(),
  company_id: Joi.string(),
  category_id: Joi.string(),

  job_type: Joi.string().allow('', null),
  experience_level: Joi.string().allow('', null),
  location_type: Joi.string().allow('', null),
  location_city: Joi.string().allow('', null),
  location: Joi.string().allow('', null),
  salary: Joi.any(),
  salary_min: Joi.any(),
  salary_max: Joi.any(),
  is_salary_visible: Joi.boolean(),
  status: Joi.string().allow('', null),
})
  .or('companyId', 'company_id')
  .or('categoryId', 'category_id')
  .unknown(true);

const JobUpdatePayloadSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  location: Joi.string().allow('', null),
  location_city: Joi.string().allow('', null),
  salary: Joi.any(),
  salary_min: Joi.any(),
  salary_max: Joi.any(),
  status: Joi.string().allow('', null),
}).unknown(true);

module.exports = {
  JobPayloadSchema,
  JobUpdatePayloadSchema,
};