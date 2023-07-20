let input = document.getElementsByClassName("input");

let data = [];


// remaining

axios
  .get("https://crudcrud.com/api/a8c1569d8bd24678acced45216b20d21/toDosRemaining")
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {

      data[i] = res.data[i];

      let item = `${i+1} .  Name: ${res.data[i].Name} Description: ${res.data[i].Description}`;
      let items = document.getElementById("remaining");
      // Create new li element
      var li = document.createElement("li");
      // Add class
      li.className = "list-group-item m-1";
      // Add text node with input value
      li.appendChild(document.createTextNode(item));

      // Create del buttons element
      var deleteBtn = document.createElement("button");
      var editBtn = document.createElement("button");

      // Add classes to button
      deleteBtn.className = "btn btn-danger btn-sm float-right delete";
      editBtn.className = "btn btn-dark btn-sm float-right mx-1 done";

      // Append text node
      deleteBtn.appendChild(document.createTextNode("Delete"));
      editBtn.appendChild(document.createTextNode("Done"));

      // Append button to li
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      // Append li to list

      items.appendChild(li);
    }
  })
  .catch((err) => console.log(err));

  // dones

  axios
  .get("https://crudcrud.com/api/a8c1569d8bd24678acced45216b20d21/toDosDone")
  .then((res) => {

    for (let i = 0; i < res.data.length; i++) {

      let item = `${i+1} .  Name: ${res.data[i].Name} Description: ${res.data[i].Description}`;
      let items = document.getElementById("dones");
      // Create new li element
      let li = document.createElement("li");
      // Add class
      li.className = "list-group-item m-1";
      // Add text node with input value
      li.appendChild(document.createTextNode(item));

      items.appendChild(li);
    }
  })
  .catch((err) => console.log(err));

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();

  let obj = {
    Name: input[0].value,
    Description: input[1].value,
  };

  axios
    .post(
      "https://crudcrud.com/api/a8c1569d8bd24678acced45216b20d21/toDosRemaining",
      obj
    )
    .then((res) => {

        window.location.reload();
        console.log(res);
    }
    )
    .catch((err) => console.log(err));
});

let itemBtn = document.getElementById("remaining");

itemBtn.addEventListener("click", removeEdit);

function removeEdit(e) {
  
    let text = e.target.parentElement.innerText.toString();
    text = text.split(" ");
    let key = text[0];
    key = parseInt(key) - 1;
    let d = key;
    key = data[key]._id;

    console.log(key);

  if (e.target.classList.contains("delete")) {

    let url = `https://crudcrud.com/api/a8c1569d8bd24678acced45216b20d21/toDosRemaining/${key}`;

    axios.delete(url)
    .then( res =>{
        console.log(res);
        window.location.reload();
    }
    )
    .catch( err => console.log(err));
    
  }

  if (e.target.classList.contains("done")) {

    // console.log("done");

    let obj = {
        Name: data[d].Name,
        Description: data[d].Description
    }

    axios.post("https://crudcrud.com/api/a8c1569d8bd24678acced45216b20d21/toDosDone", obj)
    .then( res =>{

        console.log(res);
        let url = `https://crudcrud.com/api/a8c1569d8bd24678acced45216b20d21/toDosRemaining/${key}`;

        axios.delete(url)
        .then( res =>{
        console.log(res);
        }).catch( err =>{

            console.log(err);
        })
        window.location.reload();
    }
    )
    .catch( err => console.log(err));
  }

  
}
