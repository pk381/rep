let input = document.getElementsByClassName("input");

let show = document.getElementById("items");
let fullData = [];

let url = `https://crudcrud.com/api/e8a1cca3b0cb49509af983e85524cd38/Expense`;

async function fetchData(){

    let data = await axios.get(url);

    data = data.data;

    for(let i  = 0;i<data.length;i++){

        fullData[i] = data[i];

        let item = `${i+1} : ${data[i].expense} ${data[i].description} ${data[i].category}`;

        let li = document.createElement("li");
        li.className = "list-group-item m-1";

        li.appendChild(document.createTextNode(item));

        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");

        deleteButton.className = "btn btn-danger btn-sm float-right delete";
        editButton.className = "btn btn-dark btn-sm float-right mx-1 edit";

        deleteButton.appendChild(document.createTextNode("Delete"));
        editButton.appendChild(document.createTextNode("Edit"));

        li.appendChild(deleteButton);
        li.appendChild(editButton);

        show.appendChild(li); 

    }
}

fetchData();


document.getElementById("submit").addEventListener("click", ()=>{

    let obj = {
        expense : input[0].value,
        description : input[1].value,
        category : input[2].value
    }

    console.log(obj);

    async function addItem(){

        await axios.post(url, obj);
        window.location.reload();
    
    }

    addItem();
   
})

document.getElementById("items").addEventListener("click", deleteEdit);

async function deleteEdit(e){

    let text = e.target.parentElement.innerText.toString();
    text = text.split(" ");
    let key = text[0];
    key = parseInt(key) - 1;
    let d = key;
    key = fullData[key]._id;

    if(e.target.classList.contains("delete")){

        await axios.delete(url)
    }

}