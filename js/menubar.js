/*exported $menubar*/
/*global np $dlgFont*/
var $menubar = (function() {
  np.menuData = [
    { 
      title: '文件(F)',
      menuItems: [
        {
          title: '新建(N)',
          shortcut: 'Ctrl+N',
          enabled: true
        },
        {
          title: '打开(O)...',
          shortcut: 'Ctrl+O',
          enabled: true
        },
        {
          title: '保存(S)',
          shortcut: 'Ctrl+S',
          enabled: true
        },
        {
          title: 'hr',
          shortcut: '',
          enabled: true,
          handler: null
        },
        {
          title: '页面设置(U)...',
          shortcut: '',
          enabled: true
        },
        {
          title: '打印(P)...',
          shortcut: 'Ctrl+P',
          enabled: true
        },
        {
          title: 'hr',
          shortcut: '',
          enabled: true,
          handler: null
        },
        {
          title: '退出(X)',
          shortcut: '',
          enabled: true
        }
      ],
      width: '202px',
      left: '0px'
    },
    { 
      title: '编辑(E)',
      menuItems: [
        {
          title: '撤销(U)',
          shortcut: 'Ctrl+Z',
          enabled: false
        },
        {
          title: 'hr',
          shortcut: '',
          enabled: true,
        },
        {
          title: '剪切(T)',
          shortcut: 'Ctrl+X',
          enabled: true
        },
        {
          title: '复制(C)',
          shortcut: 'Ctrl+C',
          enabled: false
        },
        {
          title: '粘贴(P)',
          shortcut: 'Ctrl+V',
          enabled: false
        },
        {
          title: '删除(L)',
          shortcut: 'Del',
          enabled: false
        },
        {
          title: 'hr',
          shortcut: '',
          enabled: true
        },
        {
          title: '查找(F)...',
          shortcut: 'Ctrl+F',
          enabled: false
        },
        {
          title: '替换(R)...',
          shortcut: 'Ctrl+H',
          enabled: true
        },
        {
          title: 'hr',
          enabled: true
        },
        {
          title: '全选(A)',
          shortcut: 'Ctrl+A',
          enabled: true
        }
      ],
      width: '218px',
      left: '52px'
    },
    { 
      title: '格式(O)',
      menuItems: [
        {
          title:'自动换行',
          shortcut:'',
          enabled:true
        },
        {
          title: '字体(F)...',
          shortcut: '',
          enabled: true,
          handler: function() {
            $dlgFont.show({
              family: np.fontFamily,
              style: np.fontStyle,
              size: np.fontSize,
              okHandler: np.fontHandler
            });
          }
        }
      ],
      width: '156px',
      left: '106px'
    },
    { 
      title: '查看(V)',
      menuItems: [
        {
          title: '状态栏(S)',
          shortcut: '',
          enabled: true
        }
      ],
      width: '138px',
      left: '162px'
    },
    { 
      title: '帮助(H)',
      menuItems: [
        {
          title: '关于记事本(A)',
          shortcut: '',
          enabled: true
        },
      ],
      width: '166px',
      left: '216px'
    }
  ];

  var $bar = $('<div class="notepad-menubar"></div>');
  var menuData,
      menus = [],     
      active = -1;

  function initMenuTitle() {
    var $titles = $('<ul class="menu-title"></ul>');

    for(var i=0; i<menuData.length; i++) {
      var $title = $('<li class="title"></li>');

      $title.html(menuData[i].title);
      $title.attr('data-id', i);
      $titles.append($title);

      $title.click(function(e) {
        var i = Number(this.dataset.id);

        if(active === -1) {
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else if(active !== i) {
          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else {
          menus[active].css({ display: 'none' });
          active = -1;
        }

        e.stopPropagation();
      });

      $title.hover(function() {
        if(active !== -1) {
          var i = Number(this.dataset.id);
          
          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        }
      });
    }

    $bar.append($titles);
  }

  function initMenuList() {
    for(var i=0; i<menuData.length; i++) {
      var $menus = $('<ul class="menus"></ul>'),
          items = menuData[i].menuItems;

      for(var j=0; j<items.length; j++) {
        if(items[j].title === 'hr') {
          var $hr = $('<li class="menu-hr"></li>');
          $menus.append($hr);
          continue;
        }

        var $menu = $('<li class="menu-item"></li>');

        $menu.html(items[j].title);
        $menu.attr('data-x', i);
        $menu.attr('data-y', j);

        if(items[j].shortcut !== '') {
          var $shorcut = $('<span class="shortcut"></span>');

          $shorcut.html(items[j].shortcut);
          $menu.append($shorcut);
        }

        $menus.append($menu);

        $menu.click(function(e) {
          e.stopPropagation();

          if($(this).hasClass('disabled')) return;

          var i = this.dataset.x, j = this.dataset.y;

          menus[i].css({display: 'none'});
          active = -1;

          menuData[i].menuItems[j].handler();
        });
      }

      $menus.css({
        width: menuData[i].width,
        left: menuData[i].left,
        display: 'none'
      });

      $bar.append($menus);
      menus.push($menus);
    }
  }

  function hideMenu() {
    if(active === -1) return;
    menus[active].css({display: 'none'});
    active = -1;
  }

  function init() {
    initMenuTitle();
    initMenuList();

    $('body').append($bar);
  }

  function show(data) {
    menuData = data;
    init();
  }

  return {
    show: show,
    hideMenu: hideMenu
  };
}());
