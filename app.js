const express = require("express")
const app = express();
const pool = require('./db')
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json())


// Routes

app.get("/articles", async (req,res)=>{
	try{
		const articles = await pool.query("select * from articles");
		res.json(articles.rows);
	}catch(err){
		console.error("Error :",err.stack);
		res.statusCode(500).send("Server Error");
	}

})


app.get("/articles/:id",async (req,res)=>{
	const id = parseInt(req.params.id,10)
	try{
		const articles = await pool.query("select * from articles where id = $1",[id]);
		res.json(articles.rows);
	}catch(err){
		console.error("Error :",err.stack);
		res.statusCode(404).json("message : File Not Found");
	}
	
})

app.post("/articles",(req,res)=>{
	let name = prompt("What is your name");
})

app.delete("/articles/:id",(req,res)=>{
	res.send("article of this id is deleted")
})

app.put("/articles/:id",(req,res)=>{
	res.send("article of this id is updated.")
})


app.listen(PORT,()=>{
	console.log(`listening at http://localhost:${PORT}`);
})

