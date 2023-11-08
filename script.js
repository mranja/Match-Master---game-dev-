var nameinput = document.getElementById('name')
var nicknameinput = document.getElementById('nickname')

var button = document.getElementById('button')

button.onclick= ()=>{
    if(nameinput.value == '' || nicknameinput.value=='') {
        alert("Please fill out all fields")
    
    }else{
        let name = nameinput.value;
        let nickname = nicknameinput.value;
        localStorage.setItem('name', name);
        localStorage.setItem('nickname', nickname);
        window.location.href="./game.html";
    }
}
