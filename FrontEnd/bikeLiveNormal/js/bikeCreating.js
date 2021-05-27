//por cada componente se hace un post
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
                console.log( (result.msg));  
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
         $("#register").append(`<div class="textInfo"><h3>Bike created...</h3>
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
        Show Components <span class="badge badge-light" id="numComp">0</span> 
      </button>
      <div class="dropdown-menu" id="carritoComponents" aria-labelledby="navbarDropdown">
      <ul id="listComponents" class="list-group">
      <li class="dropdown-item">NAME | MODEL | BRAND </li>
        
        </ul>
       `;
        
        $("#imgMechanic").append(divComponentesBici);
        $(document).ready(function() {
            $('#listComponents').on('click', '.btnDeleteComp', deleteComponent);
            $('#register').on('click','#btnFinishBike',finishBike);
            $('.btnAddComponent').click(addComponent);    
         });

          
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

num = 0;
cont = 0;
function addComponent(){
    if(cont == 0){
        $('#imgMechanic').append(` <button class='btn btn-primary m-2' id="btnFinishBike">Finish <i class="fas fa-wrench"></i></button>
        </div>`);
        cont++;
    }
    
    var nameComp = $(this).parents('.cartaComponente').attr('data-name');
    var idComp = $(this).parents('.cartaComponente').attr('data-id');
    var model = $(this).parents('.cartaComponente').attr('data-model');
    var brand = $(this).parents('.cartaComponente').attr('data-brand');
    num ++;
    if(num == 0){
        $("#btnFinishBike").hide();
    }else{
        $("#btnFinishBike").show();
    }
    
    console.log("addComponent"+num);
    $("#numComp").text(num);
    $("#listComponents").append(`<li class="dropdown-item deleteItem" data-id="${idComp}">${nameComp}, ${model}, ${brand} <button type="button" class="btn btn-outline-danger btn-sm btnDeleteComp"><i class="fas fa-minus"></i></button></li>`); 
}

function deleteComponent(){
    var id = $(this).parent().attr('data-id');
    num --;
    if(num == 0){
        $("#btnFinishBike").hide();
    }else{
        $("#btnFinishBike").show();
    }
    console.log("DELETEComponent"+num+"   id: "+id);
    $("#numComp").text(num);
    $(this).parent().remove();  
 
}
//para subir crear la bici definitivamente
 function finishBike(){
     $('#listComponents li').each(function(i){
         if(i!=0){
             var idComponent = $(this).attr('data-id');
             createComponentsBike(idComponent);
         }
     })
    
    $('.textInfo').html("");
    $('#bikeCreatingForm').html(`<h4>Bike and components created succesfuly. </h4> 
     <h4>Redirecting to your bike... </h4><div class="spinner-border text-dark ml-1" role="status">
     <span class="sr-only"> Loading...</span>
   </div>`);

    setTimeout(function(){
         window.location.href = 'mybikes.html';
     },5000);
}

