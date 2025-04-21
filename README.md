# Plugin Deactivation Feedback Modal
A simple, reusable WordPress module that adds a feedback popup when users deactivate a plugin. It helps plugin authors collect quick feedback from users before they leave.

## Features
- Clean modal asking users why they’re deactivating
- Drop-in ready — no dependency on plugin frameworks
- Works on the `plugins.php` screen
- Fully customizable HTML/CSS/JS
- AJAX or webhook feedback submission (optional)
- No tracking, no bloat

## Installation
1. Clone or download this repository.
2. Drop the `plugin-deactivation-feedback/` folder into your plugin's directory.
3. Include the main file in your plugin:

```php
require_once plugin_dir_path( __FILE__ ) . 'plugin-deactivation-feedback/feedback-modal.php';
```
4. Update the plugin slug in `feedback.js` to match your plugin’s filename.


## Usage
- The modal appears when a user clicks **Deactivate** on your plugin in the Plugins list.
- Edit the modal HTML in `views/form.php`.
- Customize behavior and styles as needed.

## Capturing Feedback
You can process the feedback using WordPress AJAX or send it to a third-party service.

#### Option 1: Save Feedback via WordPress AJAX

**PHP: Add this to your plugin:**
```
add_action( 'wp_ajax_pdfb_save_feedback', function () {
    $feedback = sanitize_text_field( $_POST['feedback'] ?? '' );

    // Save to log, email, or database
    error_log( "Plugin Feedback: " . $feedback );
    wp_send_json_success();
});
```
**JS: Modify feedback.js**
```
$('#pdfb-submit-feedback').on('click', function () {
    const feedback = $('#pdfb-feedback-text').val();

    $.post(ajaxurl, {
        action: 'pdfb_save_feedback',
        feedback: feedback,
    }, function () {
        location.href = $('tr[data-slug="your-plugin/your-plugin.php"] .deactivate a').attr('href');
    });
});
```
Replace `your-plugin/your-plugin.php` with your actual plugin file name.

#### Option 2: Send Feedback to an External API or Google Form

Add this instead of the default AJAX block in `feedback.js`:
```
$('#pdfb-submit-feedback').on('click', function () {
    const feedback = $('#pdfb-feedback-text').val();

    // Replace with your Google Form or webhook endpoint
    const endpoint = 'https://hooks.zapier.com/hooks/catch/xxxxxx/yyyyyy';

    const data = {
        feedback: feedback
        // For Google Forms: 'entry.123456': feedback
    };

    $.ajax({
        type: 'POST',
        url: endpoint,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function () {
            location.href = $('tr[data-slug="your-plugin/your-plugin.php"] .deactivate a').attr('href');
        }
    });
});
```

> 📌 **Note for Google Forms:** Use `entry.123456` as the field key, and use `application/x-www-form-urlencoded` instead of JSON for compatibility.

## Customize
- Edit text, layout, and fields in `views/form.php`
- Style the modal in `feedback.css`
- Extend with dropdowns, reasons, or emails
- Add logging or routing logic to suit your plugin needs

## Contributing
Feel free to fork, tweak, and improve this. PRs welcome.

## License
MIT - Do whatever you want, just don't blame me if it breaks.

**💡 Collect feedback. Learn why users leave. Make your plugin better.**