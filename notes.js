document.getElementById("addBtn").addEventListener("click", addNote);
document.getElementById("viewBtn").addEventListener("click", loadNotes);
document.getElementById("deleteSelectedBtn").addEventListener("click", deleteSelectedNotes);
document.getElementById("deleteAllBtn").addEventListener("click", deleteAllNotes);

function addNote() {
    let noteInput = document.getElementById("noteInput");
    let noteText = noteInput.value.trim();

    if (noteText === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    alert("Note added!");
}

function loadNotes() {
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (notes.length === 0) {
        notesContainer.innerHTML = "<p>No notes available</p>";
        return;
    }

    notes.forEach((note, index) => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `
            <input type="checkbox" class="noteCheckbox" data-index="${index}">
            ${note}
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function deleteSelectedNotes() {
    let checkboxes = document.querySelectorAll(".noteCheckbox:checked");
    if (checkboxes.length === 0) {
        alert("No notes selected!");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let newNotes = notes.filter((_, index) => 
        !Array.from(checkboxes).some(cb => parseInt(cb.dataset.index) === index)
    );

    localStorage.setItem("notes", JSON.stringify(newNotes));
    loadNotes();
}

function deleteAllNotes() {
    localStorage.removeItem("notes");
    document.getElementById("notesContainer").innerHTML = "";
    alert("All notes deleted!");
}
