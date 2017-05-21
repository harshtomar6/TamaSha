var http = require('http')
var remote = require('electron').remote

let data = {
  'err': null,
  'body': null
}

module.exports.getData = function(url, callback){
  var req = http.get(url, function(res){
    var bodyChunks = [];

    res.on('data', function(chunk){
      bodyChunks.push(chunk)
    }).on('end', function(){
      var body = Buffer.concat(bodyChunks).toString();
      body = JSON.parse(body);

      data.err = body.err;
      data.body = body.body;

      //console.log(data)
      callback(data)
    })
  })

  req.on('error', function(e){
    data.err = e;
  })
}

module.exports.iframe = function(){
  /*$("iframe").each(function () {
          //Using closures to capture each one
    var iframe = $(this);
    console.log(iframe.contents())
    iframe.on("load", function () {
       //Make sure it is fully loaded
      iframe.contents().click(function (event) {
        iframe.trigger("click");
      });
    });

    iframe.click(function () {
              //Handle what you need it to do
      console.log(remote.getCurrentWindow())
    });
  });*/

  console.log($('#player').contents())

  /*var frame = document.getElementById('player')
  var d = frame.contentDocument
  console.log(d)
  d.addEventListener('DOMSubtreeModified', function () {
		  console.log('changed');
		  $('div[style]').one(function(){
        console.log($(this));
      })
	}, false);*/
}
