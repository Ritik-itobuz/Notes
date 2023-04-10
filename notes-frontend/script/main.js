const addNote = document.querySelector(".todo-heading");
let titlex = document.getElementById("title").value;
let description = document.getElementById("dec").value;
let deleteNote = document.getElementById("deleteNote");
const api = "http://localhost:8008/notes";

function getAllNotes() {
  document.getElementById("appName").style.color = `#ffff`;
  document.getElementById("appName").textContent = `Notes App`;
  document.getElementById("addButton").innerHTML = `ADD`;

  document.getElementById("doneDiv").style.visibility = "hidden";
  document.getElementById("addButton").setAttribute("onclick", `add()`);
  axios
    .get("http://localhost:8008/notes/get")
    //.then(res => console.log(res.data.notes[0]._id)) // Logs result object
    .then((res) => {
      document.getElementById("display").innerHTML = "";
      for (let i = 0; i < res.data.notes.length; i++) {
        const apiId = res.data.notes[i]._id;

        document.getElementById(
          "display"
        ).innerHTML += `<div class=" cardSection col-3 text-center  ">
            <div class="display_title">${res.data.notes[i].title}</div>
            <div class="text-start d-flex flex-column ">${res.data.notes[i].content}</div>
            <div class="detailSection">
            <button class="btn btn-light  my-3 p-2" id="editNote" onclick="getNote('${apiId}')">Edit</button>
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
    .post("http://localhost:8008/notes/create", {
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
    .delete(`http://localhost:8008/notes/delete/${id}`)
    .then((res) => {
      setTimeout(getAllNotes, 100);
    })
    .catch((err) => console.log(err));
}

function deleteNoteConfirm(i) {
  console.log(i);
  document.querySelectorAll(".deleteNote").forEach((item)=>{
    if(item.dataset.id===i){
      item.innerHTML="Confirm";
      item.setAttribute("onclick", `deleteNotes('${i}')`);
    }
  })
  // document
  //   .getElementById("deleteNote")
  //   .setAttribute("onclick", `deleteNotes('${i}')`);
  setTimeout(getAllNotes, 1000);
}

function getNote(id) {
  axios
    .get(`http://localhost:8008/notes/${id}`)
    .then((json) => {
      document.getElementById("title").value = json.data.data.title;
      document.getElementById("dec").value = json.data.data.content;

      document.getElementById("addButton").innerHTML = `UPDATE`;
      document.getElementById(
        "appName"
      ).textContent = `You are editing the note!!!`;
      document.getElementById("appName").style.color = `rgb(235, 76, 76)`;

      document
        .getElementById("addButton")
        .setAttribute("onclick", `modifyNote('${id}',titlex,description)`);
    }) // Logs result object
    .catch((err) => console.log(err)); // Logs error
}
function modifyNote(id, titlex, description) {
  document.getElementById("doneDiv").innerHTML = `UPDATED &#x2705`;
  document.getElementById("doneDiv").style.visibility = "visible";

  axios
    .put(`http://localhost:8008/notes/update/${id}`, {
      title: document.getElementById("title").value,
      content: document.getElementById("dec").value,
    })
    .then((res) => {
      setTimeout(getAllNotes, 100);
    })
    .catch((err) => console.log(err));
}

