
let stack = {"main": null, "back": []};

function toggleSidebar(){
  if($('.sidebar').width() == 0){
    $('.sidebar').width(250);
  }
  else {
    $('.sidebar').width(0);
  }
}

function loadMainData(){
  if(stack.main){
    $('#loader-modal').modal('toggle')
    appendMainData(stack.main)
    console.log(stack.main)
  }else{
    core.getData('http://139.59.66.232:3000/', function(data){
      //console.log(data)
      $('#loader-modal').modal('toggle')
      if(data.err === null){
        stack.main = data.body
        appendMainData(data.body)
        console.log(data.body)
      }else {
        loadErrorPage()
      }
    })
  }
}

function watchMovie(data){
  $('#loader-modal').modal('toggle')
  $.post('http://139.59.66.232:3000/watch-movie', {"movie-url":data}, function(success){
    console.log(success)
    $(window).scrollTop(0)
    if(success.err === null){
      $('#loader-modal').modal('toggle')
      var data = success.body
      loadMovieData(data)
      for(var i=0;i<data[0].meta.genre.length;i++)
      $('.genre-contain').append(`
        <span class="genre-item">`+data[0].meta.genre[i]+`</span>
      `)
    }
      //window.location.href = 'file://'+__dirname+'/watch.html?q='+JSON.stringify(success.body);
    else {
      loadErrorPage()
    }
  })
}

function playMovie(data){
  $('#loader-modal').modal('toggle')
  $.post('http://139.59.66.232:3000/play-movie', {"movie-url":data}, function(success){
    $('#loader-modal').modal('toggle')
    $('title').text('Watching... '+''+' - TamaSha')
    success = JSON.parse(success)
    var data = success.data

    $('#main').remove();
    $('#similar-movies').remove();
    $("#mv-info").remove();

    $('body').append(`<iframe src="http://`+data+`" allowfullscreen noborder width="100%" id="player"></iframe>`)
    //window.location.href = 'file://'+__dirname+'/play.html?q='+success.data;
    core.iframe()
  })
}

function goBack(data){
  $('#loader-modal').modal('toggle');
  switch(data){
    case 'main':
      emptyBody('watch')
      loadMainData()
      break;
    case 'search':
      emptyBody('search')
      loadMainData()
  }
}

var id;

function appendMainData(data){
  $('title').text('TamaSha | Watch Movies Online')
  id = setInterval(function(){next()}, 6000);
  for(var i=0;i<data.top_data.length;i++){
    $("#main .wraper").append(`
        <div class="slider-item" style="background:url('`+data.top_data[i].top_banner+`');background-size:cover;">
          <div class="inner">
            <h3 class="text-center tit">`+data.top_data[i].top_name+`</h3>
            <p class="text-center des">`+data.top_data[i].top_des+`</p>
            <p class="text-center"><button type="button" class="btn watch-btn" onclick="watchMovie('`+data.top_data[i].top_link+`')">Watch Now</button></p>
          </div>
          <button type="button" class="btn nav-btn next-button" onclick="next()"><i class="fa fa-chevron-right fa-fw"></i></button>
          <button type="button" class="btn nav-btn back-button" onclick="prev()"><i class="fa fa-chevron-left fa-fw"></i></button>

        </div>
    `)
  }
  $('.wraper .slider-item:first-child').addClass('Visible')

  $('#main .sub-content').append('<h3 class="heading">Recently Added</h3><br><div class="row r1"></div>')

  for(var i=0;i<12;i++){
    $('#main .r1').append(`
      <div class="col-xs-6 col-md-2 col-sm-3">
        <div class="movie-card" onclick="watchMovie('`+data.content[i].watch+`')">
          <span class="movie-meta">`+data.content[i].meta+`</span>
          <img class="img-responsive thumbnail" src="`+data.content[i].thumbnail+`">
          <div class="title-wrap">
            <span class="text-center movie-title">`+data.content[i].name+`</span>
          </div>
        </div>
      </div>`
    )
  }

  $('#main .sub-content').append('<br><h3 class="heading">Most Watched</h3><br><div class="row r2"></div>')
  for(var i=12;i<24;i++){
    $('#main .r2').append(`
      <div class="col-xs-6 col-md-2 col-sm-3">
        <div class="movie-card" onclick="watchMovie('`+data.content[i].watch+`')">
          <span class="movie-meta">`+data.content[i].meta+`</span>
          <img class="img-responsive thumbnail" src="`+data.content[i].thumbnail+`">
          <div class="title-wrap">
            <span class="text-center movie-title">`+data.content[i].name+`</span>
          </div>
        </div>
      </div>`
    )
  }
}

function loadMovieData(data){
  $('title').text('Watch '+data[0]['movie-title']+' - TamaSha')
  $('.back').append(`<i class="fa fa-arrow-left back-icon" onclick="goBack('main')"></i`)
  $('.bars').css('left','60px');
  $('#main').empty();
  $('#similar-movies').remove()
  $('#mv-info').remove()
  $('br').remove()
  $('#main').removeClass('container');
  $('#main').addClass('container-fluid');
  $('#main').append(`<div class="banner">
    <p class="play-link" onclick="playMovie('`+data[0]['play-link']+`')"><img class="img-responsive" src="`+data[0]['movie-banner']+`"></a></p>
    <p class="text-center play-icon"><i class="fa fa-play-circle"></i></p>
  </div>`);
  $('.container-fluid').after(`<br>

  <div class="container" id="mv-info">
    <div class="movie-info">
      <div class="row">
        <div class="col-xs-2">
          <img class="img-responsive thumb" src="`+data[0].meta.thumb+`">
        </div>
        <div class="col-xs-10">
          <h2 class="mv-title">`+data[0]['movie-title']+`</h2>
          <br>
          <p>`+data[0]['movie-des']+`</p><br>
          <div class="col-xs-6">
            <span>Director :  `+data[0].meta.director+`</span><br>
            <span>Country :  `+data[0].meta.country+`</span><br>
            <span class="genre-contain">Genre :  </span><br>
            </div>
          <div class="col-xs-6">
            Quality :  <span class="quality">`+data[0].meta.quality+`</span><br><br>
            <span class="imdb">IMDB :  `+data[0].meta.imdb+`</span><br><br>
          </div>
        </div>
      </div>
    </div><br>
  </div><br><br>
  <div class="container-fluid" id="similar-movies">
    <h3 style="color: white;">You may also like </h3>
    <div class="row"></div>
  </div>
  `)

  for(var i=0;i<data[0]['similar-movies'].length;i++){
    $('#similar-movies .row').append(`
      <div class="col-xs-6 col-md-2 col-sm-3">
        <div class="movie-card" onclick="watchMovie('`+data[0]['similar-movies'][i].watch+`')">
          <span class="movie-meta">`+data[0]['similar-movies'][i].meta+`</span>
          <img class="img-responsive thumbnail" src="`+data[0]['similar-movies'][i].thumbnail+`">
          <div class="title-wrap">
            <span class="text-center movie-title">`+data[0]['similar-movies'][i].name+`</span>
          </div>
        </div>
      </div>`
    )
  }
}

function appendSearchData(data){
  for(var i=0;i<data.length;i++){
    $('#main .row').append(`
      <div class="col-xs-6 col-md-2 col-sm-3">
        <div class="movie-card" onclick="watchMovie('`+data[i].watch+`')">
          <span class="movie-meta">`+data[i].meta+`</span>
          <img class="img-responsive thumbnail" src="`+data[i].thumbnail+`">
          <div class="title-wrap">
            <span class="text-center movie-title">`+data[i].name+`</span>
          </div>
        </div>
      </div>`
    )
  }
}

function emptyBody(data){
  switch(data){
    case 'watch':
      $('.back-icon').remove()
      $('.bars').css('left', '15px')
      $('.container').remove()
      $('#similar-movies').remove();
      $('#main').empty()
      $('br').remove();
      clearInterval(id);
      $('#main').append(`<div class="wraper"></div>
      <div class="sub-content"></div>`)
      break;
    case 'search':
      $('.back-icon').remove()
      $('#main').empty();
      $$('#main').append(`<div class="wraper"></div>
      <div class="sub-content"></div>`)
      $('.bars').css('left', '15px')
      $('.container h3').remove()
  }
}
var iterator = 1;
function next(){
  if(iterator < 10){
    $('.slider-item:nth-child('+iterator+')').removeClass('Visible')
    iterator++;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
  }else{
    $('.slider-item:nth-child('+iterator+')').removeClass('Visible')
    iterator=1;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
  }
}

function prev(){
  if(iterator > 1){
    $('.slider-item:nth-child('+iterator+')').removeClass('Visible')
    iterator--;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
  }else{
    $('.slider-item:nth-child('+iterator+')').removeClass('Visible')
    iterator=10;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
  }
}
