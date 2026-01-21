const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const DB = "./database.json";

function loadDB(){
  return JSON.parse(fs.readFileSync(DB));
}

// Verify Certificate
app.get("/verify/:id",(req,res)=>{
  const db = loadDB();
  const cert = db.find(c=>c.id===req.params.id);
  if(cert) return res.json({success:true,data:cert});
  res.json({success:false});
});

// Add Certificate (Admin)
app.post("/add",(req,res)=>{
  const db = loadDB();
  db.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(db,null,2));
  res.json({success:true});
});

app.listen(5000,()=>console.log("Gov Portal Running :5000"));
