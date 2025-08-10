jQuery(function($) {
  var $tip = $('.hover-full-text');
  if (!$tip.length) {
    $tip = $('<div class="hover-full-text"></div>').appendTo('body').hide();
  }

  var hideTimer = null;

  function placeTip($el) {
    var offset = $el.offset();
    var spacing = 8;
    var tipH = $tip.outerHeight();
    var tipW = $tip.outerWidth();
    var vpTop = $(window).scrollTop();
    var vpBottom = vpTop + $(window).height();
    var vpLeft = $(window).scrollLeft();
    var vpRight = vpLeft + $(window).width();

    // 优先显示在下方
    var placedBottom = true;
    var top = offset.top + $el.outerHeight() + spacing;
    if (top + tipH > vpBottom) {
      // 下方空间不足时显示在上方
      top = offset.top - tipH - spacing;
      placedBottom = false;
      if (top < vpTop) top = vpTop + spacing; // 兜底
    }

    var left = offset.left;
    if (left + tipW > vpRight) {
      left = vpRight - tipW - spacing;
    }
    if (left < vpLeft + spacing) left = vpLeft + spacing;

    $tip.css({ top: top, left: left });
    $tip.toggleClass('pos-bottom', placedBottom).toggleClass('pos-top', !placedBottom);
  }

  $(document).on('mouseenter', '.xe-comment p.overflowClip_1, .site-description', function() {
    var $this = $(this);
    var text = $.trim($this.text());
    if (!text) return;
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

    $tip.stop(true, true).text(text).show();
    placeTip($this);
    // 强制一次重绘，确保过渡生效
    void $tip[0].offsetWidth;
    // 渐入
    requestAnimationFrame(function(){
      $tip.addClass('is-visible');
    });
  });

  $(document).on('mousemove', '.xe-comment p.overflowClip_1, .site-description', function() {
    placeTip($(this));
  });

  $(document).on('mouseleave', '.xe-comment p.overflowClip_1, .site-description', function() {
    $tip.removeClass('is-visible');
    hideTimer = setTimeout(function(){ $tip.hide(); }, 350);
  });
});


