const fs = require("fs")
const chalk = require("chalk")

// const getNotes = () => "Your Notes..."

const addNote = (title, body) => {
  const notes = loadNotes()

  // const duplicateNotes = notes.filter((note) => note.title === title)

  // Stops at the first match. Doesn't execute any further.
  // filter cotinues till the end even if the match is found.
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse("New note added."))
  }
  else {
    console.log(chalk.red.inverse("Note title taken."))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()

  if (notes.length !== 0) {
    const notesNew = notes.filter((note) => note.title !== title)

    if (notes.length > notesNew.length) {
      saveNotes(notesNew)
      console.log(chalk.green.inverse(title + " deleted"))
    }
    else {
      console.log(chalk.blue.inverse(title + " doesn't exist"))
    }
  }
  else {
    console.log(chalk.red.inverse("No notes exist."))
  }

}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.bold.inverse("NOTES -"))

  notes.forEach((note) => {
    console.log(note.title)
  });
}

const readNote = (title) => {
  const notes = loadNotes()

  const requiredNote = notes.find((note) => note.title === title)

  if(requiredNote) {
    console.log(chalk.blue.bold.inverse(requiredNote.title))
    console.log(requiredNote.body)
  }
  else {
    console.log(chalk.red.inverse("Note not found."))
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json")
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const data = JSON.stringify(notes)
  fs.writeFileSync("notes.json", data)
}

module.exports = {
  // getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}