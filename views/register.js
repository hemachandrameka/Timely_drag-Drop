function nameToUpper(){
    var name = document.getElementById('name').value
    name = name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()
    document.getElementById('name').value = name
}

function checkPassword(){
    var pwd = document.getElementById('password').value;
    const register = document.getElementById('register')
    if(!register.classList.contains("active")) register.classList.add("active");
    if(pwd.length<15){
        if(pwd.length<8){
            document.getElementById('pout').innerText="Min Length Of Password is 8";
            document.getElementById('ppout').style.display = "block";
            document.getElementById('ppout').style.backgroundColor="red"
        }else{
            document.getElementById('pout').innerText="";
            document.getElementById('ppout').style.backgroundColor="orange";
            if(register.classList.contains("active")) register.classList.remove("active");
            
        }
    }else{
        document.getElementById('ppout').style.backgroundColor="green"
        if(register.classList.contains("active")) register.classList.remove("active");
            
    }
}

function showPassowrd(){
    var pwd = document.getElementById('password');
    if(pwd.type == 'password'){
        pwd.type = "text"
    }else{
        pwd.type = "password"
    }
}

function submitCalled(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target)) ;
    console.log(data);
    const registerDiv=document.querySelector("#register-message")
    if(data.password.length>=8)
    fetch("/register",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)//JSON.stringify({})
    })
  .then((res)=>res.json())
  .then((data)=>{
      registerDiv.innerHTML=`<p class=${data.valid?"valid":"invalid"}>${data.message}</p>`
    if(data.valid){
        setTimeout(()=>{
            window.location.href="/login"
        },1000)
    }
  })
    .catch(function(res){ console.log(res) })
}





