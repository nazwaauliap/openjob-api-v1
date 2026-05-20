const {
  ApplicationPayloadSchema,
  ApplicationStatusPayloadSchema,
} = require('../validators/applications.validator');

const applicationsService = require('../services/applications.service');

const postApplicationHandler = async (req, res, next) => {
  try {
    const { error } = ApplicationPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const application = await applicationsService.addApplication(req.userId, req.body);

    res.status(201).json({
      status: 'success',
      message: 'Application berhasil ditambahkan',
      data: {
        id: application.id,
        user_id: application.user_id,
        job_id: application.job_id,
        status: application.status,
        cover_letter: application.cover_letter,
        created_at: application.created_at,
        updated_at: application.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationsHandler = async (req, res, next) => {
  try {
    const applications = await applicationsService.getApplications();

    res.status(200).json({
      status: 'success',
      data: {
        applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationByIdHandler = async (req, res, next) => {
  try {
    const application = await applicationsService.getApplicationById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        id: application.id,
        user_id: application.user_id,
        user_name: application.user_name,
        job_id: application.job_id,
        job_title: application.job_title,
        status: application.status,
        cover_letter: application.cover_letter,
        created_at: application.created_at,
        updated_at: application.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationsByUserIdHandler = async (req, res, next) => {
  try {
    const applications = await applicationsService.getApplicationsByUserId(req.params.userId);

    res.status(200).json({
      status: 'success',
      data: {
        applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationsByJobIdHandler = async (req, res, next) => {
  try {
    const applications = await applicationsService.getApplicationsByJobId(req.params.jobId);

    res.status(200).json({
      status: 'success',
      data: {
        applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putApplicationByIdHandler = async (req, res, next) => {
  try {
    const { error } = ApplicationStatusPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const application = await applicationsService.editApplicationStatusById(
      req.params.id,
      req.body
    );

    res.status(200).json({
      status: 'success',
      message: 'Application berhasil diperbarui',
      data: {
        id: application.id,
        user_id: application.user_id,
        job_id: application.job_id,
        status: application.status,
        cover_letter: application.cover_letter,
        created_at: application.created_at,
        updated_at: application.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplicationByIdHandler = async (req, res, next) => {
  try {
    await applicationsService.deleteApplicationById(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Application berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postApplicationHandler,
  getApplicationsHandler,
  getApplicationByIdHandler,
  getApplicationsByUserIdHandler,
  getApplicationsByJobIdHandler,
  putApplicationByIdHandler,
  deleteApplicationByIdHandler,
};