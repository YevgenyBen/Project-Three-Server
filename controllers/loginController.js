var db = require('../util/db/db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

/**
 *
 * Will need toclean up request and response
 */

exports.verifyUser = (req, res) => {
	let loginInfo = req.body;
	//check if anything send
	if (loginInfo.user_name) {
		res.end('nothing sent');
		return;
	}
	try {
		pool.getConnection(function (err, connection) {
			// don't forget to check error
			connection.query('SELECT * FROM users WHERE user_name=?', [loginInfo.user_name], function (
				err,
				qResult
			) {
				if (qResult.length < 1) {
					res.end('no such username');
					return;
				}
				if (qResult[0].password == loginInfo.password) {
					res.send(qResult);
				} else {
					// res.send(qResult);
					res.send('Bad user name or password');
				}
			});
		});
	} catch (err) {
		res.send(err);
	}
};
