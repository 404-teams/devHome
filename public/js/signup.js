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
            window.location.assign("/");
        }
    })  

    // console.log(event);
    // console.log( event.target.email.value);
})

$("#searchs").submit(function(event){
    event.preventDefault();
    let search_query = event.target.search.value;
    $.get("/cdns/search",{search_query},function(results){
         console.log(results);
    })

    console.log(event);
    console.log( event.target.search.value);
})