(function () {
    var config = {
        service: 'http://example.com/jserror.gif',
        percent: 0.1   
    }
    if (Math.random() < config.percent) {
        window.onerror = function (errorMsg, fileUrl, lineNumber) {
            var e = encodeURIComponent,
            timestamp = Date.now();
            (new Image()).src = service +
                '?error=' + e(errorMsg) +
                '&file=' + e(fileUrl) +
                '&line=' + e(lineNumber) +
                '&timestamp=' + timestamp
        }
    }
})()

