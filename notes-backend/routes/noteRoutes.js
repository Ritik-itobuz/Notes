import express from "express";
import { createNote, getNotes, updateNote, deleteNote,getNoteById } from "../controllers/function.js";

const route = express.Router();

route.get("/", function (req, res) {

  res.send("Welcome to backend");
});

route.post("/create", function (req, res) {
  createNote(req, res)
});
route.get("/get", getNotes);
route.get("/:id", getNoteById);
route.post("/update", updateNote);
route.delete("/delete/:id", deleteNote);

export default route;
