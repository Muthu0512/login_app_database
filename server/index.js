import express from "express";
import cors from "cors"

// const express =require("express")

const server = express();
const PORT = 5000;

server.use(express.json());
server.use(cors())

const users = [
  {
    email: "muthu@123",
    password: 123,
  },
];

const findUser = (email) => {
  return users.find((user) => {
    return user.email == email;
  });
};

const check=(a,b)=> a==b

server.get("/", (req, res) => {
  res.send("welcome user");
});

server.post("/signup", (req, res) => {
 try {
     // const email=req.body.email
  // const password=req.body.password

  const { email, password } = req.body;
 
  const existingUser = findUser(email);

  if (existingUser) {
    return res.status(400).json({
        message:"user email already exists..!"
  });
  } 
   const payload = {email,password}

    users.push(payload);
    return res.status(201).json({
        message:"user created successfully..!",
        users
  });
  
 } catch (error) {
    return res.status(500).json({
        message:"somthing went wrong",
        error:error.message,
    });
 }
});

server.get("/login",(req,res)=>{
    try{
      const {email,password}=req.query
       const existingUser = findUser(email);
       if(!existingUser){
       return res.status(404).json({
          message:"user not found"
        })
       }

       if(check(password,existingUser.password)){
        return res.status(200).json({
          message:"user logged in "
        })
       }

       return res.status(400).json({
        message:"invalid Credential"
       })
     
    }
    catch(error){
        return res.status(500).json({
            message:"something went wrong",
            error:error.message
        })
    }
})
server.listen(PORT, function () {
  console.log("server started at port.....", PORT);
});
