function loginUser(bikeData) {

    $.ajax({
        type: 'POST',
        url: 'http://localhost:1057',
        dataType: 'json',
        data: JSON.stringify({"idUser":bikeData.idUser, "name": bikeData.name, "type":bikeData.type, "totalKms": bikeData.bikeKms }), 
        accepts: "application/json",
        crossDomain: true,
        contentType: 'application/json',
        success: function (result) {
            console.log(result.msg);
            sessionStorage.setItem('bike1', result.id);  
        },
        error: function (e) {
            $('#btnCreateBike').parent().append(`<p class='msgError'>Invalid data bike!</p>`);
            console.log(e);
        }
    })
};

$(document).ready(function() {
    console.log($('#emailRegistro').val());
    
        $('#emailRegistro').keyup(function(){
            if($('#emailRegistro').val() || $('#emailRegistro').val() != ''){
                userExist($('#emailRegistro').val());
            }
    });
        $('#btnRegistro').click(function(){
            var userData = {};
            userData.email = $('#emailRegistro').val();
            userData.password = $('#passwordRegistro').val();
            if(wrongMail === false){
                registerUser(userData);
            }else{
                $('.msgError').text("Cannot register, email already exist");
            }
        });
    $('#btnLogin').click(function(){
        var userData = {};
        userData.email = $('#emailLogin').val();
        userData.password = $('#passwordLogin').val();
        loginUser(userData);

    })  
    $('#footLogin').click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');
        $('#btnToggleLogin').click();

    })
});