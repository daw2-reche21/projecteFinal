function createNotification(idBike){
    const idUser = sessionStorage.getItem('userId');
        $.ajax({
            type: 'POST',
            url: 'http://localhost:1015/livenotifications',
            dataType: 'json',
            data: JSON.stringify({"idUser":idUser,"idBike":idBike}), 
            accepts: "application/json",
            crossDomain: true,
            contentType: 'application/json',
            success: function (result) {
               console.log(result.msg);
            
            },
            error: function (e) {
                console.log(e);
            }
        })
    
}

function showUnseenNotifications(){
    const idUser = sessionStorage.getItem('userId');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1015/unseen/'+idUser,
        crossDomain: true,
        success: function (results) {
           console.log(results);
           var listNotify ='';
           var numNotis = 0;
           for(var notification of results){
               numNotis++;
                listNotify+=` <a class="dropdown-item notificationItem" href="#" data-id="${notification.id}">${notification.message}</a>` 
           }
           $('#notificationsLista').html(listNotify);
           $('#numNotis').text(numNotis);
        },
        error: function (e) {
            console.log(e);
        }
    })
}





function setSeenNotifications(idNotification){
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:1015/'+idNotification,
        dataType: 'json',
     data: JSON.stringify({"seen":1}), 
     accepts: "application/json",
     crossDomain: true,
     contentType: 'application/json'
     }).done(function(result){   
         console.log(result.msg);
         setTimeout(function(){
             getComponentsBike(sessionStorage.getItem('idBike'));    
         },2000)
 
     }).fail(function(err){
         console.log(err);
     })
}
$(document).ready(function(){
    showUnseenNotifications();
     $('#notificationsMenu').click(function(){
        $('#notificationsLista a').each(function(i){
                var idNotification = $(this).attr('data-id');
                setSeenNotifications(idNotification);
        })
     })
})

