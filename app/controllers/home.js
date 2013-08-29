
/*!
 * Module dependencies.
 */



exports.index = function (req, res) {
  console.log('current user is ', req.user)
  res.render('home', {
    title: 'Node Express Mongoose Boilerplate',
    user: req.user
  })
}
