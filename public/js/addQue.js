
var addQue = document.getElementById('addQueForm');
addQue.addEventListener('submit', function(event){
    event.preventDefault();
    let token =  localStorage.getItem('token');
    if(token === null){
      alert("log in before")
      return;
    }
    $.ajax({
      type:'POST',
      data:$('#addQueForm').serialize(),
      headers:{
        'authorization' : `bearer ${token}`
      },
      url:"/addNewQ",
      success:function(data){
        location.reload();
      },
      error:function(error){
        alert(error.responseText);
      }  
    });
   });