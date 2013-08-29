
var mongoose = require('mongoose')
var Comment  = mongoose.model('Comment')

exports.index = function (req, res) {

  Comment.list(function (err, comments) {
    if (!err) {
      res.render('comment', {
        title: 'Comments',
        comments: comments
      })
    }
  })
}

exports.add = function (req, res) {
  var comment = new Comment(req.body)
  comment.createdOn = new Date

  comment.save(function (err) {
    if (!err) {
      req.flash('success', 'Successfully added a commit')
      return res.redirect('/comment')
    }

    console.log(err)
    res.render('500', err)
  })

}
