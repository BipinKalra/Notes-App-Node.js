// const addfunc = require("./utils")
// const sum = addfunc(2,4)
// console.log(sum)

// const validator = require("validator")
const chalk = require("chalk")
const notes = require("./notes")
const yargs = require("yargs")

// console.log(getNotes())
// console.log(chalk.green.bold.italic.inverse("Success!!"))
// console.log(process.argv[process.argv.length - 1])

// const command = process.argv[2]

// if (command === "add") {
//   console.log("Adding Note.")
// }
// else {
//   console.log("something else.")
// }

// Customize yargs version

yargs.version("1.1.0")

// add, remove, read, list

// Create add command 
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true, // This makes the title a mandatory argument 
      type: "string" // Enforces the title to have value of this type
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    // console.log("Title: " + argv.title)
    // console.log("Body: " + argv.body)

    notes.addNote(argv.title, argv.body)
  }
})

// Create remove command 
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of the note to be deleted",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    // console.log("Removing a note!")
    notes.removeNote(argv.title)
  }
})

// Create list command 
yargs.command({
  command: "list",
  describe: "List the notes",
  handler() {
    notes.listNotes()
  }
})

// Create read command 
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Title of the note to be found",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
})

// console.log(process.argv)
console.log(yargs.argv)