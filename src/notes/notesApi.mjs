import {initialNotes} from './initialNotes.mjs'

function getNotes() {
  return JSON.parse(localStorage.getItem('notes'));
}

function getNoteNamesArr() {
  const notes = getNotes()
  return Object.keys(notes)
}

function setNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function getNote(fileName) {
  const notes = getNotes()
  return notes[fileName]
}

function createNote(fileName, content) {
  const notes = getNotes();
  notes[fileName] = content;
  setNotes(notes);
}

function deleteNote(fileName) {
  const notes = getNotes();
  delete notes[fileName];
  setNotes(notes);
}

function initializeNotes() {
  let notes = getNotes();
  if (!notes) {
    notes = {}
  }
  
  const fileNames = Object.keys(initialNotes);
  fileNames.forEach(fileName => {
    notes[fileName] = initialNotes[fileName]
  })

  setNotes(notes)
}

export {getNotes, getNote, setNotes, createNote, deleteNote, initializeNotes, getNoteNamesArr}

