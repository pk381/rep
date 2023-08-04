let input = document.getElementsByClassName("input");

let data = [];

axios
  .get("https://crudcrud.com/api/ac9c3fba9a0b41f4a0d2a137da767054/expenseData")
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {

      data[i] = res.data[i];

      let item = `${i+1}.  Expense: ${res.data[i].Expense} Description: ${res.data[i].Description} Category: ${res.data[i].Category}`;
      let items = document.getElementById("items");
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
      editBtn.className = "btn btn-dark btn-sm float-right mx-1 edit";

      // Append text node
      deleteBtn.appendChild(document.createTextNode("Delete"));
      editBtn.appendChild(document.createTextNode("Edit"));

      // Append button to li
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      // Append li to list

      items.appendChild(li);
    }
  })
  .catch((err) => console.log(err));

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();

  let obj = {
    Expense: input[0].value,
    Description: input[1].value,
    Category: input[2].value,
  };

  axios
    .post(
      "https://crudcrud.com/api/ac9c3fba9a0b41f4a0d2a137da767054/expenseData",
      obj
    )
    .then((res) => {

        window.location.reload();
    }
    )
    .catch((err) => console.log(err));
});

let itemBtn = document.getElementById("items");

itemBtn.addEventListener("click", removeEdit);

function removeEdit(e) {
  
    let text = e.target.parentElement.innerText.toString();
    text = text.split(" ");
    let key = text[0];
    key = parseInt(key) - 1;
    let d = key;
    key = data[key]._id;

  if (e.target.classList.contains("delete")) {

    let url = `https://crudcrud.com/api/ac9c3fba9a0b41f4a0d2a137da767054/expenseData/${key}`;

    axios.delete(url)
    .then( res =>{
        console.log(res);
        window.location.reload();
    }
    )
    .catch( err => console.log(err));
    
  }

  if (e.target.classList.contains("edit")) {

    input[0].value = data[d].Expense;
    input[1].value = data[d].Description;
    input[2].value = data[d].Category;

    let url = `https://crudcrud.com/api/ac9c3fba9a0b41f4a0d2a137da767054/expenseData/${key}`;

    axios.delete(url)
    .then( res =>{
        console.log(res);
    }
    )
    .catch( err => console.log(err));

    var li = e.target.parentElement;
    itemBtn.removeChild(li);
  }
}
