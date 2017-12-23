module.exports= {
	
	response: function(status,res,opts) {
		let message = ''
		let code = 0

		switch status{
			case 'ok':
				message = 'SUCCESS'
				code = 200
			case 'fail':
				message = 'SERVER_ERROR'
				code = 500
			case 'unauth':
				message = 'UNAUTHORIZED'
				code = 401
			case 'bad':
				message = 'BAD_REQUEST'
				code = 400
			default:
				message = 'UNKNOWN_ERROR'
				code = 1
		}

		return res.status(code).json({
			code: code,
			message: message,
			data: opts
		})	
	}
}