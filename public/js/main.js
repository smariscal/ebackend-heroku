const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("products", async() => {
  const data = await fetch(`https://backend-smariscal.herokuapp.com/api/products-test`);
  const productos = await data.json();

  fetch(`https://backend-smariscal.herokuapp.com/products.hbs`)
    .then((res) => res.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      const html = template({ prods: productos });
      document.getElementById("products").innerHTML = html;
    });
});

socket.on("update-messages", (getMessages) => {
  document.getElementById("msg").innerHTML = "";
  const denormMsg = denormalizeMsg(getMessages);
  denormMsg
    .forEach((msg) => createMessage(msg));
  renderComp(getMessages, denormMsg)
});

createMessage = (msg) => {
  let newDate = new Date(msg.timestamp).toLocaleString('es-AR');
  document.getElementById("msg").innerHTML += `    
    <div class="card"">
      <div class="container">
        <div class="row">
          <div class="col-2 d-flex align-items-center">
            <img class="card-img" src="${msg.author.avatar}" alt="${msg.author.id}" style="width:72px">
          </div>
          <div class="col-10">
            <div class="card-body">
              <h6 class="card-title">${msg.author.id}</h6>
              <p class="card-text"><small class="text-muted">${newDate}</small>
              <p class="card-text">${msg.text}</p>
            </div>
          </div>
        </div>
    </div>
  `;
};

sendMessage = async() => {
  let session;
  const data = await fetch("/login");
  session = await data.json();

  if (session.user){
    const id = document.getElementById("messageid").value;
    const name = document.getElementById("messagename").value;
    const lastname = document.getElementById("messagelastname").value;
    const age = document.getElementById("messageage").value;
    const username = document.getElementById("messageusername").value;
    const avatar = document.getElementById("messageavatar").value;
    const text = document.getElementById("messagetext").value; 

    socket.emit("post-message", { 
      author:{
        id:id, 
        name:name,
        lastname:lastname,
        age:age,
        username:username,
        avatar:avatar
      },
      text:text });

    document.getElementById("messagetext").value = '';
  }
};

clearFields = () => {
  document.getElementById("messageid").value = '';
  document.getElementById("messagename").value = '';
  document.getElementById("messagelastname").value = '';
  document.getElementById("messageage").value = '';
  document.getElementById("messageusername").value = '';
  document.getElementById("messageavatar").value = '';
  document.getElementById("messagetext").value = '';
}

renderComp = (getMessages, denormMsg) => {
  const comp = document.getElementById("compresion");
  const denormMsgLen = (JSON.stringify(denormMsg)).length;
  const msgLen = (JSON.stringify(getMessages)).length;
  const compresion = ((denormMsgLen - msgLen) / denormMsgLen * 100).toFixed(2);
  comp.innerHTML = (`Compresión: ${compresion}%`);
}

fetch("/login")
  .then(response => response.json())
  .then(data => {
    user = data.user;
    document.getElementById("user").innerHTML = user;
  })
  .catch(error => console.log(error));