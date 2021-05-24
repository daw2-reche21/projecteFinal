function userExist(mail) {
    $.post('http://localhost:1080/userexist', {email:mail}, function(result) {

        alert(result.msg);

    }).fail(function(text, req) {
        console.log("Error" + text + req);
    });
}

$(document).ready(function() {
    $('#emailRegistro').keyup(console.log($('#emailRegistro').val()));
    //$('#emailRegistro').keyup($().val()));
})
