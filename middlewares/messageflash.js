module.exports = function(request, response, next) {
  // condition that checks the existence of a flash message and stores it in a 'locals' variable that will be available on the view
  if (request.session.messageflash) {
    response.locals.messageflash = request.session.messageflash;
    // reset the flash message key so as not to keep the error
    request.session.messageflash = undefined;
  }

  // Storing the message in the session object with a messageflash key
  request.messageflash = function(type, content) {
    // checks the existence of the message, if it does not exist, returns an empty object. Avoids an error
    if (request.session.messageflash === undefined) {
      request.session.messageflash = {};
    };

    // at the messageflash key of the session, type will be error or good and will contain the message
    request.session.messageflash[type] = content;
  };

  next();
};
