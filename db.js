require('dotenv').config();
const {Pool} = require('pg')

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
})


pool.connect((err,client,release)=>{
	if(err){
		console.error('Some error in connecting DB',err.stack);
	}
	console.log("Database is connected!");
	release();
})

module.exports = pool
