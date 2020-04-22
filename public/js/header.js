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
}

function logout() {
  localStorage.clear();
  $('#login').show();
  $('#signup').show();
  $('#logout').hide();
  $('#userimg').attr(
    'src',
    'https://d2hqr1s9kfm9jo.cloudfront.net/production/images/sales_agents/19129/data.original.?1583194255'
  );
}
