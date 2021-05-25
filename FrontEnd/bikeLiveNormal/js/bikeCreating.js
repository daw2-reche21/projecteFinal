function createBike(bikeData) {
    bikeData.idUser = sessionStorage.getItem('userId');
    $.ajax({
        type: 'POST',
        url: 'http://localhost:1057',
        dataType: 'json',
        data: JSON.stringify({"idUser":bikeData.idUser, "name": bikeData.name, "type":bikeData.type, "totalKms": bikeData.bikeKms }), 
        accepts: "application/json",
        crossDomain: true,
        contentType: 'application/json'
    }).done(function(result){
        sessionStorage.setItem('bike1', result.id);   
         $("#register").append(`<div><h3>Bike created</h3>
         <h4>Now it's time to select your components!</h4></div>`);
    }).done(function(){
        $("#bikeCreatingForm").html(`<img src="../imgs/loading.gif" />`);
        
    }).done(function(){
        getComponents();
    }).fail(function(err){
        console.log(err);
    })
};

function getComponents(){ 
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1067',
        crossDomain: true
    }).done(function(data){
        var divComponents = '';
        divComponents = `<div class="card-group" id="catalogoComponentes">`; 
        for(var component of data){
          divComponents+=`
           <div class="card cartaComponente" data-id="${component.id}">
             <img class="card-img-top rounded imgComponent" src="../imgs/componentes/${component.image}" alt="Componente ${component.name}">
             <div class="card-body">
               <h5 class="card-title">Name: ${component.name}</h5>
               <p class="card-text">Model: ${component.brand}  ${component.model} </p>
               <p class="card-text">Live Kms: ${component.liveKms} </p>
               <p class="card-text">Bike type: ${component.bikeType} </p>
               <button type="button" title="Add component" class="btn btn-primary btn-sm"><i class="fas fa-plus-circle"></i></button> 
             </div>
           </div>
         </div>`; 
        }
        divComponents+=`</div>`;
        $("#register").addClass("registerComponentes");
        $("#bikeCreatingForm").addClass("mostrarComponentes");
        $("#bikeCreatingForm").html(divComponents);
    }).fail(function(err){
        console.log(err);
    })
}

function getUser(email) {

    $.ajax({
        type: 'POST',
        url: 'http://localhost:1080/email',
        dataType: 'json',
        data: JSON.stringify({"email":email}), 
        accepts: "application/json",
        crossDomain: true,
        contentType: 'application/json',
        success: function (result) {
            sessionStorage.setItem('userId', result[0]["id"]);  
        },
        error: function (e) {
            console.log(e);
        }
    })
};
$(document).ready(function() {
    if(sessionStorage.getItem('userName') != null ){
       
    }
    $('#btnCreateBike').click(function(){
        var bikeData = {};
        bikeData.name = $('#nombreBici').val();
        bikeData.type = $('#selectType').val();
        bikeData.bikeKms = $('#kmsBike').val();
        createBike(bikeData);
        
    });  
});
