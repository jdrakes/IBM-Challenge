$("#signup-form").submit(function(evt) {
    evt.preventDefault();
    var defer = $.Deferred();
    var inputArr = [];
    var inputObj = {};
    var msg = "";
    $("#signup-form input").each(function() {
        var input = $(this);
        var inputVal = $(this).val();

        if (inputVal === "") {
            msg += "Please fill out " + this.name + ".\n";
            inputArr.push(inputVal);
        } else if (inputVal !== "Sign Up"){
            inputObj[this.name] = inputVal;
            inputArr.push(inputVal);
        }

    });

    if (msg !== "") {
        alert(msg);
    }
    else if( !/[\w.+-_]+@[\w.-]+.[\w]+/.test(inputObj.email))
        alert("Invalid email address was input.");
    else if(! /^[a-z0-9]+$/i.test(inputObj.display))
        alert("Invalid username was input.");
    else if(inputObj.password !== inputObj.re_password){
        alert("Passwords do not match please re-enter them.");
        $("#password").val("");
        $("#re_password").val("");
    }
    else{
        signUp(inputObj, defer);
        defer.then(function(result){
            if(result !== "success")
                alert(result);
            else
                alert("Your profile has been created please sign in.");
        });
    }
});

function signUp(data, defer) {
    console.log(data);
    data = JSON.stringify(data);
    $.ajax({
        url: '/signup/signup_action',
        method: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json"
    }).done(function(data) {
        var result;
        console.log(data);
        if (data.error === ""){
            result = 'success';
            if( typeof data.redirect == 'string')
                window.location = data.redirect;
        }
        else
            result = data.error;
        if (defer !== null || defer !== undefined)
            defer.resolve(result);
    });
}
