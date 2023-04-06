import express from "express";
import { createNote, getNotes, updateNote, deleteNote,getNoteById } from "../controllers/notesController.js";

const route = express.Router();

route.post("/create",createNote);
route.get("/get", getNotes);
route.get("/:id", getNoteById);
route.put("/update/:id", updateNote);
route.delete("/delete/:id", deleteNote);

export default route;
