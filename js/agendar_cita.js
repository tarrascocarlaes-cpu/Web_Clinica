$(document).ready(function () {
    // Modal elements
    const $modal = $('#successModal');
    const $closeBtn = $('.close-modal');
    const $form = $('#citaForm');

    // Form Submission
    $form.on('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Validate DNI (8 digits)
        const dni = $('#dni').val();
        if (dni.length !== 8 || isNaN(dni)) {
            $('#error-dni').show();
            $('#dni').addClass('error-border');
            isValid = false;
        } else {
            $('#error-dni').hide();
            $('#dni').removeClass('error-border');
        }

        // Validate Phone (9 digits)
        const phone = $('#numero_cel').val();
        if (phone.length !== 9 || isNaN(phone)) {
            $('#error-telefono').show();
            $('#numero_cel').addClass('error-border');
            isValid = false;
        } else {
            $('#error-telefono').hide();
            $('#numero_cel').removeClass('error-border');
        }

        // Validate Email
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

        // Validate Terms
        if (!$('#terminos-condiciones').is(':checked')) {
            $('#error-terminos').show();
            isValid = false;
        } else {
            $('#error-terminos').hide();
        }

        if (isValid) {
            // Show Modal
            $modal.addClass('show');

            // Reset form
            $form[0].reset();
        }
    });

    // Close Modal
    $closeBtn.on('click', function () {
        $modal.removeClass('show');
    });

    // Close Modal on Click Outside
    $(window).on('click', function (e) {
        if ($(e.target).is($modal)) {
            $modal.removeClass('show');
        }
    });

    // Real-time validation (optional)
    $('input').on('input', function () {
        if ($(this).val() !== '') {
            $(this).removeClass('error-border');
            $(this).next('.error').hide();
        }
    });
});
