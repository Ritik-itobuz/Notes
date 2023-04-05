import notesSchema from "../model/notesSchema.js";

export const createNote = async (req, res) => {
  try {
    console.log(req.body);
    const { title, content } = req.body;
    console.log(title);
    let createNote = await notesSchema.create({
      title,
      content,
    });

    if (createNote) {
      res.status(200).json({
        success: true,
        message: "Notes created successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await notesSchema.find({});
    if (notes) {
      res.status(200).json({
        success: true,
        message: "Notes fetched successfully!",
        notes,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params
    const note = await notesSchema.findById(id)

    if (note) {
      res.status(200).json({
        success: true,
        message: "Note fetched successfully!",
        note,
      });
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

export const updateNote = async (req, res) => {
  try {
    const { id, title, content } = req.body;
    const note = await notesSchema.findById(id);

    if (note) {
      note.title = title || note.title;
      note.content = content || note.content;

      await note.save();
      res.status(200).json({
        success: true,
        message: "Note Updated successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const note = await notesSchema.findByIdAndDelete(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Todo not found');
  }

  

  res.status(200).json({ id: req.params.id });
}



  
  



// export const deleteNote = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const deleted = await notesSchema.findByIdAndDelete(id)
//     if (deleted) {
//       res.status(200).json({
//         success: true,
//         message: "Note Deleted successfully!",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: error.message });
//   }
// };
