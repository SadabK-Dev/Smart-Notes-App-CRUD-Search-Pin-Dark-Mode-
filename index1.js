const searchElement = document.querySelector('.search');
const inputNoteElement = document.querySelector('.inputNote');
const addElement = document.querySelector('.add');
const showNotesElement = document.querySelector('.showNotes');
const searchFoundElement = document.querySelector('.searchFound');
let editNoteId;

let notesData = JSON.parse(localStorage.getItem('notesData')) || [];

showNotes(notesData);

addElement.addEventListener('click', () => {
  console.log(addElement.innerText)
  if (addElement.innerText === 'Update') {
    editFun(editNoteId);
  } else {
    validateInputNote();
  }
});
inputNoteElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    validateInputNote();
  }
});

function validateInputNote() {
  const note = inputNoteElement.value.trim();
  if (note === '') {
    alert('Empty note!');
    return;
  }
  const date = getDate();
  notesData.push({
    id: date.id,
    note,
    date: date.date,
    pinned: false
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
  if (data.length === 0) {
    showNotesElement.innerHTML = `<p class="emptyNote">No notes yet...</p>`;
    showNotesElement.classList.add('empty');
    return;
  }
  showNotesElement.classList.remove('empty');
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
        <button class="notePin">${element.pinned ? '📍' : '📌'}</button>
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
    let editID = key.closest('.note').querySelector('.noteID').innerText;
    addElement.innerText = 'Update';
    notesData.forEach((element, index) => {
      if (element.id === Number(editID)) {
        inputNoteElement.value = element.note;
        editNoteId = element.id;
      }
    })
  }

  // PIN
  if (key.classList.contains('notePin')) {
    const pinId = key.closest('.note').querySelector('.noteID').innerText;
    let test = notesData.find(item => item.id === Number(pinId));
    test.pinned = !test.pinned;
    if (test.pinned) {
      notesData.sort((a, b) => b.pinned - a.pinned);
    } else {
      notesData.sort((a, b) => a.id - b.id);
    }

    localStorage.setItem('notesData', JSON.stringify(notesData));
    showNotes(notesData);
  }
});

function editFun(i) {
  notesData.forEach((element, index, array) => {
    if (element.id === i) {
      if (inputNoteElement.value === '') return;
      array[index].note = inputNoteElement.value.trim();
      localStorage.setItem('notesData', JSON.stringify(notesData));
      showNotes(notesData);
    }
  })
  addElement.innerText = 'Add';
}

// DARK MODE
const themeToggle = document.querySelector('.themeToggle');

// Load saved theme on start
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.innerText = 'Light ☀️';
} else {
  themeToggle.innerText = 'Dark 🌙';
}

// Toggle on click
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.innerText = 'Light ☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.innerText = 'Dark 🌙';
  }
});