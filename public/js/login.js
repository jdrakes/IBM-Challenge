$("#login-form").submit(function(evt) {
    evt.preventDefault();
    var defer = $.Deferred();
    var inputArr = [];
    var inputObj = {};
    var msg = "";
    $("#login-form input").each(function() {
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
    else if( !/[\w.+-_]+@[\w.-]+.[\w]+/.test(inputObj.username))
        alert("Invalid email address was input.");
    else{
        login(inputObj, defer);
        defer.then(function(result){
            if(result !== "success")
                alert(result);
            else
                alert("You have succesfully logged in!");
        });
    }
});

function login(data, defer) {
    data = JSON.stringify(data);
    $.ajax({
        url: '/login/login_action',
        method: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json"
    }).done(function(data) {
        var result;
        if (data.error === ""){
            result = 'success';
            if( typeof data.redirect == 'string')
                window.location = data.redirect;
        }
        if (defer !== null || defer !== undefined)
            defer.resolve(result);
    })
    .fail(function(error){
        errorMessage = JSON.parse(error.responseText);
        result = errorMessage.error;
        if (defer !== null || defer !== undefined)
            defer.resolve(result);
    });
}
