const express = require("express")
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json())


// Routes

app.get("/articles",(req,res)=>{
	res.send("Here are the Articles");
})


app.get("/articles/:id",(req,res)=>{
	res.send("Here is the articles by this id");
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

