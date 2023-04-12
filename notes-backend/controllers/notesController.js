import notesSchema from "../model/notesSchema.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let createNote = await notesSchema.create({
      title,
      content,
    });

    if (createNote) {
      res.status(200).json({
        status: 200,
        success: true,
        message: "Note created successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await notesSchema.find({});
    if (notes) {
      res.status(200).json({
        status: 200,
        success: true,
        message: "All the Notes fetched successfully!",
        notes,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await notesSchema.findById(id);
    if (note) {
      res.status(200).json({
        success: true,
        message: "Note fetched successfully!",
        data: note,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Note Not found!",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const note = await notesSchema.findById(id);

    if (note) {
      note.title = title || note.title;
      note.content = content || note.content;

      await note.save();
      res.status(200).json({
        success: true,
        message: "Note Updated successfully!",
        data: note,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Note Not found!",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await notesSchema.findByIdAndDelete(req.params.id);
    if (note) {
      res.status(200).json({ id: req.params.id });
    }
  } 
  catch (error) {
    next(error);
  }
};
