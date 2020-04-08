/*global $editor $menubar*/
var np = {};

np.config = {
  'appContainer': '.notepad-app'
};

np.bWrap          = false;
np.fontFamily     = 'Arial';
np.fontStype      = '常规';

np.fontSize       = '16';

np.fontHandler = function(e) {
  np.fontFamily = e.family;
  np.fontStype = e.style;
  np.fontSize = e.size;
  
  $editor.setFont(e);
};

$(function() {
  $menubar.show(np.menuData);
  $editor.show();
  $editor.setFont({
    family: np.fontFamily,
    style: np.fontStype,
    size: np.fontSize
  });
  
  var $app = $('body');
  
  $app.click(function() {
    $menubar.hideMenu();
    $editor.focus();
  });
});
