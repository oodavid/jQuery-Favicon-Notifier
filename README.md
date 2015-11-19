# jQuery Favicon Notifier

Update the brower favicon to render custom text for notification purposes. Can change the icon image, render non-numerical text and choose the colors.

## Usage

```javascript
$.faviconNotify({
    icon:      'favicon.ico', // Path to the favicon or image
    value:     '8',           // String value to show
    position:  'bl',          // 'tl', 'tr', 'bl' or 'br' - defaults to 'br'
    glowColor: '#000000',     // Defaults to '#FFFFFF'
    textColor: '#FFFFFF'      // Defaults to '#000000'
});
```

## Demo

![Example](https://raw.githubusercontent.com/oodavid/jQuery-Favicon-Notifier/master/demo.gif)