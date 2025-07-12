const express = require("express")
const app = express();
const pool = require('./db')
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json())


// Routes

app.get("/articles", async (req,res)=>{
	try{
		const articles = await pool.query("select * from articles");
		res.json(articles.rows);
	}catch(err){
		console.error("Error :",err.stack);
		res.status(500).send("Server Error");
	}

})


app.get("/articles/:id",async (req,res)=>{
	const id = parseInt(req.params.id,10)
	try{
		const article = await pool.query("select * from articles where id = $1",[id]);
		if(article.rows.length ===0){
			res.status(404).json({message:"Not Found"})
		}
		res.send(article.rows);
	}catch(err){
		console.error("Error :",err.stack);
		res.status(404).json({"message" : "File Not Found"});
	}
	
})

app.post("/articles",async(req,res)=>{
	const {title,body,tags} = req.body;
	if(!body || !title){
		return res.status(400).json({"message":"Bad Request"});
	}
	try{
		const article = await pool.query('insert into articles(title,body,tags)values($1,$2,$3) returning *',[title,body,tags]);
		res.status(201).send(article.rows);
	}catch(err){
		console.error(err.stack);
		res.status(400).json({"message": "Bad Request!"});
	}
})

app.delete("/articles/:id",async (req,res)=>{
	const id = parseInt(req.params.id,10)
	try{
		const articles = await pool.query("delete from articles where id = $1 returning *",[id]);
		res.json(articles.rows);
	}catch(err){
		console.error("Error :",err.stack);
		res.status(404).json({"message": "File Not Found"});
	}
	
})

app.put("/articles/:id", async(req,res)=>{
	const id = parseInt(req.params.id);
	const {title,body,tags} = req.body;
	if(!body || !title){
		return res.status(400).json({"message":"Bad Request"});
	}

	try{
		const updated = await pool.query('UPDATE articles SET title=$1,body=$2,tags=$3 where id=$4 returning *',[title,body,tags,id]);
		res.json(updated.rows);
	}catch(err){
		console.error("Error:",err.stack);
		res.status(400).json({message:"Bad Request"})
	}

})


app.listen(PORT,()=>{
	console.log(`listening at http://localhost:${PORT}`);
})

