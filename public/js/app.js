
    // var str = $( ".jobDes" ).text();
    // $(".jobDes" ).html( str );  
    // function show(event){
    //     console.log(event.target.name);
    //     $(`#${event.target.name}`).toggle();
    // }

    function show(indx) {
        $(`#detSec${indx}`).toggle();
        }
        
    $(document).ready(function(){
        for(var i=0;i<10;i++){
            console.log($(`#detSec${i}`));
            $(`#detSec${i}`).hide();
            
        //     $(`#detbtn${i}`).on('click', function(){
        //         console.log($(`#detSec${i}`));
        //         $(`#detSec${i}`).toggle();
    
        //     })
        }
    })
   
   
        for(var i=0;i<10;i++){
            var str = $( `#jobDes${i}` ).text();
            $(`#jobDes${i}` ).html( str );  
        }