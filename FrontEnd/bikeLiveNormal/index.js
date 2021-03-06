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
                $(".errorForm").text("");
                $('.errorForm').text(`This email is already in use`);
                wrongMail = true;
            }else{
                wrongMail = false;
                $('#emailRegistro').css({"border-color":"green"}); 
                $('.errorForm').text("");
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
            console.log(result);
            if(result.msg === 'User created'){
                console.log(result.id);
                sessionStorage.setItem('userId', result.id);  
                sessionStorage.setItem('userName', userData.email); 
                sessionStorage.setItem('islogin', 'logged'); 
                sessionStorage.setItem('numBikes', 0); 
                window.location.href = 'pages/bikeCreating.html';
              
            }
        },
        error: function (e) {
             // log error in browser
            console.log(e);
        }
    })
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
            if(result.msg === 'logged'){
                sessionStorage.setItem('isLogin', result.msg);
                sessionStorage.setItem('userName', result.email);
                sessionStorage.setItem('numBikes', result.numberOfBikes); 
                getUser(result.email); 
                
            }
           
        },
        error: function (e) {
            $('.errorLogin').html('<p>Incorrect email or password<p>');
            console.log(e);
        }
    }).done(function(){
        if(sessionStorage.getItem('userName')){
            getUser(sessionStorage.getItem('userName'));
        }
    })
};

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
            sessionStorage.setItem('numBikes', result.numberOfBikes);
            if(email === 'admin@admin.com'){
                sessionStorage.setItem('isadmin','admin');
                window.location.href = 'pages/adminpage.html';
            }else if(result.numberOfBikes == 0){
                window.location.href = 'pages/bikeCreating.html'; 
            }else if(result.numberOfBikes !=0) {
                window.location.href = 'pages/mybikes.html';
            }
            
        },
        error: function (e) {
            console.log(e);
        }
    })
};



$(document).ready(function() {
    
    if(sessionStorage.getItem('isadmin') === 'admin'){
        window.location.href = 'pages/adminpage.html';  
    }
    if(sessionStorage.getItem('isLogin') === 'logged'){
        window.location.href = 'pages/bikeCreating.html'; 
    }
    
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
            if(userData.password === ""){
                $('.msgError').text("Write a valid password");
            }else{
                if(wrongMail === false){
                    registerUser(userData);
                }else{
                    $('.msgError').text("Cannot register, email already exist");
                }
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

