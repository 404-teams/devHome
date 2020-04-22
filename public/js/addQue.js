
var addQue = document.getElementById('addQue');
addQue.addEventListener('submit', function(event){
    event.preventDefault();
    let token =  localStorage.getItem('token');
    if(token === null){
      alert("log in before")
      return;
    }
    $.ajax({
      type:'POST',
      data:$('#addQue').serialize(),
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