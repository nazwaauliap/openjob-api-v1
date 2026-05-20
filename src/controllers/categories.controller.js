const { CategoryPayloadSchema } = require('../validators/categories.validator');
const categoriesService = require('../services/categories.service');

const postCategoryHandler = async (req, res, next) => {
  try {
    const { error } = CategoryPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const category = await categoriesService.addCategory(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Category berhasil ditambahkan',
      data: {
        id: category.id,
        name: category.name,
        created_at: category.created_at,
        updated_at: category.updated_at,
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      error.statusCode = 400;
      error.message = 'Category sudah digunakan';
    }

    next(error);
  }
};

const getCategoriesHandler = async (req, res, next) => {
  try {
    const categories = await categoriesService.getCategories();

    res.status(200).json({
      status: 'success',
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryByIdHandler = async (req, res, next) => {
  try {
    const category = await categoriesService.getCategoryById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        id: category.id,
        name: category.name,
        created_at: category.created_at,
        updated_at: category.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putCategoryByIdHandler = async (req, res, next) => {
  try {
    const { error } = CategoryPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const category = await categoriesService.editCategoryById(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Category berhasil diperbarui',
      data: {
        id: category.id,
        name: category.name,
        created_at: category.created_at,
        updated_at: category.updated_at,
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      error.statusCode = 400;
      error.message = 'Category sudah digunakan';
    }

    next(error);
  }
};

const deleteCategoryByIdHandler = async (req, res, next) => {
  try {
    await categoriesService.deleteCategoryById(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Category berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  putCategoryByIdHandler,
  deleteCategoryByIdHandler,
};