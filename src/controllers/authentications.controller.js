const usersService = require('../services/users.service');
const authenticationsService = require('../services/authentications.service');
const tokenManager = require('../utils/tokenManager');

const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('../validators/authentications.validator');

const postAuthenticationHandler = async (req, res, next) => {
  try {
    const payload = req.body || {};

    const { error } = PostAuthenticationPayloadSchema.validate(payload);

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const { email, password } = payload;

    const id = await usersService.verifyUserCredential(email, password);

    const accessToken = tokenManager.generateAccessToken({ id });
    const refreshToken = tokenManager.generateRefreshToken({ id });

    await authenticationsService.addRefreshToken(refreshToken);

    res.status(200).json({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putAuthenticationHandler = async (req, res, next) => {
  try {
    const payload = req.body || {};

    const { error } = PutAuthenticationPayloadSchema.validate(payload);

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const { refreshToken } = payload;

    await authenticationsService.verifyRefreshTokenInDatabase(refreshToken);

    const { id } = tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = tokenManager.generateAccessToken({ id });

    res.status(200).json({
      status: 'success',
      message: 'Access token berhasil diperbarui',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthenticationHandler = async (req, res, next) => {
  try {
    const payload = req.body || {};

    const { error } = DeleteAuthenticationPayloadSchema.validate(payload);

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const { refreshToken } = payload;

    await authenticationsService.verifyRefreshTokenInDatabase(refreshToken);
    await authenticationsService.deleteRefreshToken(refreshToken);

    res.status(200).json({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAuthenticationHandler,
  putAuthenticationHandler,
  deleteAuthenticationHandler,
};