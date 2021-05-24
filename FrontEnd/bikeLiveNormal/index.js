wrongMail = false;
function userExist(mail) {

    $.ajax({
        type: 'POST',
        url: 'http://localhost:1080/userexist',
        dataType: 'json',
        data: JSON.stringify({ "email": mail }), 
        accepts: "application/json",
        crossDomain: true,
        contentType: 'application/json',
        success: function (result) {
            console.log(result.msg);
            if(result.msg === 'Exist'){
                $('#emailRegistro').css({"border-color":"red"});
                $('#emailRegistro').parent().append(`<p class='msgError'>This email is already in use</p>`);
                wrongMail = true;
            }else{
                wrongMail = false;
                $('#emailRegistro').css({"border-color":"green"}); 
                $('.msgError').text("");
            }
        },
        error: function (e) {
             // log error in browser
            console.log(e);
        }
    });
};

function registerUser(userData) {

    $.ajax({
        type: 'POST',
        url: 'http://localhost:1080',
        dataType: 'json',
        data: JSON.stringify({"email":userData.email, "password": userData.password }), 
        accepts: "application/json",
        crossDomain: true,
        contentType: 'application/json',
        success: function (result) {
            console.log(result.msg);
            if(result.status == 200){
                console.log(result.id);
            }
        },
        error: function (e) {
             // log error in browser
            console.log(e);
        }
    }).done(function(){

        $('#registerForm').html(`<h3>Register Succesfully!</h3>`);
    });
};


function loginUser(userData) {

    $.ajax({
        type: 'POST',
        url: 'http://localhost:1080/login',
        dataType: 'json',
        data: JSON.stringify({"email":userData.email, "password": userData.password }), 
        accepts: "application/json",
        crossDomain: true,
        contentType: 'application/json',
        success: function (result) {
            console.log(result.msg);
            if(result.msg === 'logged'){
                console.log(result.msg+"login"); 
                sessionStorage.setItem('username', msg.email);  
                sessionStorage.setItem('isLogin', 'true');  
            }
        },
        error: function (e) {
            $('#btnLogin').parent().append(`<p class='msgError'>Incorrect email or password</p>`);
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

