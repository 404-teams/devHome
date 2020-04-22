function PlusMinus(ansId ,ansUserId,value) {
  let ansRank = document.getElementById(`rank${ansId}`).textContent;
    event.preventDefault();
    $.ajax({
      type:'PUT',
      data:{ansUserId:ansUserId,ansId:ansId,value:value,ansRank:ansRank},
      url:'/rankAns',
      headers: {},
      dataType: 'json',
      success:function(result){        
        document.getElementById(`rank${ansId}`).innerHTML = String((Number(ansRank)+Number(value)))
      },
      error: function (data){

        if (error === 'token is end'){
          alert(error);
          return;
        }
          alert("Outlet Creation Failed, please try again.");        
      }
    });
}

function approved(cb,q_user_id, ans_id){
  event.preventDefault();
  let token =  localStorage.getItem('token');
  if(token === null){
    alert("log in before")
    cb.checked = !cb.checked; 
    return;
  }
  $.ajax({
    type:'Put',
    data:{q_user_id:q_user_id,is_approved:cb.checked,ans_id:ans_id},
    headers:{
      'authorization' : `bearer ${token}`
    },
    url:"/ans_approved",
    success:function(data){
      location.reload();
    },
    error:function(error){
        cb.checked = !cb.checked; 
        alert(error.responseText);
    }  
  });
}