'use strict'

$("#signupform").submit(function(event){
    event.preventDefault();
    let email = event.target.email.value;
    let username= event.target.username.value;
    let password= event.target.password.value;
    let img = event.target.img.value;
    let status= event.target.status.value;
    $.post("/signup",{email , username ,password ,img ,status},function(result){
        // console.log(result);
        if (result ==='this user is here'){
            alert("هذا المستخدم مُسَجَل")
        }
        else{
            window.location.assign("http://localhost:3000/");
        }
    })

    // console.log(event);
    // console.log( event.target.email.value);
})