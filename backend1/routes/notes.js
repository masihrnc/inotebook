const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// routes1: GET ALL THE NOTES USING : GET "/api/notes/fetchallnotes" .  login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json([notes]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});
// routes2: ADD THE NOTES USING : POST "/api/notes/addnotes" .  login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there uis errror return bad error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await notes.save();

      res.json([savedNote]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);
//routes3: UPDATES THE EXISTING NOTES USING : POST "/api/notes/updatenotes" .  login required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    try {
  //brought your details from old notes body
  const { title, description, tag } = req.body;
  //create a new notes for update if title,descrip, tag user want to update
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (title) {
    newNote.tag = tag;
  }
  //find the note to be updated and update
  let notes = await Notes.findById(req.params.id);
  if (!notes) {
    return res.status(404).send("not found");
  }
  if (notes.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  notes = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ notes });
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});
// routes4: DELETE THE EXISTING NOTES USING : PUT "/api/notes/deletenotes" .  login required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
    try {
    //brought your details from old notes body
    const { title, description, tag } = req.body;
   
    //find the note to be deleted and delete
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("not found");
    }
    //Allow deletion only if user owns this
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    notes = await Notes.findByIdAndDelete(
      req.params.id,
    );
    res.json({"Success" : "note is deleted" , notes : notes });
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
  });
module.exports = router;
