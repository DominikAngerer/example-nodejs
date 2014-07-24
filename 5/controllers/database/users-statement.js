var mySqlConnector = require('./connectors/mysql-connector.js');

exports.getUser = function(id, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var data;
			var sql = 'SELECT * FROM USER where id = ' + id;
			connection.query(sql , function(err, rows) {
			    if(!rows && !rows.length){
			    	callback({status:404, response:{'error':{'type':'minor', 'message':'There is no User for the id: ' + id + '.'}}});
					return;
			    }
			   	data = rows[0];
			});

			sql = 'SELECT id FROM CREATURE where user = ' + id;
			connection.query(sql , function(err, rows) {
			    connection.release();
			    if(!rows && !rows.length){
			    	callback({status:404, response:{'error':{'type':'minor', 'message':'There is no User for the id: ' + id + '.'}}});
					return;
			    }
			    var creatures = [];
			    for (var i = 0; i < rows.length; i++) {
			    	creatures.push(rows[i].id);
			    };
			    data["creatures"] = creatures;
			    callback({status:200, response:{'user':data}});
			});
		});
};
exports.updateUser = function(id, user, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'UPDATE USER SET ? WHERE id = ' + id;
			connection.query(sql , user, function(err, rows) {
				connection.release();
				if(err){
					console.log(err.stack);
					callback({status:500, response:{'error':{'type':'minor', 'message':'Error connecting while load Users'}}});
					return;
				}
			    callback({status:200, response:null});
			});
		});
};

exports.deleteUser  = function(id, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'DELETE FROM USER WHERE id = ' + id + '' ;
			connection.query(sql , function(err, rows) {
				connection.release();
				if(err){
					callback({status:500, response:{'error':{'type':'minor', 'message':'Could not delete Users.'}}});
					return;
				}
			    callback({status:204, response:null});
			});
		});
};



exports.getUsers  = function(callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'SELECT * FROM USER' ;
			var users = [];
			connection.query(sql , function(err, rows) {
				if(err){
					connection.release();
					callback({status:500, response:{'error':{'type':'minor', 'message':'Error connecting while load Users'}}});
					return;
				}
			    users = rows;
			});
			
				sql = 'SELECT id, user FROM CREATURE';

				connection.query(sql , function(err, rows) {
					for (var i = 0; i < users.length; i++) {
					    if(!rows && !rows.length){
					    	callback({status:404, response:{'error':{'type':'minor', 'message':'There is no User for the id: ' + id + '.'}}});
							return;
					    }
					    var creatures = [];
					
					    users[i]["links"] = {"creatures": "/users/" + users[i].id + "/creatures"};
					}
					callback({status:200, response:{"users":users}})
				});			
		});
};

exports.deleteUsers  = function(callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'DELETE FROM USER' ;
		
			connection.query(sql , function(err, rows) {
				connection.release();
				if(err){
					callback({status:500, response:{'error':{'type':'minor', 'message':'Could not delete Users.'}}});
					return;
				}
			    callback({status:204, response:null});
			});
		});
};

exports.insertUser  = function(user, callback){
		mySqlConnector.getConnection(function(err,connection){
		if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			connection.query('INSERT INTO USER SET ?', user, 
				function(err, result) {
					connection.release();
					if(err){
						callback({status:500, response:{'error':{'type':'minor', 'message':'Could not delete Users.'}}});
						return;
					}
				    callback({status:200, response:null});
					return;
			});
	});
};



exports.getCreaturesForUser = function(id, callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}

			sql = 'SELECT * FROM CREATURE where user = ' + id;
			connection.query(sql , function(err, rows) {
			    connection.release();
			    if(!rows && !rows.length){
			    	callback({status:404, response:{'error':{'type':'minor', 'message':'There is no User for the id: ' + id + '.'}}});
					return;
			    }
			    callback({status:200, response:{'creatures':rows}});
			});
		});
};
exports.getUsersId  = function(callback){
		mySqlConnector.getConnection(function(err, connection) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			var sql = 'SELECT * FROM USER' ;
			var users = [];
			connection.query(sql , function(err, rows) {
				if(err){
					connection.release();
					callback({status:500, response:{'error':{'type':'minor', 'message':'Error connecting while load Users'}}});
					return;
				}
			    users = rows;
			});
			
				sql = 'SELECT id, user FROM CREATURE';

				connection.query(sql , function(err, rows) {
					for (var i = 0; i < users.length; i++) {
					    if(!rows && !rows.length){
					    	callback({status:404, response:{'error':{'type':'minor', 'message':'There is no User for the id: ' + id + '.'}}});
							return;
					    }
					    var creatures = [];
					    for (var j = 0; j < rows.length; j++) {
					    	if(rows[j].user == users[i].id){
					    		creatures.push(rows[j].id);
					    	}
					    }
					    users[i]["creatures"] = creatures;
					}
					callback({status:200, response:{"users":users}})
				});			
		});
};