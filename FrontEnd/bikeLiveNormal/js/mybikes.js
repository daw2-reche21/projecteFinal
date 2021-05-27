function getComponents(idBike){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1020/bike/'+idBike,
        crossDomain: true      
    }).done(function(data){
        var divComponents = '';
        divComponents = `<div class="card-group" id="catalogoComponentes">`; 
        for(var component of data){
            var porcentageKms = (component.currentKms/component.liveKms)*100;
          divComponents+=`
           <div class="card cartaComponente pt-1" data-id="${component.id}" data-name="${component.name}" data-brand ="${component.brand}" data-model ="${component.model}" data-liveKms ="${component.liveKms}" data-bikeType=" ${component.bikeType}">
             <img class="card-img-top rounded imgComponent" src="../imgs/componentes/${component.image}" alt="Componente ${component.name}">
             <div class="card-body">
               <h5 class="card-title" >Name: ${component.name}</h5>
               <p class="card-text" >Model: ${component.brand}  ${component.model} </p>
               <p class="card-text"  >Bike live:</p><div class="progress">
               <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${porcentageKms}" aria-valuemin="0" aria-valuemax="100" style="width:${porcentageKms}%">${component.currentKms} kms / ${component.liveKms} kms</div>
             </div>
               <div class="divbtnComponent">
               <button type="button" title="update component"  class="btn btn-primary btn-sm btnUpdateComponent"><i class="fas fa-plus-home"></i></button>
               </div> 
             </div>
        </div>`; 
        }
        divComponents+=`</div>`;
        $('#myBikesMain').append(divComponents);
    }).fail(function(err){
        console.log(err);
    })
}

function getBikes(){
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
                
                divBike += `<button class="btn btn-light btnBike" data-id="${bikes.id}"><h3>${bikes.name}</h3><h3>LiveKms: ${bikes.totalKms}</h3><button class="btn btn-sm btndeleteBike" data-id=""${bikes.id}"><i class="fas fa-trash-alt"></i></button></button>`;
               }
               $("#myBikesMain").html(divBike);
               $('.btnBike').click(function(){
                   var idBike=$(this).attr('data-id');
                   getComponents(idBike);
               })
                  

            },
            error: function (e) {
                console.log(e);
            }
        })
    
}

$(document).ready(function() {
     getBikes();
});
