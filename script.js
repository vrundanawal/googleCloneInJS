const addBtn = document.querySelector("#add");

//set to the local storage
const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notesData = [];
    console.log(textAreaData)
    textAreaData.forEach((currentNote) => {
        return notesData.push(currentNote.value)
    })
    console.log(notesData)

    localStorage.setItem("gCAppNotes", JSON.stringify(notesData))

}

//function for add note
const addNewNote = (text = '') => {
    const note = document.createElement("div")
    note.classList.add("note")
    const htmlData = `
       <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i> </button>
            <button class="delete"><i class="fas fa-trash-alt"></i> </button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>`;
    //note.insertAdjacentHTML('afterbegin', htmlData)
    note.innerHTML = htmlData;
    //console.log(note)

    //getting the references
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //how to delete note ode here
    deleteButton.addEventListener("click", () => {
        note.remove();
        updateLocalStorageData()
    })

    textArea.value = text;
    mainDiv.innerHTML = text

    //toggle using edit button
    editButton.addEventListener("click", () => {
        mainDiv.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })
    textArea.addEventListener("change", (e) => {
        const usetValue = e.target.value;
        // console.log(usetValue)
        mainDiv.innerHTML = usetValue

        updateLocalStorageData()
    })

    document.body.appendChild(note)
}

//geeting data back from local storage
const notesData = JSON.parse(localStorage.getItem('gCAppNotes'))
if (notesData) { notesData.forEach((notesData) => addNewNote(notesData)) }


addBtn.addEventListener("click", () => addNewNote());