$(document).ready(function(){
    getdata();

    $('.addbtn').click(function(){
        var name = $("#name").val();
        var email = $("#email").val();
        var mobile = $("#mobile").val();
        var city = $("#city").val();
      $.ajax({
          url:'/student/addstudent',
          method:'post',
          dataType:'json',
          data:{'name':name,'email':email,'mobile':mobile,'city':city},
          success:function(response){
            if(response.msg=='success'){

                   alert('student added successfully');
                  getdata();
                  $('#name').val('')
                  $('#email').val('')
                  $('#mobile').val('')
                  $('#city').val('')
                   }else{
                       alert('some error occurred try again');
                   }
              
          },
          error:function(response){
              alert('server error occured')
          }
      });
   });


$(document).on('click','button.del',function(){
    var id = $(this).parent().find('button.del').val();
     alert(id)
    $.ajax({
        url:'/student/removeStudent',
        method:'delete',
        dataType:'json',
        data:{'id':id},
        success:function(response){
            if(response.msg=='success'){
                alert('data deleted');
            getdata();
            }else{
                alert('data not get deleted');
            }
        },
        error:function(response){
                 alert('server error')   
        }
    });
});
function getdata(){
    $.ajax({
        url:'/student/',
        method:'get',
        dataType:'json',
        success:function(response){
            $('tr.taskrow').remove()
             console.log(response);
             $.each(response.data,function(index,data){
                $('tbody').append("<tr class='taskrow'><td>"+data.name+"</td><td>"+data.email + "</td><td>" + data.mobile+ "</td><td>"+ data.city+ "</td><td>"+"<button class='del' value='"+data._id+"'>delete</button>"+"</td></tr>"); 
            });
        },
        error:function(response){
            alert('server error');
        }
    });
}
});

