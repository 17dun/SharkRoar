(function (WIN) {
    var service
    service = 'http://example.com/jserror.gif'
    WIN.onerror = function (errorMsg, fileUrl, lineNumber) {
        var e = encodeURIComponent,
        timestamp = Date.now();
        (new Image()).src = service +
            '?error=' + e(errorMsg) +
            '&file=' + e(fileUrl) +
            '&line=' + e(lineNumber) +
            '&timestamp=' + timestamp
    }
})(window)

