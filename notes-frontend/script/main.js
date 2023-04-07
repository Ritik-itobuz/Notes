const addNote = document.querySelector(".todo-heading");
let titlex = document.getElementById("title").value;
let description = document.getElementById("dec").value;
let deleteNote = document.getElementById("deleteNote");
const api = "http://localhost:8008/notes";
const getAllNotes = () => {
  document.getElementById("appName").style.color = `#ffff`;
  document.getElementById("appName").textContent = `Notes App`;

  document.getElementById("doneDiv").style.visibility = "hidden";
  fetch("http://localhost:8008/notes/get")
    .then((response) => response.json())
    .then((json) => {
      document.getElementById("display").innerHTML = "";
      for (let i = 0; i < json.notes.length; i++) {
        const apiId = json.notes[i]._id;

        document.getElementById(
          "display"
        ).innerHTML += `<div class=" cardSection col-3 text-center  ">
            <div class="display_title">${json.notes[i].title}</div>
            <div class="text-start d-flex flex-column ">${json.notes[i].content}</div>
            <div class="detailSection">
            <button class="btn btn-light  my-3 p-2" id="editNote" onclick="getNote('${apiId}')">Edit</button>
            <button class="btn btn-light my-3 p-2" id="deleteNote" onclick="deleteNoteConfirm('${apiId}')">Delete</button>

            </div>
        </div>`;
        document.getElementById("title").value = "";
        document.getElementById("dec").value = "";
      }
    });
};
getAllNotes();

function add() {
  document.getElementById("doneDiv").innerHTML = `ADDED &#x2705`;
  document.getElementById("doneDiv").style.visibility = "visible";
  fetch("http://localhost:8008/notes/create", {
    method: "POST",
    body: JSON.stringify({
      title: document.getElementById("title").value,
      content: document.getElementById("dec").value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      document.getElementById(
        "display"
      ).innerHTML += `<div class=" cardSection col-3 text-center  ">
          <div class="display_title">${
            document.getElementById("title").value
          }</div>
          <div class="text-start d-flex flex-column ">${
            document.getElementById("dec").value
          }</div>
          <div class="detailSection">
          <button class="btn btn-light  my-3 p-2" id="editNote">Edit</button>
          <button class="btn btn-light my-3 p-2" id="deleteNote">Delete</button>
          
          </div>
      </div>`;

      document.getElementById("title").value = "";
      document.getElementById("dec").value = "";
      getAllNotes();
    });
}

function deleteNoteConfirm(i) {
  document.getElementById("deleteNote").innerHTML = `CONFIRM &#128465`;
  document
    .getElementById("deleteNote")
    .setAttribute("onclick", `deleteNotes('${i}')`);
  setTimeout(getAllNotes, 1000);
}

function deleteNotes(i) {
  document.getElementById("doneDiv").innerHTML = `DELETED &#10060`;
  document.getElementById("doneDiv").style.visibility = "visible";
  fetch(`http://localhost:8008/notes/delete/${i}`, {
    method: "DELETE",
  })
    // getAllNotes();
    .then((res) => {
      getAllNotes();
    })
    .catch((err) => {
      alert(err.message);
    });
}

function modifyNote(i) {
  fetch(`http://localhost:8008/notes/update/${i}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      content: document.getElementById("dec").value,
    }),
  })
    .then((res) => {
      add();
    })
    .then((res) => {
      deletePrevious(i);
    })
    .catch((err) => {
      alert(err.message);
    });
}

function deletePrevious(i) {
  document.getElementById("addButton").innerHTML = `ADD`;
  document.getElementById("addButton").setAttribute("onclick", `add()`);
  deleteNoteX(i);
}

function deleteNoteX(i) {
  document.getElementById("doneDiv").innerHTML = `UPDATED &#x2705`;
  document.getElementById("doneDiv").style.visibility = "visible";
  fetch(`http://localhost:8008/notes/delete/${i}`, {
    method: "DELETE",
  })
    // getAllNotes();
    .then((res) => {
      getAllNotes();
    })
    .catch((err) => {
      alert(err.message);
    });
}

function getNote(i) {
  fetch(`http://localhost:8008/notes/${i}`)
    .then((response) => response.json())
    .then((json) => {
      const api = i;
      console.log(api);
      document.getElementById("title").value = json.data.title;
      document.getElementById("dec").value = json.data.content;
      document.getElementById("addButton").innerHTML = `EDIT`;
      document.getElementById(
        "appName"
      ).textContent = `You are editing the note!!!`;
      document.getElementById("appName").style.color = `rgb(235, 76, 76)`;
      document
        .getElementById("addButton")
        .setAttribute("onclick", `modifyNote('${api}')`);
    });
}
