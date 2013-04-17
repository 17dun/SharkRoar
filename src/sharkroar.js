(function (WIN) {
    var service = 'http://192.168.7.92:3000/pusherror/'
    WIN.onerror = function (errorMsg, fileUrl, lineNumber) {
        var e = encodeURIComponent,
        timestamp = Date.now()
        (new Image()).src = service +
            '?e=' + e(errorMsg) +
            '&f=' + e(fileUrl) +
            '&l=' + e(lineNumber) +
            '&t=' + timestamp
    }
})(window)

