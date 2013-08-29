var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var CommentSchema = new Schema ({
  user: { type: String, default: '', trim: true },
  text: { type: String, default: '', trim: true },
  createdOn: { type: Date, default: Date.now }
})


CommentSchema.path('user').validate(function (user) {
  return user.length > 0
}, 'User name is required')

CommentSchema.path('text').validate(function (text) {
  return text.length > 0
}, 'Cannot add empty comment')

CommentSchema.method = {
  addUpdate: function (cb) {
    self.save(cb);
  }
}

CommentSchema.statics = {
  list: function (cb) {

    this.find()
        .sort({'createdOn': 1})
        .exec(cb)
  }
}

mongoose.model('Comment', CommentSchema)
