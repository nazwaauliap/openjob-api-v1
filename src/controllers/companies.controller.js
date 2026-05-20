const { CompanyPayloadSchema } = require('../validators/companies.validator');
const companiesService = require('../services/companies.service');

const postCompanyHandler = async (req, res, next) => {
  try {
    const { error } = CompanyPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const company = await companiesService.addCompany(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Company berhasil ditambahkan',
      data: {
        id: company.id,
        name: company.name,
        location: company.location,
        description: company.description,
        website: company.website,
        created_at: company.created_at,
        updated_at: company.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCompaniesHandler = async (req, res, next) => {
  try {
    const companies = await companiesService.getCompanies();

    res.status(200).json({
      status: 'success',
      data: {
        companies,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyByIdHandler = async (req, res, next) => {
  try {
    const company = await companiesService.getCompanyById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        id: company.id,
        name: company.name,
        location: company.location,
        description: company.description,
        website: company.website,
        created_at: company.created_at,
        updated_at: company.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putCompanyByIdHandler = async (req, res, next) => {
  try {
    const { error } = CompanyPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const company = await companiesService.editCompanyById(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Company berhasil diperbarui',
      data: {
        id: company.id,
        name: company.name,
        location: company.location,
        description: company.description,
        website: company.website,
        created_at: company.created_at,
        updated_at: company.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteCompanyByIdHandler = async (req, res, next) => {
  try {
    await companiesService.deleteCompanyById(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Company berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCompanyHandler,
  getCompaniesHandler,
  getCompanyByIdHandler,
  putCompanyByIdHandler,
  deleteCompanyByIdHandler,
};