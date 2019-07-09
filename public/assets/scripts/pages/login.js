var app = new Vue({
    el: "#login",
    data: {
        cocd: null
    },
    methods: {
        refresh_cocd: function() {
            $.ajax({
                type: "get",
                url: "/company/get",
                success: function(response) {
                    app.cocd = response.data;
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
                url: "/user/login",
                data: {
                    cocd: cocd,
                    username: username,
                    password: password
                },
                success: function(response) {
                    showAlert("success", response.message);
                    localStorage.setItem("token", response.data.token);
                    window.location = "/";
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
    if (localStorage.hasOwnProperty("token")) {
        window.location = "/";
    }
    app.refresh_cocd();
    $("input[name=cocd]").focus();
});
