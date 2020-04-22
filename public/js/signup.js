'use strict';

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
      //     errorNombre.innerHTML = "<font  color='#0f2352'  > أنت من عائلتنا منذ زمن ! <br> هل تود تسجيل الدخول ؟</font>";
      // return false;
      alert(' أنت من عائلتنا منذ زمن !  هل تود تسجيل الدخول ؟');
    } else {
      window.location.assign('/');
    }
  });

  // console.log(event);
  // console.log( event.target.email.value);
});

