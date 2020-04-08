/* exported $editor */
var $editor = (function() {
  var $DOM = $(''
      + '<div class="notepad-editor">'
        + '<textarea spellcheck="false" auto-size="none"></textarea>'
      + '</div>');

  var $textArea = $DOM.find('textarea');
  var cfg = {
    posHandler: null,
    contentHandler: null,
    wrap: false
  };

  function resize(isBig) {
    if(isBig) {
      $DOM.css({bottom: '21px'});
    } else {
      $DOM.css({bottom: '0'});
    }
  }

  function focus() {
    $textArea.focus();
  }
    
  function setWrap(bWrap) {
    if(bWrap) {
      $textArea.attr('wrap', 'soft');
      $textArea.css({'overflow-x': 'hidden'});
    } else {
      $textArea.attr('wrap', 'off');
      $textArea.css({'overflow-x': 'scroll'});
    }
  }
    
  function setFont(e) {
    $textArea.css({'font-family': e.family, 'font-size': e.size + 'pt'});

    if(e.style === '斜体') {
      $textArea.css({'font-style': 'italic'});
      return;
    }
    
    if(e.style === '粗体') {
      $textArea.css({'font-weight': 'bold'});
      return;
    }
    
    if(e.style === '粗偏斜体') {
      $textArea.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
  }
    
  function show(conf) {
    $.extend(cfg, conf);

    $('body').append($DOM);
    $textArea.trigger('focus');
    setWrap(cfg.wrap);
  }

  return {
    show: show,
    resize: resize,
    focus: focus,
    setWrap: setWrap,
    setFont: setFont
  };
})();
