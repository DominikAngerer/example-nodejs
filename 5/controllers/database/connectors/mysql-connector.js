var mysql = require('mysql');
pool  = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'ANIMAL'
});

exports.getConnection = function(callback){
	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		callback(err,connection);
	});
};