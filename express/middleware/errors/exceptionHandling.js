const CustomError = require("./CustomError");

exports.exceptionHandling = (error, req, res, next) => {
  console.log(error)
  if (error instanceof CustomError) {
    res.status(error.code)
      .send({
        status: error.code,
        message: error.message
      })
  } else {

    let statusCode;
    statusCode = error.status > 0 ? error.status : error.statusCode > 0 ? error.statusCode : 500

    let message;
    message = error.message ? error.message : 'Something went wrong'

    res.status(statusCode).send({
      status: statusCode,
      message: message
    });
  }
}