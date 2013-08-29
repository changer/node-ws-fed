
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var passportOptions = {
  failureFlash: 'Invalid email or password.',
  failureRedirect: '/login'
}

// controllers
var home = require('home')
var login = require('login')
var comment = require('comment')

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/', home.index)
  app.get('/login', login.index)
  app.post('/login', login.authenticate)

  app.get('/login/adfs', login.changer);
  app.post('/login/adfs', login.authChanger);

  app.get('/comment', comment.index)
  app.post('/comment', comment.add)

  app.get('/auth/changer', passport.authenticate('changer',{ scope: [ 'read', 'write', 'remove' ], failureRedirect: '/login' }), login.signin)
  app.get('/auth/changer/callback', passport.authenticate('changer', { failureRedirect: '/login' }), login.authCallback)
}
