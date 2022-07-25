// dependencies
const express = require("express");
const router = express.Router();
// generates a random id
const uuid = require("uuid");
// brings in the DB class object
const DB = require("../db/db");

// route to get notes
router.get("/api/notes", async function (req, res) {
  const notes = await DB.readNotes();
  return res.json(notes);
});

// route to add a new note and add it to the json file
router.post("/api/notes", async function (req, res) {
  const currentNotes = await DB.readNotes();
  let newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  await DB.addNote([...currentNotes, newNote]);

  return res.send(newNote);
});

  // delete notes
router.delete("/api/notes/:id", async function (req, res) {
  // separates the note based on id to get deleted
  const noteToDelete = req.params.id;
  // notes in json file
  const currentNotes = await DB.readNotes();
  // sort through notes file and create a new array minus the note in question
  const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

  // sends the new array back the DB class 
  await DB.deleteNote(newNoteData);
  
  return res.send(newNoteData);
});

module.exports = router;