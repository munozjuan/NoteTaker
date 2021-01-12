// Set up requirements
const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");

// Set up reading and writing files
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Set up Express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// HTML Routes
// Home Page Route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// Note Taker Route
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API GET Route
app.get("/api/notes", async function (req, res) {
    const noteData = await getNotes();
    return res.status(200).json(noteData);
});

// API POST Route
app.post("/api/notes", async function (req, res) {
    let newNote = req.body;
    const noteData = await getNotes();

    noteData.push({
        ...newNote,
        id: noteData.length + 1
    });
    await writeNotes(noteData);
    return res.sendStatus(201);
});
