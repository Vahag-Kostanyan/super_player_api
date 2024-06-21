const errorHandlingMiddleware = async (err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong!', error: err?.message});
}

module.exports = errorHandlingMiddleware;