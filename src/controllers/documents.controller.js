const documentsService = require('../services/documents.service');

const postDocumentHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('Document wajib diupload');
      error.statusCode = 400;
      throw error;
    }

    const document = await documentsService.addDocument(req.userId, req.file);

    res.status(201).json({
      status: 'success',
      message: 'Document berhasil diupload',
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDocumentsHandler = async (req, res, next) => {
  try {
    const documents = await documentsService.getDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        documents,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDocumentByIdHandler = async (req, res, next) => {
  try {
    const document = await documentsService.getDocumentById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteDocumentByIdHandler = async (req, res, next) => {
  try {
    await documentsService.deleteDocumentById(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Document berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postDocumentHandler,
  getDocumentsHandler,
  getDocumentByIdHandler,
  deleteDocumentByIdHandler,
};