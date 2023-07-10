// GET REQUEST
function getTodos() {
  // console.log('GET Request');
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then( res => showOutput(res))
  .catch( err => console.log(err));
}

// POST REQUEST
function addTodo() {
  // console.log("POST Request");

  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'New Todo',
      completed: false
    }
  })
  .then( res => showOutput(res))
  .catch( err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log("PUT/PATCH Request");

  axios({
    method: 'patch',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    data: {
      title: 'Updated Todo',
      completed: true
    }
  })
  .then( res => showOutput(res))
  .catch( err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  // console.log("DELETE Request");
  axios({
    method: 'delete',
    url: 'https://jsonplaceholder.typicode.com/todos/1'
  })
  .then( res => showOutput(res))
  .catch( err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  // console.log("Simultaneous Request");
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  .then(axios.spread((todos, posts) => showOutput(posts)))
  .catch( err =>{
    console.log(err);
  })
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log("Custom Headers");

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };

  axios.post('https://jsonplaceholder.typicode.com/todos',
    {
    title: 'New Todo',
    completed: false
    },
    config
  ).then( res => showOutput(res))
  .catch( err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log("Transform Response");

  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',

    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat( data =>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }

  axios(options).then( res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  // console.log("Error Handling");
  
  axios.get('https://jsonplaceholder.typicode.com/todoss')
  .then( res => showOutput(res))
  .catch( err =>{
    
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }

    if(err.response.status == 400){
      alert('Error: Page not found');
    }
    else if(err.request){
      console.log(err.request);
    }
    else{
      console.log(err.message);
    }
    }
  );

}

// CANCEL TOKEN
function cancelToken() {
  // console.log("Cancel Token");

  const source = axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todos',
   {
    cancelToken: source.token
  })
  .then( res => showOutput(res))
  .catch( thrown =>{

    if(axios.isCancel(thrown)){
      console.log('request canceled', thrown.message);
    }
  })

  if(true){
    source.cancel('Request Canceled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use( config =>{

  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
},
 err =>{
  return Promise.reject(err);
 });


// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
