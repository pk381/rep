let input = document.getElementsByClassName("input");

function addItem(item) {

  let items = document.getElementById("remaining");
  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item m-1";
  // Add text node with input value
  li.appendChild(
    document.createTextNode(
      `Name: ${item.Name} Description: ${item.Description}`
    )
  );

  // Create del buttons element
  var deleteBtn = document.createElement("button");
  var doneBtn = document.createElement("button");

  // Add classes to button
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  doneBtn.className = "btn btn-dark btn-sm float-right mx-1 done";

  deleteBtn.onclick = async (e)=> {
    await axios.delete(
      `https://crudcrud.com/api/520c709529dd4c77afdf21f789370b90/toDosRemaining/${item._id}`
    );

    items.removeChild(e.target.parentElement);
  };

  doneBtn.onclick = async (e) => {

    await axios.delete(
      `https://crudcrud.com/api/520c709529dd4c77afdf21f789370b90/toDosRemaining/${item._id}`
    );

    let don = {
        Name: item.Name,
        Description: item.Description
    }
    
    await axios.post(`https://crudcrud.com/api/520c709529dd4c77afdf21f789370b90/toDosDone`, don);

    items.removeChild(e.target.parentElement);

    let doneItem = `Name: ${don.Name} Description: ${don.Description}`;

      let dones = document.getElementById("dones");
      // Create new li element
      let li = document.createElement("li");
      // Add class
      li.className = "list-group-item m-1";
      // Add text node with input value
      li.appendChild(document.createTextNode(doneItem));
  
      dones.appendChild(li);

  };

  // Append text node
  deleteBtn.appendChild(document.createTextNode("Delete"));
  doneBtn.appendChild(document.createTextNode("Done"));

  // Append button to li
  li.appendChild(deleteBtn);
  li.appendChild(doneBtn);

  // Append li to list

  items.appendChild(li);
}

async function fetchRemaining() {
  let res = await axios.get(
    "https://crudcrud.com/api/520c709529dd4c77afdf21f789370b90/toDosRemaining"
  );

  for (let i = 0; i < res.data.length; i++) {
    addItem(res.data[i]);
  }
}

fetchRemaining();

// dones

async function fetchDone() {

  let res = await axios.get(
    "https://crudcrud.com/api/520c709529dd4c77afdf21f789370b90/toDosDone"
  );

  for (let i = 0; i < res.data.length; i++) {

    let item = `Name: ${res.data[i].Name} Description: ${
      res.data[i].Description
    }`;
    let items = document.getElementById("dones");
    // Create new li element
    let li = document.createElement("li");
    // Add class
    li.className = "list-group-item m-1";
    // Add text node with input value
    li.appendChild(document.createTextNode(item));

    items.appendChild(li);
  }
}

fetchDone();


// adding new todo

document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();

  let obj = {
    Name: input[0].value,
    Description: input[1].value,
  };

  let data = await axios.post(
    "https://crudcrud.com/api/520c709529dd4c77afdf21f789370b90/toDosRemaining",
    obj
  );

  input[0].value = "";
  input[1].value = "";

  data = data.data;
  addItem(data);
});




