const Joi = require('joi');

const ApplicationPayloadSchema = Joi.object({
  jobId: Joi.string(),
  job_id: Joi.string(),
  coverLetter: Joi.string().allow('', null),
  cover_letter: Joi.string().allow('', null),
})
  .or('jobId', 'job_id')
  .unknown(true);

const ApplicationStatusPayloadSchema = Joi.object({
  status: Joi.string().valid('pending', 'reviewed', 'accepted', 'rejected').required(),
}).unknown(true);

module.exports = {
  ApplicationPayloadSchema,
  ApplicationStatusPayloadSchema,
};