const bookmarksService = require('../services/bookmarks.service');

const postBookmarkHandler = async (req, res, next) => {
  try {
    const bookmark = await bookmarksService.addBookmark(
      req.userId,
      req.params.jobId
    );

    res.status(201).json({
      status: 'success',
      message: 'Bookmark berhasil ditambahkan',
      data: {
        id: bookmark.id,
        user_id: bookmark.user_id,
        job_id: bookmark.job_id,
        created_at: bookmark.created_at,
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      error.statusCode = 400;
      error.message = 'Job sudah ada di bookmark';
    }

    next(error);
  }
};

const getBookmarksHandler = async (req, res, next) => {
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

const getBookmarkByIdHandler = async (req, res, next) => {
  try {
    const bookmark = await bookmarksService.getBookmarkById(
      req.userId,
      req.params.jobId,
      req.params.id
    );

    res.status(200).json({
      status: 'success',
      data: {
        id: bookmark.id,
        user_id: bookmark.user_id,
        job_id: bookmark.job_id,
        job_title: bookmark.job_title,
        created_at: bookmark.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteBookmarkHandler = async (req, res, next) => {
  try {
    await bookmarksService.deleteBookmarkByUserAndJob(
      req.userId,
      req.params.jobId
    );

    res.status(200).json({
      status: 'success',
      message: 'Bookmark berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postBookmarkHandler,
  getBookmarksHandler,
  getBookmarkByIdHandler,
  deleteBookmarkHandler,
};