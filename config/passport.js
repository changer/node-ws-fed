
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = mongoose.model('User')
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy

/**
 * Expose
 */

module.exports = function (passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })


  //user changer stragegy 

  passport.use('changer', new OAuth2Strategy({
      authorizationURL: 'http://192.168.1.15:8080/SSO/Auth/Authorize',
      tokenURL: 'http://192.168.1.15:8080/SSO/Auth/Token',
      clientID: 'sampleconsumer',
      clientSecret: 'samplesecret',
      callbackURL: 'http://localhost:3000/auth/changer/callback'
    },
    function (accessToken, refreshToken, profile, done) {

      profile = { uid: 206, name: 'anit', email: 'anitrai011@gmail.com' }
      User.findOne({'uid': profile.id, 'provider': 'changer'}, function (err, user) {
        if (user) {
          console.log('user found ', user)
          done(null, user)
        } 
        else {
          var newUser = new User()
          newUser.provider = 'changer'
          newUser.name = profile.name
          newUser.uid = profile.id,
          newUser.email = profile.email,
          console.log('trying to save ', newUser, profile)
          newUser.save(function (err) {
            if (err) throw err
            console.log('new user saved ', newUser)
            done(null, newUser)
          })
        }
      })
  }))
}
