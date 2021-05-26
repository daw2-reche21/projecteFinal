function createComponentsBike(idComponente){
    const idBike = sessionStorage.getItem('bike'); 
        $.ajax({
            type: 'POST',
            url: 'http://localhost:1020',
            dataType: 'json',
            data: JSON.stringify({"idComponent":idComponente, "idBike": idBike}), 
            accepts: "application/json",
            crossDomain: true,
            contentType: 'application/json',
            success: function (result) {
                resolve (result.msg);  
            },
            error: function (e) {
                console.log(e);
            }
        })
}
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
        sessionStorage.setItem('bike', result.id);   
         $("#register").append(`<div><h3>Bike created...</h3>
         <h4>Now, it's time to select your components!</h4></div>`);
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
           <div class="card cartaComponente pt-1" data-id="${component.id}" data-name="${component.name}" data-brand ="${component.brand}" data-model ="${component.model}" data-liveKms ="${component.liveKms}" data-bikeType=" ${component.bikeType}">
             <img class="card-img-top rounded imgComponent" src="../imgs/componentes/${component.image}" alt="Componente ${component.name}">
             <div class="card-body">
               <h5 class="card-title" >Name: ${component.name}</h5>
               <p class="card-text" >Model: ${component.brand}  ${component.model} </p>
               <p class="card-text"  >Live Kms: ${component.liveKms} </p>
               <p class="card-text" >Bike type: ${component.bikeType} </p>
               <div class="divbtnComponent">
               <button type="button" title="Add component"  class="btn btn-primary btn-sm btnAddComponent"><i class="fas fa-plus-circle"></i></button>
               </div> 
             </div>
             </div>`; 
        }
        divComponents+=`</div>`;
        $("#register").addClass("registerComponentes");
        $("#bikeCreatingForm").addClass("mostrarComponentes");
        $("#bikeCreatingForm").html(divComponents);
        divComponentesBici = ` <button class="btn btn-info nav-link dropdown-toggle m-2" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Components <span class="badge badge-light " id="numComp">0</span> 
      </button>
      <div class="dropdown-menu" id="carritoComponents" aria-labelledby="navbarDropdown">
      <ul id="listComponents" class="list-group">
      <li class="dropdown-item">NAME | MODEL | BRAND </li>
        
        </ul>
        <button class='btn btn-info m-2 float-right' id="btnFinishBike">Finish <i class="fa fa-wrench"></button>
      </div>`;

        $("#imgMechanic").append(divComponentesBici);
        $('.btnAddComponent').click(addComponent);        
          
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
    $('#btnCreateBike').click(function(){
        var bikeData = {};
        bikeData.name = $('#nombreBici').val();
        bikeData.type = $('#selectType').val();
        bikeData.bikeKms = $('#kmsBike').val();
        createBike(bikeData);
        
    });  
   
});

arrayComponentes = [];
function addComponent(){
    var nameComp = $(this).parents('.cartaComponente').attr('data-name');
    var idComp = $(this).parents('.cartaComponente').attr('data-id');
    var model = $(this).parents('.cartaComponente').attr('data-model');
    var brand = $(this).parents('.cartaComponente').attr('data-brand');
    var numComp = $("#numComp").text();
    numComp ++;
    arrayComponentes.push(idComp);
    $("#numComp").text(numComp);
    $("#listComponents").append(`<li class="dropdown-item" data-id="${idComp}">${nameComp}, ${model}, ${brand} <button type="button" class="btn btn-outline-danger btn-sm btnDeleteComp"><i class="fas fa-minus"></i></button></li>`);
    $('.btnDeleteComp').click(deleteComponent);
    console.log("dentro de add "+arrayComponentes);
    if(arrayComponentes.length >0){
        $('#btnFinishBike').click(finishBike);
    }  
}

function deleteComponent(){
   var id = $(this).parent().attr('data-id');
   console.log("dentro de delete "+arrayComponentes);
   var index = arrayComponentes.indexOf(id);
   arrayComponentes.slice(index,1); 
   var  num = $("#numComp").text();
    num --;
    $("#numComp").text(num);
    $(this).parent().remove();  
 
}
//para subir crear la bici definitivamente
async function finishBike(){
    for(let i=0; i<arrayComponentes.length; i++){
       await createComponentsBikes(arrayComponentes[i]);
    }
    alert("holaaa");

}

