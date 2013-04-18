(function (WIN) {
    // var service = 'http://192.168.7.92:3000/pusherror/'
    var service = 'http://cat.qa.dianpingoa.com/cat/r/jsError'
    WIN.onerror = function (errorMsg, fileUrl, lineNumber) {
        var e = encodeURIComponent,
        timestamp = Date.now()
        ;(new Image()).src = service +
            '?error=' + e(errorMsg) +
            '&file=' + e(fileUrl) +
            '&line=' + e(lineNumber) +
            '&timestamp=' + timestamp
    }
})(window)

