// It's usually worth storing the original icon, in case you need to restore it
var originalIcon = $('link[rel$=icon]').attr('href') || '/favicon.ico';
// for the demo, just update this object and run $.faviconNotify...
var opts = {
    icon:      originalIcon,
    position:  null,
    glowColor: null,
    textColor: null,
    value:     null
};
function setIcon(el){
    opts.icon = $(el).find('img').attr('src');
    $.faviconNotify(opts);
}
function setValue(el){
    opts.value = $(el).val();
    $.faviconNotify(opts);
}
function setRandomValue(){
    var rand = Math.round(Math.random()*15);
    $('#myValue').val(rand);
    opts.value = rand;
    $.faviconNotify(opts);
}
function setPosition(el){
    opts.position = $(el).text();
    $.faviconNotify(opts);
}
function setColors(text, glow){
    opts.textColor = text;
    opts.glowColor = glow;
    $.faviconNotify(opts);
}
function setRandomColors(el){
    opts.textColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    opts.glowColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    $.faviconNotify(opts);
}