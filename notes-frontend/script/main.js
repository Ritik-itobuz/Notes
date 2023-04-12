const addNote = document.querySelector(".noteHeading");
let titlex = document.getElementById("title").value;
let description = document.getElementById("dec").value;
let deleteNote = document.getElementById("deleteNote");
const api = "http://localhost:8008/notes";

function getAllNotes() {
  change();
  axios
    .get(`${api}/get`)

    .then((res) => {
      document.getElementById("display").innerHTML = "";
      for (let i = 0; i < res.data.notes.length; i++) {
        const apiId = res.data.notes[i]._id;

        document.getElementById(
          "display"
        ).innerHTML += `<div class=" cardSection col-3 text-center  " id="cardSec">
            <div class="display_title">${res.data.notes[i].title}</div>
            <div class="text-start d-flex flex-column ">${res.data.notes[i].content}</div>
            <div class="detailSection">

            <button class="btn btn-light  my-3 p-2 editNote"  id="editNote" data-id=${apiId}  onclick="getNote('${apiId}')">Edit</button>
            <button class="btn btn-light my-3 p-2 deleteNote" id="deleteNote" data-id=${apiId} onclick="deleteNoteConfirm('${apiId}')">Delete</button>
            </div>
        </div>`;
        document.getElementById("title").value = "";
        document.getElementById("dec").value = "";
      }
    })
    .catch((err) => console.log(err)); // Logs error
}

getAllNotes();

function add() {
  document.getElementById("doneDiv").innerHTML = `ADDED &#x2705`;
  document.getElementById("doneDiv").style.visibility = "visible";
  axios
    .post(`${api}/create`, {
      title: document.getElementById("title").value,
      content: document.getElementById("dec").value,
    })

    .then((json) => {
      document.getElementById(
        "display"
      ).innerHTML += `<div class=" cardSection col-3 text-center">
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
      setTimeout(getAllNotes, 1000);
    })
    .catch((err) => console.log(err));
}

function deleteNotes(id) {
  document.getElementById("doneDiv").innerHTML = `DELETED &#10060`;
  document.getElementById("doneDiv").style.visibility = "visible";
  console.log(id);
  axios
    .delete(`${api}/delete/${id}`)
    .then((res) => {
      setTimeout(getAllNotes, 1000);
    })
    .catch((err) => console.log(err));
}

function deleteNoteConfirm(i) {
  console.log(i);
  document.querySelectorAll(".deleteNote").forEach((item) => {
    console.log(item.dataset.id);
    if (item.dataset.id === i) {
      item.innerHTML = "Confirm ";
      item.setAttribute("onclick", `deleteNotes('${i}')`);
    }
  });
  document.querySelectorAll(".editNote").forEach((item) => {
    console.log(item.dataset.id);
    if (item.dataset.id === i) {
      item.innerHTML = "Leave";

      item.setAttribute("onclick", `getAllNotes()`);
    }
  });
}

function getNote(id) {
  axios
    .get(`${api}/${id}`)
    .then((json) => {
      document.getElementById("title").value = json.data.data.title;
      document.getElementById("dec").value = json.data.data.content;
      document.getElementById("title").style.scale = 1.15;
      document.getElementById("dec").style.scale = 1.15;
      document.getElementById("addButton").style.scale = 1.15;
      document.getElementById("addButton").style.backgroundColor = `grey`;
      document.getElementById("title").style.backgroundColor = `grey`;
      document.getElementById("dec").style.backgroundColor = `grey`;
      document.getElementById("addButton").innerHTML = `UPDATE`;
      document.getElementById(
        "appName"
      ).textContent = `You are editing the note!!!`;
      document.getElementById("appName").style.color = `rgb(235, 76, 76)`;

      document
        .getElementById("addButton")
        .setAttribute("onclick", `modifyNote('${id}')`);
    }) // Logs result object
    .catch((err) => console.log(err)); // Logs error
}
function modifyNote(id) {
  document.getElementById("doneDiv").innerHTML = `UPDATED &#x2705`;
  document.getElementById("doneDiv").style.visibility = "visible";

  axios
    .put(`${api}/update/${id}`, {
      title: document.getElementById("title").value,
      content: document.getElementById("dec").value,
    })
    .then((res) => {
      setTimeout(getAllNotes, 1000);
    })
    .catch((err) => console.log(err));
}

function change() {
  document.getElementById("appName").style.color = `#ffff`;
  document.getElementById("appName").textContent = `Notes App`;
  document.getElementById("addButton").innerHTML = `ADD`;
  document.getElementById("title").style.scale = 1;
  document.getElementById("dec").style.scale = 1;
  document.getElementById("title").style.backgroundColor = `white`;
  document.getElementById("dec").style.backgroundColor = `white`;
  document.getElementById("addButton").style.scale = 1;
  document.getElementById("addButton").style.backgroundColor = `white`;
  document.getElementById("doneDiv").style.visibility = "hidden";
  document.getElementById("addButton").setAttribute("onclick", `add()`);
}
