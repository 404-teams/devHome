'use strict';
$('#emailHidden').hide();
$('#signupform').submit(function (event) {
  event.preventDefault();
  let email = event.target.email.value;
  let username = event.target.username.value;
  let password = event.target.password.value;
  let img = event.target.img.value;
  let status = event.target.status.value;
  let errorNombre = document.getElementById('signupform');
  $.post('/signup', { email, username, password, img, status }, function (
    result
  ) {
    // console.log(result);
    if (result === 'this user is here') {
    
      $('#emailHidden').toggle();

    } else {
      window.location.assign('/login');
    }
  });

  // console.log(event);
  // console.log( event.target.email.value);
});

