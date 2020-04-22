$('#login').hide();
$('#signup').hide();
$('#logout').hide();
let { token, id, img } = localStorage;
if (token && id && img) {
  $('#userimg').attr('src', img);
  $('#logout').show();
} else {
  $('#login').show();
  $('#signup').show();
  $('#userimg').hide()
}

function logout() {
  localStorage.clear();
  $('#login').show();
  $('#signup').show();
  $('#logout').hide();
  $('#userimg').hide()
}
