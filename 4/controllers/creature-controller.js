/* CREATURE PART */
var creatureStatement = require('./database/creature-statement.js');

module.exports.controller = function(app) {
	// CREATURE
	app.get('/creatures/:id', function(req, res){
		creatureStatement.getCreature(req.param('id') ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.put('/creatures/:id', function(req, res){
		creatureStatement.updateCreature(req.param('id'), req.body.creature ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.delete('/creatures/:id', function(req, res){
		creatureStatement.deleteCreature(req.param('id') ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});


	// CREATURES
	app.get('/creatures', function(req, res){
		creatureStatement.getCreatures(req.param('filter') ,function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.post('/creatures', function(req, res){
		creatureStatement.insertCreature(req.body.creature, function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
	app.delete('/creatures', function(req, res){
		creatureStatement.deleteCreatures(req.param('filter'),function(callback){
			res.status(callback.status)
			res.send(callback.response);
		});
	});
};
