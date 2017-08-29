/**
 * Created by Callpyuser on 4/15/2015.
 */
$(document).ready(function(){

    function check_email(t) {
        if (t.val() == '') {

            return false;
        } else if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,12}$/i.test(t.val())) {

            return false;
        } else {
            return true;
        }
    }

    //remove all modals in the end of body-tag
    //$('body').append($('#positive_registration_window'), $('#registration__window'), $('#login__window'), $('#password__recovery'), $('#recovered_password'));

    var registration_window = CallpyModal.create({
        el: document.body.querySelector("#registration__window")
    });

    var positive_registration = CallpyModal.create({
        el: document.body.querySelector("#positive_registration_window")
    });

    var login_popup = CallpyModal.create({
        el: document.body.querySelector("#login__window")
    });

    var password_recovery = CallpyModal.create({
        el: document.body.querySelector("#password__recovery")
    });

    var recovered_password = CallpyModal.create({
        el: document.body.querySelector("#recovered_password")
    });

    var testdrive = CallpyModal.create({
        el: document.body.querySelector("#testdrive_popup")
    });


    $('.callpy-registration-container__button').on('click', function(){
        positive_registration.hide();
        return false;
    });

    $('.callpy-registration-link').on('click', function(){
        registration_window.show();
        return false;
    });

    $('.callpy-login-link').on('click', function(){
        login_popup.show();
        return false;
    });

    $('.password-recovery-link').on('click', function(){
        password_recovery.show();
        login_popup.hide();
        return false;
    });


    if(window.bm_reg){
        positive_registration.show();
    }
    //обработка окна восстановления пароля
    $('#password-recovery-form-button').on('click', function(){
        $('#password-recovery-form').submit();
    });

    $(document.body).on('submit', '#password-recovery-form', function() {
        var t = $('#password-recovery-form');
        var email = t.find('input').eq(0);

        if (check_email(email) == false) {
            email.callpy_error(_('Неверный формат e-mail')).on('input.error', function() {
                if (check_email($(this)) == true) {
                    $(this).callpy_error('off').off('.error');
                }
            });
        }
        else {
            /**/
            email.addClass('ajax');
            $.post('/manager/restore/', {
                email: email.val()
            }, function(data) {
                email.removeClass('ajax');

                //data = JSON.parse(data);
                if (data == 'false') {
                    email.callpy_error("Неправильний email!");
                    email.on('input.callpy_error', function() {
                        email = $(this);
                        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(email.val())) {
                            email.callpy_error('off').off('.error');
                        }
                    });
                }
                else{
                    password_recovery.hide();
                    recovered_password.show();
                }

            });
        }

        return false;
    });


    //обработка окна входа:
    $('#sign-up-form-button').on('click', function(){
        $('#sign-up-form').submit();
    });
    $(document.body).on('submit', '#sign-up-form', function() {

        var login_data = {
            email: {
                val: false,
                target: $('#login_email')
            },
            password: {
                val: false,
                target: $('#login_password')
            }
        };

        if (check_email(login_data.email.target) == true) {
            login_data.email.val = login_data.email.target.val();
        }
        else {
            /* обработка ошибки некорректного email */
            login_data.email.target.callpy_error("Неправильний формат e-mail!").on('input.callpy_error', function() {
                login_data.email.target = $(this);
                if (check_email(login_data.email.target)) {
                    login_data.email.target.callpy_error('off').off('.callpy_error');
                }
            });
        }

        if (login_data.password.target.val() !== '') {
            login_data.password.val = login_data.password.target.val();
        }
        else {
            /* обработка ошибки пароля */
            login_data.password.target.callpy_error("Введіть пароль").on('input.callpy_error', function() {
                login_data.password.target = $(this);
                if (login_data.password.target.val() !== '') {
                    login_data.password.target.callpy_error('off').off('.callpy_error');
                }
            });
        }

        if (login_data.email.val !== false && login_data.password.val !== false) {
            $.get("/clpy/", {
                action: "login",
                login: login_data.email.val,
                password: login_data.password.val
            }, function(data) {
                data = JSON.parse(data);

                if (data["answer"] == "true") {
                    if (data["type"]=="manager") window.location.href = "/manager/";
                    else window.location.href = "/sites/";
                }
                if (data["answer"] == "false") {
                    /* обработка ошибки пароля "Такой пары логин пароль не существует" */
                    login_data.email.target.callpy_error("Такої пари ім'я користувача/пароль не існує");
                    $.fn.callpy_tooltip('hide', login_data.email.target, 2000);
                    login_data.email.target.on('input.callpy_error', function() {
                        login_data.email.target.callpy_error('off').off('.callpy_error');
                    });
                }

            });
        }

        return false;
    });

    //обработка окна реги:
    $('#sign-in-form-button').on('click', function(){
        $('#sign-in-form').submit();
    });
    $('#sign-in-form').on('submit', function(){
        var input = $(this).find('.callpy-registration-container__input');
        if (check_email(input)) {
            input.addClass('ajax');
            $.post('/clpy/', {
                action: 'register',
                mail: input.val()
            }, function(data) {
                input.removeClass('ajax');
                data = JSON.parse(data);

                if (!data.answer.result) {
                    input.callpy_error("Ця електронна адреса вже зареєстрована у системі!");
                    input.on('input.callpy_error', function() {
                        input = $(this);
                        if (check_email(input)) {
                            input.callpy_error('off').off('.error');
                        }
                    });
                }
                else {
                    //ВСЕ ХОРОШО, УБИРАЕМ, ПОКАЗЫВАЕМ САКСЕСФУЛ ПОПАП
                    registration_window.hide();
                    positive_registration.show();
                }
            });
        }
        else{
            input.callpy_error("Неправильний формат email!");
            input.on('input.callpy_error', function() {
                input = $(this);
                if (check_email(input)) {
                    input.callpy_error('off').off('.error');
                }
            });
        }

        return false;
    });
    //testdrive

    $('.test-drive-button').on('click', function(){
        var input = $('#test-drive-input');
        if (/^[a-zа-яё0-9_-]+(\.[a-zа-яё0-9_-]+)*\.[a-zа-яё]{2,6}$/i.test(input.val())) {
            testdrive.show();

            $.get("http://callpy.com/clpy/", {
                action: "demo_register",
                url: input.val()
            }, function(data) {
                if (data != 'false') {

                    $('.test-drive__subtitle').html(input.val());

                    $('#user_site_link').val('http://' + data);
                    $('#user_site_link2').attr('href', 'http://' + data);
                }
            });
        }
        else{
            input.callpy_error("Неправильний формат!");
            input.on('input.callpy_error', function() {
                input = $(this);
                if (check_email(input)) {
                    input.callpy_error('off').off('.error');
                }
            });
        }
        return false;
    });
});
