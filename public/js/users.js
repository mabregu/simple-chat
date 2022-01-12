const usersList = document.getElementById("users");

function renderUsers(data) {
    usersList.innerHTML = "";
    
    data.forEach(user => {
        const li = document.createElement("li");
        li.id = user.id;
        
        if (user.id === socket.id) {
            li.className = "me";
            li.innerHTML = "me";
        } else {
            li.innerHTML = user.name;
        }
        
        usersList.appendChild(li);
    });
}