let input = document.getElementsByClassName("input");

axios
  .get("https://crudcrud.com/api/1a6fb38b75c84e1d9a5c9269e02428e9/expenseData")
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      let items = document.getElementById("items");
      let li = document.createElement("li");
      let item = `${res.data[i].Expense} ${res.data[i].Description} ${res.data[i].Description}`;
      li.appendChild(document.createTextNode(item));

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

  let items = document.getElementById("items");
  let li = document.createElement("li");
  let item = `${input[0].value} ${input[1].value} ${input[2].value}`;
  li.appendChild(document.createTextNode(item));
  items.appendChild(li);

  axios
    .post(
      "https://crudcrud.com/api/1a6fb38b75c84e1d9a5c9269e02428e9/expenseData",
      obj
    )
    .then((res) => console.log(res))
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
