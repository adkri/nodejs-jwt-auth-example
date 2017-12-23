module.exports = {

	EXPIRES_IN_SECONDS : 60*60*24, 
	SECRET : process.env.tokenSecret || "ewffew33iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM", 
	ALGORITHM : "HS256", 
	ISSUER : "test.com", 
	AUDIENCE : "test.com",
	 
	/**
	 * Configuration object for local strategy
	 */ 
	LOCAL_STRATEGY_CONFIG : {
	  usernameField: 'email',
	  passwordField: 'password',
	  passReqToCallback: false
	},
	 
	/**
	 * Configuration object for JWT strategy
	 */ 
	JWT_STRATEGY_CONFIG : {
	  secretOrKey: SECRET,
	  issuer : ISSUER,
	  audience: AUDIENCE,
	  passReqToCallback: false
	}


};
