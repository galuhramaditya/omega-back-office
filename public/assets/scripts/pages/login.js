var app = new Vue({
    el: "#login",
    data: {
        company: null
    },
    methods: {
        refresh_company: function() {
            $.ajax({
                type: "get",
                url: url("/company/get"),
                success: function(response) {
                    app.company = response.data;
                }
            });
        },
        handleLogin: function() {
            var form = $("[form-action=login]");
            var cocd = form.find("select[name=cocd]").val();
            var username = form.find("input[name=username]").val();
            var password = form.find("input[name=password]").val();

            hideFormAlert();

            $.ajax({
                type: "POST",
                url: url("/user/login"),
                data: {
                    cocd: cocd,
                    username: username,
                    password: password
                },
                success: function(response) {
                    showAlert("success", response.message);
                    sessionStorage.setItem("token", response.data.token);
                    window.location = url("/");
                },
                error: function(response) {
                    showAlert("error", response.responseJSON.message);
                    showFormAlert(form, response.responseJSON.data);
                }
            });
        }
    }
});

jQuery(document).ready(function() {
    if (sessionStorage.hasOwnProperty("token")) {
        window.location = url("/");
    }
    app.refresh_company();
    $("input[name=cocd]").focus();
});
