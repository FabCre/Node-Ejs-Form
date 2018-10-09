// Same logic than MessageFlash
module.exports = function(request, response, next) {
  if (request.session.message) {
    response.locals.message = request.session.message;

    request.session.message = undefined;
  }

  request.message = function(type, content) {
    if (request.session.message === undefined) {
      request.session.message = {};
    };

    request.session.message[type] = content;
  };

  next();
};
