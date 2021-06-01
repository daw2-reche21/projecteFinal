function getComponentsBike(idBike){
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
               <p class="card-text"  >Bike live:</p><div class="progress">`;
               
               if(porcentageKms>=80 && porcentageKms<=99){
                var bar = `<div class="progress-bar progress-bar-striped progress-bar-animated text-white bg-warning" role="progressbar" aria-valuenow="${porcentageKms}" aria-valuemin="0" aria-valuemax="100" style="width:${porcentageKms}%">${component.currentKms} kms / ${component.liveKms} kms</div>
                </div>`;
                }else if(porcentageKms>=100){
                    var bar = `<div class="progress-bar progress-bar-striped progress-bar-animated text-white bg-danger" role="progressbar" aria-valuenow="${porcentageKms}" aria-valuemin="0" aria-valuemax="100" style="width:${porcentageKms}%">${component.currentKms} kms / ${component.liveKms} kms</div>
                    </div>`;  
                }else if(porcentageKms<80){
                    var bar = `<div class="progress-bar progress-bar-striped progress-bar-animated text-white bg-success" role="progressbar" aria-valuenow="${porcentageKms}" aria-valuemin="0" aria-valuemax="100" style="width:${porcentageKms}%">${component.currentKms} kms / ${component.liveKms} kms</div>
                    </div>`; 
                } 
               
                divComponents+=bar;
                divComponents+=`
                        <div class="divbtnComponent mt-2 float-right">
                    <button type="button" title="remove component"  class="btn btn-danger btn-sm btnDeleteC"> <i class="fas fa-trash"></i></button>
                    <button type="button" title="Set to 0 kms"   class="btn btn-primary btn-sm btnSetNew"><i class="fas fa-recycle"></i></button>
                    <div class="msgUpdate"></div>
                    </div> 
                    </div>
                    </div>`;
            
        }
        
        divComponents+=`</div>`;
        $('#myBikesMain').html(divComponents);
        $(document).ready(function(){
            $("#register").on('click', '.btnDeleteC', function(event){
                event.preventDefault();
                var idComponent = $(this).parents().find('.cartaComponente').attr('data-id');
                modifyComponent({"isSet":0}, idComponent);
            })
            $("#register").on('click', '.btnSetNew', function(event){
                event.preventDefault();
                var idComponent = $(this).parents().find('.cartaComponente').attr('data-id');
                modifyComponent({"currentKms":0}, idComponent);
            })
        })

    }).fail(function(err){
        console.log(err);
    })
}

function modifyComponent(param, id){
    $.ajax({
     type: 'PUT',
     url: 'http://localhost:1020/'+id,
     dataType: 'json',
     data: JSON.stringify(param), 
     accepts: "application/json",
     crossDomain: true,
     contentType: 'application/json'
     }).done(function(result){   
        $('.msgUpdate').html('<p>Component updated!</p>');
         setTimeout(function(){
             getComponentsBike(sessionStorage.getItem('idBikeSelected'));    
         },2000)
 
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
                
                divBike += `<button class="btn btn-light btnBike" data-id="${bikes.id}"><h3>${bikes.name}</h3><h3>LiveKms: ${bikes.totalKms}</h3></button>`;
               }
               $("#selectBikes").html(divBike);
               $('.btnBike').click(function(){
                   var idBike=$(this).attr('data-id');
                   sessionStorage.setItem('idBikeSelected',idBike);
                   getComponentsBike(idBike);
               })
                
            },
            error: function (e) {
                console.log(e);
            }
        })
    
}

$(document).ready(function() {
     getBikes();
     if(sessionStorage.getItem('idBikeSelected')){
        getComponentsBike(sessionStorage.getItem('idBikeSelected'));
     }
     
});
