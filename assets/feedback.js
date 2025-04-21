jQuery(document).ready(function ($) {
    const pluginSlug = 'your-plugin-folder/your-plugin.php'; // Replace or make dynamic

    $('tr[data-slug="' + pluginSlug + '"] .deactivate a').on('click', function (e) {
        e.preventDefault();
        $('#pdfb-feedback-modal').show();
    });

    $('.pdfb-modal-close, .pdfb-modal-cancel').on('click', function () {
        $('#pdfb-feedback-modal').hide();
    });

    $('#pdfb-submit-feedback').on('click', function () {
        // Optional: AJAX to save feedback
        location.href = $('tr[data-slug="' + pluginSlug + '"] .deactivate a').attr('href');
    });
});
