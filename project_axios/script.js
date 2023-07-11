let input = document.getElementsByClassName("input");

axios
  .get("https://crudcrud.com/api/1a6fb38b75c84e1d9a5c9269e02428e9/expenseData")
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      let item = ` ${i+1}.  Expense: ${res.data[i].Expense} Description: ${res.data[i].Description} Category: ${res.data[i].Category}`;
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
      "https://crudcrud.com/api/1a6fb38b75c84e1d9a5c9269e02428e9/expenseData",
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
  let key = text[0] + text[1] + text[2] + text[3] + text[4];

  if (e.target.classList.contains("delete")) {
    localStorage.removeItem(key);
    var li = e.target.parentElement;
    itemBtn.removeChild(li);
  }

  if (e.target.classList.contains("edit")) {
    input[0].value = text[0];
    input[1].value = text[2];
    input[2].value = text[4];

    localStorage.removeItem(key);

    var li = e.target.parentElement;
    itemBtn.removeChild(li);
  }
}
