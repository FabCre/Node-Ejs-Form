// If the status is 404 display the 404 view
module.exports = function(request, response, next) {
  response.status(404).render('pages/404');
};
