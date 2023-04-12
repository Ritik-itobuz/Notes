import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import routes from "./routes/notesRoutes.js";
import config from "./config.js";
const app = express();

const PORT = 8008;


app.use(express.json())


app.use(cors())
app.options('*', cors())


app.use("/notes", routes);
app.use((request, response, next) => {
  next(new Error("Page not found"));
});

app.use((error, request, response, next) => {
  if (error) {
    response.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});

const url =
   config.MONGO_URL;

async function dbConnect() {
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

dbConnect();
