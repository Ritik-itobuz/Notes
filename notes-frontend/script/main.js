const addNote = document.querySelector(".todo-heading")
let titlex = document.getElementById('title').value;
let description = document.getElementById('dec').value;
let deleteNote = document.getElementById('deleteNote');
const api = "http://localhost:8008/notes";
const getAllNotes = () => {
    // const res = await fetch("http://localhost:8008/notes/get");
    // const data = await res.json();
    // console.log(res);
    // return data;
 fetch('http://localhost:8008/notes/get')
  .then((response) => response.json())
  .then((json) => {
    console.log(json.notes[2]._id)
    for(let i = 0; i<json.notes.length; i++){
        document.getElementById('display').innerHTML += 
        `<div class=" cardSection col-3 text-center  ">
            <div class="display_title">${json.notes[i].title}</div>
            <div class="text-start d-flex flex-column ">${json.notes[i].content}</div>
            <button class="btn btn-light my-3 p-2" id="deleteNote" onclick="deleteNotes(${json.notes[i]._id})">Delete</button>
        </div>`
        document.getElementById('title').value="";
        document.getElementById('dec').value="";
    }
  });
};
getAllNotes();

function add() {
    fetch('http://localhost:8008/notes/create', {
  method: 'POST',
  body: JSON.stringify({
    
    title: document.getElementById('title').value,
    content:document.getElementById('dec').value,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
.then((response) => response.json())
.then((json) => {

      document.getElementById('display').innerHTML += 
      `<div class=" cardSection col-3 text-center  ">
          <div class="display_title">${document.getElementById('title').value}</div>
          <div class="text-start d-flex flex-column ">${document.getElementById('dec').value}</div>
          <button class="btn btn-light my-3 p-2" >Delete</button>
      </div>`
      document.getElementById('title').value="";
      document.getElementById('dec').value="";
  
});

}

function deleteNotes(apiId)
{

    fetch('http://localhost:8008/notes/delete/${apiId}', {
  method: 'DELETE',
  body: JSON.stringify({
    params : {
        id:apiId
    }
    
  }),
  headers:{
    "content-type":"application/json"
  },
});
}