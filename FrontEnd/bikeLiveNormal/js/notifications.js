function createNotification(idBike){
    const idUser = sessionStorage.get('userId');
        $.ajax({
            type: 'POST',
            url: 'http://localhost:1015/',
            dataType: 'json',
            data: JSON.stringify({"idUser":userId,"idBike":idBike}), 
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
