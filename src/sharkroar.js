(function () {

    var config = {
        service: 'http://example.com/jserror.gif',
        percent: 100
    },
    sharkRoar = [];

    if (Math.random() > config.percent / 100) {
        return
    }

    function addLoadListener(fn) {
        if (typeof window.addEventListener !== 'undefined') {
            window.addEventListener('load', fn, false);
        }
        else if (typeof document.addEventListener !== 'undefined') {
            document.addEventListener('load', fn, false);
        }
        else if (typeof window.attachEvent !== 'undefined') {
            window.attachEvent('onload', fn);
        }
        else {
            var oldfn = window.onload;
            if (typeof window.onload !== 'function') {
                window.onload = fn;
            }
            else {
                window.onload = function () {
                    oldfn();
                    fn();
                };
            }
        }
    }

    function sendError(errorMsg, fileUrl, lineNumber) {
        var e = encodeURIComponent,
        timestamp = Date.now();
        (new Image()).src = config.service + '?error=' + e(errorMsg) + '&file=' + e(fileUrl) + '&line=' + e(lineNumber) + '&timestamp=' + timestamp
    }

    window.onerror = function (errorMsg, fileUrl, lineNumber) {
        sharkRoar.push(errorMsg, fileUrl, lineNumber)
    }

    addLoadListener(function () {
        var _sharkRoar = sharkRoar
        sharkRoar = {
            push: sendError
        }
        for (var i = 0, len = _sharkRoar.length; i < len; i = i + 3) {
            sharkRoar.push(_sharkRoar[i], _sharkRoar[i + 1], _sharkRoar[i + 2])
        }
    })

})()

