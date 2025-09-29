const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.get("/api/notes/", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  console.log(id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const randomId = Math.round(Math.random() * 1000);
  return String(randomId);
};

app.post("/api/notes/", (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({
      error: "content is missing",
    });
  }

  const note = {
    id: generateId(),
    content: req.body.content,
    important: req.body.important || false,
  };

  console.log(note);
  notes = notes.concat(note);
  res.json(note);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "localhost", (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port ${PORT}!`);
});
