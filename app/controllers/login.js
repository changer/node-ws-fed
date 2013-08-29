

//for XML parsing
var xml2js = require('xml2js');
var https = require('https');
//to process WS-Trust requests
var trustClient = require('wstrust-client');

exports.index = function (req, res) {
  res.render('login', {
    title: 'Login'
  })
}

exports.authChanger = function (req, res) {
  var userName = req.name
  var userPassword = req.password

  trustClient.requestSecurityToken({
          scope: 'http://seroternodeadfs.azurewebsites.net',
          username: userName,
          password: userPassword,
          endpoint: 'https://[AD FS server IP address]/adfs/services/trust/13/UsernameMixed'
      }, function (rstr) {

            var rawToken = rstr.token;
            console.log('raw: ' + rawToken);

            var parser = new xml2js.Parser;
            parser.parseString(rawToken, function(err, result){
              var user = result.Assertion.AttributeStatement[0].Attribute[0].AttributeValue[0];
              var roles = result.Assertion.AttributeStatement[0].Attribute[1].AttributeValue;
              console.log(user);
              console.log(roles);
              res.render('profile', {title: 'User Profile', username: user, userroles: roles});
            })
      }, function (error) {
        console.log(error)
      })
}

exports.changer = function (req, res) { 

  res.render('login', {
    title: 'ADFS Login'
  })
}

exports.authenticate = function (req, res) {
  if (req.body.name === 'anit' && req.body.password === 'rai')
    res.redirect('/');
  else
    return res.send('500')
}

exports.signin = function (req, res) { }

exports.authCallback = function (req, res, next) {

  console.log('response from callback ', req.body)
  res.redirect('/')
}
