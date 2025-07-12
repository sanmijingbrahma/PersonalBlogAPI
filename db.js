require('dotenv').config();
const {Pool} = require('pg')

const isProduction = process.env.NODE_ENV

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	ssl:isProduction?{rejectUnauthorized:false}:false
})

if(!isProduction){
(async ()=>{
	try{
		const client = pool.connect();
		console.log("Database Connected")
		client.release();
	}catch(err){
		console.error("Error Connecting to database.",err.stack)
	}
})()}


module.exports = pool
