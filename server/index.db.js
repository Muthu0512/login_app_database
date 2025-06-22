import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

// const express =require("express")

const server = express();
const PORT = 5000;

const mongo_URI =
  "mongodb+srv://Muthu:Muthu%40123@firstcluster.7z7kzev.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster";

server.use(express.json());
server.use(cors());

const client = new MongoClient(mongo_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("LoginApp").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("unable to connect DB");
  }
  //   finally {
  //     // Ensures that the client will close when you finish/error
  //     await client.close();
  //   }
};

// const users = [ 
//   {
//     email: "muthu@123",
//     password: 123,
//   },
// ];

const findUser = async (email) => {
  return await client.db("LoginApp").collection("user").findOne({ email });
};

const check = (a, b) => a == b;

server.get("/", (req, res) => {
  res.send("welcome user");
});

server.get("/test",(req,res)=>{
res.send("testing page api working ...")
})

server.post("/signup", async (req, res) => {
  try {
    // const email=req.body.email
    // const password=req.body.password

    const { email, password } = req.body;

    const existingUser = await findUser(email);

    if (existingUser) {
      return res.status(400).json({
        message: "user email already exists..!",
      });
    }
    const payload = { email, password };

    // users.push(payload);
    await client.db("LoginApp").collection("user").insertOne(payload);
    return res.status(201).json({
      message: "user created successfully..!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "somthing went wrong",
      error: error.message,
    });
  }
});

server.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;
    const existingUser = await findUser(email);
    if (!existingUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (check(password, existingUser.password)) {
      return res.status(200).json({
        message: "user logged in ",
      });
    }

    return res.status(400).json({
      message: "invalid Credential",
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

server.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mongoId = new ObjectId(id);

    const respn = await client
      .db("LoginApp")
      .collection("user")
      .deleteOne({ _id: mongoId });

    if (respn.deletedCount === 0) {
      return res.status(404).json({
        message: "user id not Found",
      });
    }
    return res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

server.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newPass } = req.body;

    const mongoId = new ObjectId(id);

    const respn = await client
      .db("LoginApp")
      .collection("user")
      .updateOne({ _id: mongoId }, { $set: { password: newPass } });

    if (respn.modifiedCount === 0) {
      res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "data modified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
});
server.listen(PORT, function () {
  console.log("server started at port.....", PORT);
  connectDB().catch(console.dir);
});
