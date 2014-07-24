var mySqlConnector = require('./connectors/mysql-connector.js');

exports.getCreature = function(id, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'SELECT * FROM CREATURE where id = ' + id;
			connection.query(sql , function(err, rows) {
			    console.log(rows);
			    connection.release();
			    if(!rows && !rows.length){
			    	callback({status:404, response:{'error':{'type':'minor', 'message':'There is no creature for the id: ' + id + '.'}}});
					return;
			    }
			    callback({status:200, response:rows[0]});
			});
		});
};
exports.updateCreature = function(id, creature, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'UPDATE CREATURE SET ? WHERE id = ' + id;
			connection.query(sql , creature, function(err, rows) {
				connection.release();
				if(err){
					console.log(err.stack);
					callback({status:500, response:{'error':{'type':'minor', 'message':'Error connecting while load creatures'}}});
					return;
				}
			    callback({status:200, response:null});
			});
		});
};

exports.deleteCreature  = function(id, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'DELETE FROM CREATURE WHERE id = ' + id + '' ;
			connection.query(sql , function(err, rows) {
				connection.release();
				if(err){
					callback({status:500, response:{'error':{'type':'minor', 'message':'Could not delete creatures.'}}});
					return;
				}
			    callback({status:204, response:null});
			});
		});
};



exports.getCreatures  = function(ids, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'SELECT * FROM CREATURE' ;
			
			if(ids != null){
				sql += ' WHERE id = "' + ids[0] + '"';
				for (var i = 1; i < ids.length; i++) {
					sql += 'OR id = "' + ids[i] + '"';
				};
			}
			connection.query(sql , function(err, rows) {
				if(err){
					connection.release();
					callback({status:500, response:{'error':{'type':'minor', 'message':'Error connecting while load creatures'}}});
					return;
				}
			    //realease connection
			    connection.release();
			    callback({status:200, response:{'creatures': rows}});
			});
		});
};

exports.deleteCreatures  = function(filter, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'DELETE FROM CREATURE' ;
			
			if(filter != null){
				sql += ' WHERE type = "' + filter + '"';
			}
			connection.query(sql , function(err, rows) {
				connection.release();
				if(err){
					callback({status:500, response:{'error':{'type':'minor', 'message':'Could not delete creatures.'}}});
					return;
				}
			    callback({status:204, response:null});
			});
		});
};

exports.insertCreature  = function(creature, callback){
		mySqlConnector.getConnection(function(err, connection){
		if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			connection.query('INSERT INTO CREATURE SET ?', creature, 
				function(err, result) {
					connection.release();
					if(err){
						callback({status:500, response:{'error':{'type':'minor', 'message':'Could not delete creatures.'}}});
						return;
					}
				    callback({status:200, response:null});
					return;
			});
	});
};