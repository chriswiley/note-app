const noteId = location.hash.substring(1)
const notes = getSavedNotes()
const note = notes.find(function (note) {
  return note.id === noteId
})
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')

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
  console.log('something was changed')
})
