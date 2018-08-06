'use strict'

const noteId = location.hash.substring(1)
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const noteEdited = document.querySelector('#edited')
const removeButton = document.querySelector('#remove-note')
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
  location.assign('./index.html')
}
noteTitle.value = note.title
noteBody.value = note.body
noteEdited.textContent = updatedTime(note.updatedAt)

noteTitle.addEventListener('input', (e) => {
  note.title = e.target.value
  note.updatedAt = currentTime()
  noteEdited.textContent = updatedTime(note.updatedAt)
  saveNotes(notes)
})

noteBody.addEventListener('input', (e) => {
  note.body = e.target.value
  note.updatedAt = currentTime()
  noteEdited.textContent = updatedTime(note.updatedAt)
  saveNotes(notes)
})

removeButton.addEventListener('click', () => {
  removeNote(note.id)
  noteTitle.value = ''
  noteBody.value = ''
  saveNotes(notes)
  location.assign('./index.html')
})

window.addEventListener('storage', (e) => {

  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    note = notes.find((note) => note.id === noteId)

    if (!note) {
      location.assign('./index.html')
    }
    noteTitle.value = note.title
    noteBody.value = note.body
    noteEdited.innerHTML = updatedTime(note.updatedAt)
  }
})
