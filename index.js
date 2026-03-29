const searchElement = document.querySelector('.search');
const inputNoteElement = document.querySelector('.inputNote');
const addElement = document.querySelector('.add');
const showNotesElement = document.querySelector('.showNotes');
let notesData = JSON.parse(localStorage.getItem('notesData')) || [];
const searchFoundElement = document.querySelector('.searchFound');

showNotes(notesData);

addElement.addEventListener('click', () => {
  validateInputNote();
});
inputNoteElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    validateInputNote();
  }
});

function validateInputNote() {
  const note = inputNoteElement.value;
  if (note === '') {
    alert('Empty note!');
    return;
  }
  const date = getDate();
  notesData.push({
    id: date.id,
    note,
    date: date.date,
  });
  localStorage.setItem('notesData', JSON.stringify(notesData));
  showNotes(notesData);
};

function getDate() {
  const d = new Date();
  const day = d.getDate();
  const numMonth = d.getMonth();
  let month;
  const year = d.getFullYear();
  const id = d.getTime();

  switch (numMonth) {
    case 0:
      month = 'Jan';
      break;
    case 1:
      month = 'Feb';
      break;
    case 2:
      month = 'Mar';
      break;
    case 3:
      month = 'Apr';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'Jun';
      break;
    case 6:
      month = 'Jul';
      break;
    case 7:
      month = 'Aug';
      break;
    case 8:
      month = 'Sep';
      break;
    case 9:
      month = 'Oct';
      break;
    case 10:
      month = 'Nov';
      break;
    case 11:
      month = 'Dec';
      break;
  }
  return { date: `${day} ${month} ${year}`, id };
};

function showNotes(data) {
  showNotesElement.innerHTML = '';
  data.forEach((element, index, array) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    showNotesElement.appendChild(noteElement);

    noteElement.innerHTML = `
        <img src="create-outline.svg" width="20" class="noteEdit"><br>
        <img src="trash-outline.svg" width="20" class="noteDelete">
        <span class="noteID">${array[index].id}</span><br>
        <span class="noteText">${(array[index].note).charAt(0).toUpperCase() + (array[index].note).slice(1).toLowerCase()}</span><br>
        <span class="noteDate">${array[index].date}</span>
      `;
  });
  inputNoteElement.value = '';
  // inputNoteElement.focus();
};

searchElement.addEventListener('input', (e) => {
  let text = e.target.value;
  let filterNotes = notesData.filter((note) =>
    note.note.toLowerCase().includes(text));
  showNotes(filterNotes);
});

showNotesElement.addEventListener('click', (e) => {
  const key = e.target;

  // DELETE
  if (key.classList.contains('noteDelete')) {
    const deleteNoteId = Number(
      key.closest('.note').querySelector('.noteID').innerText
    );

    notesData = notesData.filter(note => note.id !== deleteNoteId);

    localStorage.setItem('notesData', JSON.stringify(notesData));
    showNotes(notesData);
  }

  // EDIT
  if (key.classList.contains('noteEdit')) {
    const editNoteId = Number(
      key.closest('.note').querySelector('.noteID').innerText
    );

    const noteObj = notesData.find(note => note.id === editNoteId);

    let newText = prompt('Enter new note', noteObj.note);

    if (newText === null || newText.trim() === '') return;

    noteObj.note = newText.trim();

    localStorage.setItem('notesData', JSON.stringify(notesData));
    showNotes(notesData);
  }
});

// showNotesElement.addEventListener('click', (e) => {
//   noteDelete(e);
// });

// function noteDelete(e) {
//   let deleteNoteId;
//   const key = e.target;
//   if (key.classList.contains('noteDelete')) {
//     deleteNoteId = Number(key.closest('.note').querySelector('.noteID').innerText);
//     notesData.forEach((element, index, array) => {
//       if (array[index].id === deleteNoteId) {
//         notesData.splice(index, 1);
//         localStorage.setItem('notesData', JSON.stringify(notesData));
//         showNotes(notesData);
//       }
//     })
//   }
// };

// let editNoteId;

// showNotesElement.addEventListener('click', (e) => {
//   if (e.target.classList.contains('noteEdit')) {
//     editNoteId = Number(e.target.closest('.note').querySelector('.noteID').innerText);
//   }
//   if (editNoteId === '') {
//     return;
//   } else {
//     editNoteFun();
//   }

// });

// function editNoteFun() {

//   notesData.forEach((element, index, array) => {
//     if (element.id === editNoteId) {
//       editText = window.prompt('Enter new note');
//       if (editText === '' || editText === null) {
//         console.log('Exit editing notes');
//         return;
//       }
//       array[index].note = editText;
//       localStorage.setItem('notesData', JSON.stringify(notesData));
//       showNotes(notesData);
//     }
//   })
// }