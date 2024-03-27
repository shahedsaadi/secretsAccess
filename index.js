//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var isCorrect = false;

app.use(bodyParser.urlencoded({ extended: true }));

function checkPassword(req,res,next){
   console.log(req.body);
   
   const password = req.body["password"];
   if(password === "ILoveProgramming"){
    isCorrect = true;
   }else{
    isCorrect = false;
   }
   next();
}

app.use(checkPassword);

app.get("/", (req,res)=>{
   res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res)=>{
    if(isCorrect){
      res.sendFile(__dirname + "/public/secret.html");
    }else{
      res.redirect("/");
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
