var http = require('http')

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
