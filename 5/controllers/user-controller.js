/* USER PART */
var userStatement = require('./database/users-statement.js');

module.exports.controller = function(app) {
	// user
	app.get('/users/:id', function(req, res){
		userStatement.getUser(req.param('id') ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.put('/users/:id', function(req, res){
		userStatement.updateUser(req.param('id'), req.body.user ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.delete('/users/:id', function(req, res){
		userStatement.deleteUser(req.param('id') ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});

	app.get('/users/:id/creatures', function(req, res){
		userStatement.getCreaturesForUser(req.param('id') ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});

	// userS
	app.get('/users', function(req, res){
		userStatement.getUsersId(function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.post('/users', function(req, res){
		userStatement.insertUser(req.body.user, function(callback){

			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.delete('/users', function(req, res){
		userStatement.deleteUsers(function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});

};