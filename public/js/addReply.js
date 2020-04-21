var addRep = document.getElementById('reply');
addRep.addEventListener('submit', function (event) {
  var id = event.target.repId.value;
  event.preventDefault();
  let token = localStorage.getItem('token');
  if (token === null) {
    alert('log in before');
    return;
  }
  $.ajax({
    type: 'POST',
    data: $(`#reply`).serialize(),
    headers: {
      authorization: `bearer ${token}`,
    },
    url: `/addRep${id}`,
    success: function (data) {
      location.reload();
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
});
