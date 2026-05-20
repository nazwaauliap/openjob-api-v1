const {
  JobPayloadSchema,
  JobUpdatePayloadSchema,
} = require('../validators/jobs.validator');

const jobsService = require('../services/jobs.service');

const postJobHandler = async (req, res, next) => {
  try {
    const { error } = JobPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const job = await jobsService.addJob(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Job berhasil ditambahkan',
      data: {
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        company_id: job.company_id,
        category_id: job.category_id,
        created_at: job.created_at,
        updated_at: job.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getJobsHandler = async (req, res, next) => {
  try {
    const jobs = await jobsService.getJobs({
      title: req.query.title,
      companyName: req.query['company-name'],
    });

    res.status(200).json({
      status: 'success',
      data: {
        jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getJobByIdHandler = async (req, res, next) => {
  try {
    const job = await jobsService.getJobById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        company_id: job.company_id,
        company_name: job.company_name,
        category_id: job.category_id,
        category_name: job.category_name,
        created_at: job.created_at,
        updated_at: job.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getJobsByCompanyIdHandler = async (req, res, next) => {
  try {
    const jobs = await jobsService.getJobsByCompanyId(req.params.companyId);

    res.status(200).json({
      status: 'success',
      data: {
        jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getJobsByCategoryIdHandler = async (req, res, next) => {
  try {
    const jobs = await jobsService.getJobsByCategoryId(req.params.categoryId);

    res.status(200).json({
      status: 'success',
      data: {
        jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putJobByIdHandler = async (req, res, next) => {
  try {
    const { error } = JobUpdatePayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const job = await jobsService.editJobById(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Job berhasil diperbarui',
      data: {
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        company_id: job.company_id,
        category_id: job.category_id,
        created_at: job.created_at,
        updated_at: job.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteJobByIdHandler = async (req, res, next) => {
  try {
    await jobsService.deleteJobById(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Job berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postJobHandler,
  getJobsHandler,
  getJobByIdHandler,
  getJobsByCompanyIdHandler,
  getJobsByCategoryIdHandler,
  putJobByIdHandler,
  deleteJobByIdHandler,
};