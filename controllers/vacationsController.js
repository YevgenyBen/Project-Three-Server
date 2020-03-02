var db = require('../util/db/db');
var pool = db.getPool(); // re-uses existing if already created or creates new one