var addAns = document.getElementById('form');
addAns.addEventListener('submit', function (event) {
  var id = event.target.queId.value;
  event.preventDefault();
  let token = localStorage.getItem('token');
  if (token === null) {
    alert('log in before');
    return;
  }
  $.ajax({
    type: 'POST',
    data: $('#form').serialize(),
    headers: {
      authorization: `bearer ${token}`,
    },
    url: `/addAns${id}`,
    success: function (data) {
      location.reload();
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
});
