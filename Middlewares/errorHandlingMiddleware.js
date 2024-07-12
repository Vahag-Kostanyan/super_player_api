const { sendSendNotification } = require("../api/sendNotification");

const errorHandlingMiddleware = async (err, req, res, next) => {
    sendSendNotification(JSON.stringify({ message: 'Something went wrong!', error: err?.message}));
    res.status(500).json({ message: 'Something went wrong!', error: err?.message});
}

module.exports = errorHandlingMiddleware;