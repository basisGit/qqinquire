(function (win) {
    let doc = win.document, docEl = doc.documentElement, timer = null;
    function refreshRem() {
      
        let width = docEl.getBoundingClientRect().width;    
        if (width > 750) {
            docEl.style.fontSize =  '100px';
        }else{
            var rem = width / 3.75;
            docEl.style.fontSize = rem + 'px';
        }
    }
    
    win.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout( refreshRem , 300);
    }, false);
    
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(refreshRem, 300);
        }
    }, false);
    
    refreshRem();
    
})(window);