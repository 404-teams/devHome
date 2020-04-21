var newLogin = document.getElementById('login');
newLogin.addEventListener('submit', function(event){
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;
    $.post("/login/create", {email:email, password:password}, function(result){
        
        if (result === 'wrong password') {
            alert('rewrite the password')
        } else if (result === 'this email is not signup please signup') {
            alert('check if the email is correct or to signup')
        }else{
            window.localStorage.token = result;
            window.location.href = '/';
        }

      });
    
  
   });
   function myFunction() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }