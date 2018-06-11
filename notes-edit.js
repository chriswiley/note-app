const noteId = location.hash.substring(1)
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
let notes = getSavedNotes()
let note = notes.find(function (note) {
  return note.id === noteId
})

if (note === undefined) {
  location.assign('./index.html')
}
noteTitle.value = note.title
noteBody.value = note.body

noteTitle.addEventListener('input', function (e) {
  note.title = e.target.value
  saveNotes(notes)
})

noteBody.addEventListener('input', function (e) {
  note.body = e.target.value
  saveNotes(notes)
})

removeButton.addEventListener('click', function () {
  removeNote(note.id)
  noteTitle.value = ''
  noteBody.value = ''
  saveNotes(notes)
  location.assign('./index.html')
})

window.addEventListener('storage', function (e) {

  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    note = notes.find(function (note) {
      return note.id === noteId
    })

    if (note === undefined) {
      location.assign('./index.html')
    }
    noteTitle.value = note.title
    noteBody.value = note.body
  }
})
