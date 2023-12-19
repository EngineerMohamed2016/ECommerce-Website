const { StatusCodes } = require('http-status-codes');

function handleErrorMiddleware(err, req, res, next) {
    let error = { status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, msg: err.message || 'There is an error!' };

    // mongoose validation 
    if (err.name === 'ValidationError') {
        const errorMsg = Object.values(err.errors).map(obj => obj.message).join(', ');
        error.msg = errorMsg;
        error.status = StatusCodes.BAD_REQUEST;
    }

    // errors come from async-await && jwt.verify() 
    // duplicated email
    if (err.code === 11000) {
        const errorMsg = `duplicated ${Object.keys(err.keyValue).join('')} (${Object.values(err.keyValue)}), Please choose another value.`;
        error.msg = errorMsg;
        error.status = StatusCodes.BAD_REQUEST;
    }

    // while deleteing object
    if (err.name === 'CastError') {
        error.msg = 'Provide a valid ID';
        error.status = StatusCodes.NOT_FOUND;
    }

    // now send response
    res.status(error.status).json({ "error-msg": error.msg });


}

module.exports = handleErrorMiddleware;