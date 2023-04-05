import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import routes from "./routes/noteRoutes.js";

const app = express();

const PORT = 8008;

// parse json request body
app.use(express.json())

// enable cors
app.use(cors())
app.options('*', cors())


app.use("/notes", routes);

app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});

const url =
   "mongodb+srv://ritik:sinha@cluster0.oummjkp.mongodb.net/?retryWrites=true&w=majority";

async function connection() {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDb");
    })
    .catch((err) => {
      console.error(err);
    });
}

connection();
