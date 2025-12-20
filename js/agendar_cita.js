$(document).ready(function () {
    const $modal = $('#successModal');
    const $closeBtn = $('.close-modal');
    const $form = $('#citaForm');

    $form.on('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        const dni = $('#dni').val();
        if (dni.length !== 8 || isNaN(dni)) {
            $('#error-dni').show();
            $('#dni').addClass('error-border');
            isValid = false;
        } else {
            $('#error-dni').hide();
            $('#dni').removeClass('error-border');
        }

        const phone = $('#numero_cel').val();
        if (phone.length !== 9 || isNaN(phone)) {
            $('#error-telefono').show();
            $('#numero_cel').addClass('error-border');
            isValid = false;
        } else {
            $('#error-telefono').hide();
            $('#numero_cel').removeClass('error-border');
        }

        const email = $('#email').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#error-email').show();
            $('#email').addClass('error-border');
            isValid = false;
        } else {
            $('#error-email').hide();
            $('#email').removeClass('error-border');
        }

        if (!$('#terminos-condiciones').is(':checked')) {
            $('#error-terminos').show();
            isValid = false;
        } else {
            $('#error-terminos').hide();
        }

        if (isValid) {
            $modal.addClass('show');

            $form[0].reset();
        }
    });

    $closeBtn.on('click', function () {
        $modal.removeClass('show');
    });

    $(window).on('click', function (e) {
        if ($(e.target).is($modal)) {
            $modal.removeClass('show');
        }
    });

    $('input').on('input', function () {
        if ($(this).val() !== '') {
            $(this).removeClass('error-border');
            $(this).next('.error').hide();
        }
    });

    const $userIcon = $('#userIcon');
    const $userPopup = $('#userPopup');

    $userIcon.on('click', function (e) {
        e.stopPropagation();
        $userPopup.toggleClass('active');
    });

    $(window).on('click', function (e) {
        if (!$userIcon.is(e.target) && $userIcon.has(e.target).length === 0 &&
            !$userPopup.is(e.target) && $userPopup.has(e.target).length === 0) {
            $userPopup.removeClass('active');
        }
    });
});
