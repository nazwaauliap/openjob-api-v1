const usersService = require('../services/users.service');
const applicationsService = require('../services/applications.service');
const bookmarksService = require('../services/bookmarks.service');

const getProfileHandler = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.userId);

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

const getProfileApplicationsHandler = async (req, res, next) => {
  try {
    const applications = await applicationsService.getApplicationsByUserId(req.userId);

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

const getProfileBookmarksHandler = async (req, res, next) => {
  try {
    const bookmarks = await bookmarksService.getBookmarksByUserId(req.userId);

    res.status(200).json({
      status: 'success',
      data: {
        bookmarks,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfileHandler,
  getProfileApplicationsHandler,
  getProfileBookmarksHandler,
};