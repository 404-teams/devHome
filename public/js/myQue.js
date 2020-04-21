var myQue = document.getElementById('myQue');
myQue.addEventListener('submit', function(event){
    event.preventDefault();
    let token =  localStorage.getItem('token');
    console.log(token)
    if(token === null){
      alert("log in before")
      return;
    }
    $.ajax({
      type:'GET',
      headers:{
        'authorization' : `bearer ${token}`
      },
      url:"/myQue",
        success:function(data){
        document.write(data);
      },
      error:function(error){
        alert(error.responseText);
      }  
    });
   });