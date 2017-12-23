var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var jwt_config = require('./jwtConfig');

var User = require('./models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var errors = [];  
  res.view('login', {title: 'Login View', errors: errors})
});

router.post('/login', function(req,res) {
	passport.authenticate('local', 
      _onPassportAuth.bind(this, req, res))(req, res);
});

router.post('/register', function(req,res) {
	User
    	.create(_.omit(req.allParams(), 'id'))
    	.then(function (user) {
    		return {
        		token: createToken(user),
        		user: user
        	};
    	})
    	.then(res.created)
    	.catch(function(err){
    	console.log(err);
    });
});

router.post('/addPerson',function(req,res) {
	
	let message = '';
	Person.findOne().exec(function(err,data) {
		Person.create().exec(function(err,created) {
			
			if(err) return res.serverError();
			res.status(200).json({
				message: message,
				data: data
			});
		})
	});
});


module.exports = router;


var hashPassword= function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }
  },
 
/**
* Compare user password hash with unhashed password
* @returns boolean indicating a match
*/
var comparePassword= function(password, user){
    return bcrypt.compareSync(password, user.password);
},
 
  /**
   * Create a token based on the passed user
   * @param user
   */
var createToken= function(user)
{
    return jwt.sign({
        user: {username: user.username, email: user.email, id: user.id}.toJSON()
      },
      jwt_config.SECRET,
      {
        algorithm: jwt_config.ALGORITHM,
        expiresIn: jwt_config.EXPIRES_IN_SECONDS,
        issuer: jwt_config.ISSUER,
        audience: jwt_config.AUDIENCE
      }
    );
}

function _onPassportAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);
 
  return res.ok({
    // TODO: replace with new type of cipher service
    token: createToken(user),
    user: user
  });
}