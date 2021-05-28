function updateMantenance(){
   const idBike = $('#selectBikeUpdate').val();
   const kmsUpdate = $('#kmsUpdate').val();
   $.ajax({
    type: 'POST',
    url: 'http://localhost:1037',
    dataType: 'json',
    data: JSON.stringify({"idBike": idBike, "kms": kmsUpdate }), 
    accepts: "application/json",
    crossDomain: true,
    contentType: 'application/json'
    }).done(function(result){
        createNotification(idBike);   
        $("#bikesUpdate").html(`<h3>Training uploaded</h3>`);
        $('#saveUpdate').hide();
        getComponentsBike(sessionStorage.getItem('idBikeSelected'));
        setTimeout(function(){
            $("#updateTrainningModal").modal('hide')     
        },2000)

    }).fail(function(err){
        console.log(err);
    })


}

function getBikesUpload(){
    var userId = sessionStorage.getItem('userId');
        $.ajax({
            type: 'GET',
            url: 'http://localhost:1057/'+userId,
            dataType: 'json',
            data: JSON.stringify({"userId":userId}), 
            accepts: "application/json",
            crossDomain: true,
            contentType: 'application/json',
            success: function (result) {
               console.log((result));
               
               var divBike = ``;
               for(var bikes of result){
                
                divBike += `<option value="${bikes.id}">${bikes.name}</option>`;
               }
               $("#selectBikeUpdate").html(divBike);
               $("#saveUpdate").click(updateMantenance);
               
   

            },
            error: function (e) {
                console.log(e);
            }
        })
    
}

$(document).ready(function() {
     $("#updateTrainningModal").on('show.bs.modal',getBikesUpload);
});