function getAllBikes(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1057',
        crossDomain: true
    }).done(function(data){
        var divBikes = '';
        divBikes = `<table class="table table-striped text-white" id="tableItems">
        <caption>List of Bikes</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">id User</th>
            <th scope="col">Name</th>
            <th scope="col">type</th>
            <th scope="col">Total Kms</th>
          </tr>
        </thead>
        <tbody>`; 
        for(var bike of data){
          divBikes+=`
            <tr  class="userRow"  data-id="${bike.id}" data-idUser="${bike.idUser}" data-name="${bike.name}" data-type="${bike.type}" data-totalKms="${bike.totalKms}">
            <th scope="row">${bike.id}</th>
            <td>${bike.idUser}</td>
            <td>${bike.name}</td>
            <td>${bike.type}</td>
            <td>${bike.totalKms}</td>
            <td data-id="${bike.id}"><button type="button" class="btn btn-danger btnDeleteSelectionBike m-1">Delete</button>
            <a type="button" href="#" title="Update this selection" class="btn btn-info btnUpdateSelectionBike" data-toggle="modal" data-target="#updateItemsBD"> Update</a>  
            </tr>
           `; 
        }
        divBikes+=`</tbody>
        </table>`;
        $('#mainAdmin').html(divBikes);

        $(document).ready(function(){
            $("#tableItems").on('click','.btnDeleteSelectionBike', function(event){event.preventDefault(); 
                deleteSelection(1057, $(this), 'BIKE')});
            $("#tableItems").on('click','.btnUpdateSelectionBike',function(event){
                event.preventDefault(); 
                bikeData = {};
                bikeData.id= $(this).parents('tr').attr('data-id');
                bikeData.idUser = $(this).parents('tr').attr('data-idUser');
                bikeData.type = $(this).parents('tr').attr('data-type'); 
                bikeData.name = $(this).parents('tr').attr('data-name');
                bikeData.totalKms = $(this).parents('tr').attr('data-totalKms'); 
                generateUpdateFormBike(bikeData);

            })
        })

          
    }).fail(function(err){
        console.log(err);
    })
}

function getAllUsers(){ 
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1080',
        crossDomain: true
    }).done(function(data){
        var divUsers = '';
        divUsers = `<table class="table table-striped text-white" id="tableItems">
        <caption>List of users</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Name</th>
            <th scope="col">Nº bikes</th>
            <th scope="col">Create Date</th>
            <th scope="col">IsLogged</th>
          </tr>
        </thead>
        <tbody>`; 
        for(var user of data){
          divUsers+=`
            <tr  class="userRow" data-id="${user.id}" data-email="${user.email}" data-password="${user.password}" data-name="${user.name}" data-createdDate="${user.createdDate}" data-numberOfBikes="${user.numberOfBikes}" data-isLogged="${user.isLogged}">
            <th scope="row">${user.id}</th>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.name}</td>
            <td>${user.numberOfBikes}</td>
            <td>${user.createdDate}</td>
            <td>${user.isLogged}</td>
            <td data-id="${user.id}"><button type="button" class="btn btn-danger btnDeleteSelection m-1">Delete</button>
            <a type="button" href="#" title="Update this selection" class="btn btn-info btnUpdateSelection" data-toggle="modal" data-target="#updateItemsBD"> Update</a>  
           `; 
        }
        divUsers+=`</tbody>
        </table>`;
        $('#mainAdmin').html(divUsers);

        $(document).ready(function(){
            $("#tableItems").on('click','.btnDeleteSelection', function(event){event.preventDefault(); 
                deleteSelection(1080, $(this), 'USER')});
            $("#tableItems").on('click','.btnUpdateSelection',function(event){
                event.preventDefault(); 
                userData = {};
                userData.id= $(this).parents('tr').attr('data-id');
                userData.email = $(this).parents('tr').attr('data-email');
                userData.password = $(this).parents('tr').attr('data-password'); 
                userData.name = $(this).parents('tr').attr('data-name'); 
                userData.numberOfBikes = $(this).parents('tr').attr('data-email'); 
                userData.isLogged = $(this).parents('tr').attr('data-isLogged'); 
                generateUpdateFormUser(userData);
            })
        })

          
    }).fail(function(err){
        console.log(err);
    })
}

function getAllComponents(){ 
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1067',
        crossDomain: true
    }).done(function(data){
        var divComponents = '';
        divComponents = `
        <a type="button" id="addComponentBD" href="#" title="Create new component" class="btn btn-info" data-toggle="modal" data-target="#updateItemsBD">New component</a><table class="table table-striped text-white" id="tableItems">
        <caption>List of components</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Bike Type</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Image</th>
            <th scope="col">LiveKms</th>
            <th scope="col">Created Data</th>
          </tr>
        </thead>
        <tbody>`; 
        for(var component of data){
          divComponents+=`
            <tr  class="userRow" data-id="${component.id}" data-name="${component.name}" data-id="${component.id}" data-bikeType="${component.bikeType}" data-brand="${component.brand}" data-model="${component.model}" data-image="${component.image}" data-liveKms=${component.liveKms} >
            <th scope="row">${component.id}</th>
            <td>${component.name}</td>
            <td>${component.bikeType}</td>
            <td>${component.brand}</td>
            <td>${component.model}</td>
            <td>${component.image}</td>
            <td>${component.liveKms}</td>
            <td>${component.createdData}</td>
            <td data-id="${component.id}"><button type="button" class="btn btn-danger btnDeleteSelection m-1">Delete</button>
            <a type="button" href="#" title="Update this selection" class="btn btn-info btnUpdateSelectionCom" data-toggle="modal" data-target="#updateItemsBD"> Update</a>  
            </tr>
           `; 
        }
        divComponents+=`</tbody>
        </table>`;
        $('#mainAdmin').html(divComponents);

        $(document).ready(function(){
            $("#tableItems").on('click','.btnDeleteSelection', function(event){event.preventDefault(); 
                deleteSelection(1067, $(this), 'COMPONENT')});

                $("#tableItems").on('click','.btnUpdateSelectionCom',function(event){
                    event.preventDefault(); 
                    com = {};
                    com.id= $(this).parents('tr').attr('data-id');
                    com.bikeType = $(this).parents('tr').attr('data-bikeType');
                    com.name = $(this).parents('tr').attr('data-name');
                    com.brand = $(this).parents('tr').attr('data-brand'); 
                    com.image = $(this).parents('tr').attr('data-image'); 
                    com.model = $(this).parents('tr').attr('data-model'); 
                    com.image = $(this).parents('tr').attr('data-image'); 
                    com.liveKms = $(this).parents('tr').attr('data-liveKms'); 
                    generateUpdateFormComponent(com);
                });
                $("#mainAdmin").on('click','#addComponentBD', function(event){event.preventDefault(); 
                    generateUpdateFormComponentInsert()});

                
            
        })

          
    }).fail(function(err){
        console.log(err);
    })
}

function updateUserBD(userData, idUser){
    $.ajax({
     type: 'PUT',
     url: 'http://localhost:1080/'+idUser,
     dataType: 'json',
     data: JSON.stringify({"name":userData.name, "password":userData.password, "email":userData.email,  "numberOfBikes":userData.numberOfBikes, "isLogged":userData.isLogged   }), 
     accepts: "application/json",
     crossDomain: true,
     contentType: 'application/json'
     }).done(function(result){
        getAllUsers();
        alert(result.msg+" user "+idUser);  
     }).fail(function(err){
         console.log(err);
     })
}

function updateBikeBD(bikeData, idBike){
    $.ajax({
     type: 'PUT',
     url: 'http://localhost:1057/'+idBike,
     dataType: 'json',
     data: JSON.stringify({"name":bikeData.name, "type":bikeData.type, "totalKms":bikeData.totalKms}), 
     accepts: "application/json",
     crossDomain: true,
     contentType: 'application/json'
     }).done(function(result){
        getAllBikes();
        alert(result.msg+" bike "+idBike);  
     }).fail(function(err){
         console.log(err);
     })
}

function updateComponentBD(comData, idComponent){
    $.ajax({
     type: 'PUT',
     url: 'http://localhost:1067/'+idComponent,
     dataType: 'json',
     data: JSON.stringify({"name":comData.name, "bikeType":comData.bikeType, "brand":comData.brand,  "model":comData.model, "image":comData.image, "liveKms":comData.liveKms   }), 
     accepts: "application/json",
     crossDomain: true,
     contentType: 'application/json'
     }).done(function(result){
        getAllComponents();
        alert(result.msg+" component "+idComponent);  
     }).fail(function(err){
         console.log(err);
     })
}

function createComponentBD(comData){
    $.ajax({
     type: 'POST',
     url: 'http://localhost:1067/',
     dataType: 'json',
     data: JSON.stringify({"name":comData.name, "bikeType":comData.bikeType, "brand":comData.brand,  "model":comData.model,"liveKms":comData.liveKms}), 
     accepts: "application/json",
     crossDomain: true,
     contentType: 'application/json'
     }).done(function(result){
        getAllComponents();
        alert(result.msg+" with ID "+result.id);  
     }).fail(function(err){
         console.log(err);
     })
}

function generateUpdateFormUser(data){
    form ='';
    form+=`<input value="${data.id}" id="inputUserId" class="form-control inputFormulario" type="text" placeholder="Updating user with id ${data.id}" readonly>`
    form+=`<div class="form-group">
    <label for="inputUserEmail">Email:</label>
    <input type="text" value="${data.email}" 
    class="form-control inputFormulario" id="inputUserEmail" placeholder="User email">
  </div>`;
    form+=`<div class="form-group">
    <label for="inputUserPassword">Password:</label>
    <input type="text" value="${data.password}" 
    class="form-control inputFormulario" id="inputUserPassword" placeholder="User password">
    </div>`;
    form+=`<div class="form-group">
    <label for="inputUserName">Name:</label>
    <input type="text" value="${data.name}" 
    class="form-control inputFormulario" id="inputUserName" placeholder="User Name">
    </div>`;
    form+=`<div class="form-group">
    <label for="inputUserNumBikes">Number of bikes:</label>
    <input type="number" value=${data.numberOfBikes} 
    class="form-control inputFormulario" id="inputUserNumBikes" placeholder="User number of bikes">
    </div>`;
    form+=`<select class="custom-select inputFormulario" id="inputUserIsLogged">`;
    if(data.isLogged == 1){
        form+=`<option value="${data.isLogged}" selected>Online</option>
        <option value="0">No logged</option>`;
    }else{
        form+=`<option value="${data.isLogged}" selected>Offline</option>
        <option value="1">Is logged</option>`; 
    }
    form+=`</select>`;
  $('#divFormUpdate').html(form);
    $(document).ready(function(){
            $("#saveUpdate").bind('click', function(event){        
             $(this).unbind('click');
                userData ={};
                console.log($(".inputFormulario"));
                var userId= $('#inputUserId').val();
                userData.email = $('#inputUserEmail').val();
                userData.password = $('#inputUserPassword').val();
                userData.name = $('#inputUserName').val(); 
                userData.numberOfBikes = $('#inputUsernumberOfBikes').val();
                userData.isLogged = $('#inputisLogged').val();  
                updateUserBD(userData, userId);


            })
    })

}
function generateUpdateFormBike(data){
    form ='';
    form+=`<input value="${data.id}" id="inputUserId" class="form-control inputFormulario" type="text" placeholder="Updating user with id ${data.id} and idUser ${data.idUser}" readonly>`
    form+=`<div class="form-group">
    <label for="inputBikeName">Name:</label>
    <input type="text" value="${data.name}" 
    class="form-control inputFormulario" id="inputBikeName" placeholder="Bike Name">
  </div>`;
    form+=`<div class="form-group">
    <label for="inputinputBikeType">Type</label>
    <input type="text" value="${data.type}" 
    class="form-control inputFormulario" id="inputBikeType" placeholder="Bike type">
    </div>`;
    form+=`<div class="form-group">
    <label for="inputBikeKms">Total kms:</label>
    <input type="number" value=${data.totalKms} 
    class="form-control inputFormulario" id="inputBikeKms" placeholder="Total kms">
    </div>`;
  $('#divFormUpdate').html(form);
    $(document).ready(function(){
            $("#saveUpdate").bind('click', function(event){        
             $(this).unbind('click');
                bikeData ={};
                console.log($(".inputFormulario"));
                var bikeId= $('#inputUserId').val();
                bikeData.name = $('#inputBikeName').val();
                bikeData.totalKms = $('#inputBikeKms').val();
                bikeData.type = $('#inputBikeType').val();    
                updateBikeBD(bikeData, bikeId);


            })
    })

}

function generateUpdateFormComponent(data){
    form ='';
    form+=`<input value="${data.id}" id="inputComId" class="form-control inputFormulario" type="text" placeholder="Updating component with id ${data.id}" readonly>`
    form+=`<div class="form-group">
    <label for="inputComName">Name:</label>
    <input type="text" value="${data.name}" 
    class="form-control inputFormulario" id="inputComName" placeholder="Name component">
  </div>`;
    form+=`<div class="form-group">
    <label for="inputComBikeType">Bike type:</label>
    <input type="text" value="${data.bikeType}" 
    class="form-control inputFormulario" id="inputComBikeType" placeholder="Bike type">
    </div>`;
    form+=`<div class="form-group">
    <label for="inputComBrand">Brand:</label>
    <input type="text" value="${data.brand}" 
    class="form-control inputFormulario" id="inputComBrand" placeholder="Brand">
    </div>`;
    form+=`<div class="form-group">
    <label for="inputComModel">Model:</label>
    <input type="text" value="${data.model}" 
    class="form-control inputFormulario" id="inputComModel" placeholder="Model">
    </div>`;
    form+=`<div class="form-group">
    <label for="inputComImage">URL Image:</label>
    <input type="text" value="${data.image}" 
    class="form-control inputFormulario" id="inputComImage" placeholder="Image">
    </div>`;
    form+=`<div class="form-group">
    <label for="inputComLiveKms">Lives Kms:</label>
    <input type="number" value=${data.liveKms} 
    class="form-control min=0 inputFormulario" id="inputComLiveKms" placeholder="Live kms">
    </div>`; 
  $('#divFormUpdate').html(form);
    $(document).ready(function(){
            $("#saveUpdate").bind('click', function(event){        
             $(this).unbind('click');
                comData ={};
                var idComponent= $('#inputComId').val();
                comData.bikeType = $('#inputComBikeType').val();
                comData.brand = $('#inputComBrand').val();
                comData.name = $('#inputComName').val(); 
                comData.model = $('#inputComModel').val();
                comData.liveKms = $('#inputComLiveKms').val();  
                comData.image = $('#inputComImage').val();  
                updateComponentBD(comData, idComponent);


            })
    })

}

function generateUpdateFormComponentInsert(){
    $("#tituloModal").text("Create new component");
    form ='';
    form+=`<div class="form-group">
    <label for="inputComName">Name:</label>
    <input type="text" value=""
    class="form-control inputFormulario" id="inputComName" placeholder="Name component" required>
  </div>`;
    form+=`<div class="form-group">
    <label for="inputComBikeType">Bike type:</label>
    <input type="text" value="" 
    class="form-control inputFormulario" id="inputComBikeType" placeholder="Bike type" required>
    </div>`;
    form+=`<div class="form-group">
    <label for="inputComBrand">Brand:</label>
    <input type="text" value=""
    class="form-control inputFormulario" id="inputComBrand" placeholder="Brand" required>
    </div>`;
    form+=`<div class="form-group">
    <label for="inputComModel">Model:</label>
    <input type="text" value="" 
    class="form-control inputFormulario" id="inputComModel" placeholder="Model" required>
    </div>`;
    form+=`<div class="form-group">
    <label for="inputComLiveKms">Lives Kms:</label>
    <input type="number" value="" 
    class="form-control min=0 inputFormulario" id="inputComLiveKms" placeholder="Live kms" required>
    </div>`; 
  $('#divFormUpdate').html(form);
    $(document).ready(function(){
            $("#saveUpdate").bind('click', function(event){        
             $(this).unbind('click');
                comData ={};
                comData.bikeType = $('#inputComBikeType').val();
                comData.brand = $('#inputComBrand').val();
                comData.name = $('#inputComName').val(); 
                comData.model = $('#inputComModel').val();
                comData.liveKms = $('#inputComLiveKms').val();  
                comData.image = $('#inputComImage').val();
                if(comData.bikeType=="" || comData.brand=="" ||  comData.name=="" ||  comData.model=="" || comData.liveKms=="" || comData.image==""   ){
                    $("#tituloModal").text("Fill the inputs"); 
                }else{
                    createComponentBD(comData);
                }  
                

            })
    })

}

function deleteSelection(port, registro, tipo){
    console.log(registro.parent().attr('data-id'));
    const idSelected = registro.parent().attr('data-id');
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:'+port+'/'+idSelected,
        crossDomain: true
    }).done(function(data){
        alert(`User with ID: ${idSelected} Deleted`);
        if(tipo == 'BIKE'){
            getAllBikes();
        }
        if(tipo === 'COMPONENT'){
            getAllComponents();
        }else{
            getAllUsers(); 
        }
                 
    }).fail(function(err){
        console.log(err);
    })
}

$(document).ready(function(){
    getAllUsers();
    $("#btnShowUsers").click(getAllUsers);
    $("#btnShowBikes").click(getAllBikes);
    $("#btnShowComponents").click(getAllComponents);
   
})