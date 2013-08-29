
/*!
 * Module dependencies
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userPlugin = require('mongoose-user')

/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  hashed_password: { type: String },
  salt: { type: String }
})

/**
 * User plugin
 */

UserSchema.plugin(userPlugin, {})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

})

/**
 * Statics
 */

UserSchema.static({

})

/**
 * Register
 */

mongoose.model('User', UserSchema)
