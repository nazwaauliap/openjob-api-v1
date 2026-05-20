const { UserPayloadSchema } = require('../validators/users.validator');
const usersService = require('../services/users.service');

const postUserHandler = async (req, res, next) => {
  try {
    const { error } = UserPayloadSchema.validate(req.body || {});

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const user = await usersService.addUser(req.body);

    res.status(201).json({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      error.statusCode = 400;
      error.message = 'Email sudah digunakan';
    }

    next(error);
  }
};

const getUserByIdHandler = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postUserHandler,
  getUserByIdHandler,
};