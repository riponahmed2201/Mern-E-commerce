const successResponseHandler = async (res, statusCode, message, keyOfData, data) => {

    const responseResult = {
        status: "success",
        statusCode: statusCode,
        message: message
    };

    if (keyOfData && data) responseResult[keyOfData] = data;
    if (!keyOfData && data) responseResult.data = data;

    return res.status(statusCode).json(responseResult);
};

const readerSuccessResponseHandler = async (res, statusCode, message, keyOfData, data) => {

    let responseResult = {
        status: "success",
        statusCode: statusCode,
        message: message
    };

    if (keyOfData && data) responseResult[keyOfData] = data;
    if (!keyOfData && data) responseResult = { ...responseResult, ...data };

    return res.status(statusCode).json(responseResult);
};

module.exports = { successResponseHandler, readerSuccessResponseHandler };