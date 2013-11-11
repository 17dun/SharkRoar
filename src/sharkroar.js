(function() {
  var GIF_NAME = 'servive.gif'

  var config = {
    service: 'http://example.com',
    percent: 100
  }

  config.service = config.service + '/' + GIF_NAME
  var SharkRoar = {
    push: function () {
      this.__errors.push.apply(this.__errors, arguments)
    },
    start: function (mark) {
      if (this.__marks[mark]) return
      this.__marks[mark] = this.__timestamp()
    },
    done: function (mark) {
      this.__done[mark] = this.__timestamp()
      this.__cache.push(mark, this.__done[mark] - this.__marks[mark])
    },
    __errors:[],
    __marks: {},
    __done: {}
    __cache: [],
    __timestamp: function () {
      return (new Date).valueOf();
    }
  }

  if (Math.random() > config.percent / 100) {
    return
  }

  function addLoadListener(fn) {
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('load', fn, false);
    } else if (typeof document.addEventListener !== 'undefined') {
      document.addEventListener('load', fn, false);
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onload', fn);
    } else {
      var oldfn = window.onload;
      if (typeof window.onload !== 'function') {
        window.onload = fn;
      } else {
        window.onload = function() {
          oldfn();
          fn();
        };
      }
    }
  }

  function sendMark(mark, interval) {
    var e = encodeURIComponent,
      timestamp = Date.now();
    (new Image()).src = config.service + '?type=mark&mark=' + e(mark) + '&interval=' + e(interval) + '&timestamp' + timestamp
  }

  function sendError(errorMsg, fileUrl, lineNumber) {
    var e = encodeURIComponent,
    (new Image()).src = config.service + '?type=error&error=' + e(errorMsg) + '&file=' + e(fileUrl) + '&line=' + e(lineNumber) + '&timestamp=' + timestamp
  }

  window.onerror = function(errorMsg, fileUrl, lineNumber) {
    SharkRoar.push(errorMsg, fileUrl, lineNumber)
  }

  addLoadListener(function() {
    var __errors = SharkRoar.__errors,
    __cache = SharkRoar.__cache
    SharkRoar.push = sendError
    for (var i = 0, len = __errors.length; i < len; i = i + 3) {
      SharkRoar.push(__errors[i], __errors[i + 1], __errors[i + 2])
    }
    SharkRoar.done = sendMark
    for (var i = 0, len = __cache.length; i < len; i = i + 2) {
      SharkRoar.done(__cache[i], __cache[i + 1])
    }
  })

})()
