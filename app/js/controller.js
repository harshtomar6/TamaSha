
let stack = {
  "main": {"home": null, "movies": null, "tv": null},
  "method": [],
  "data": []
};
var iterator = 1, id;

function loadMainData(){
  clearInterval(id)
  $('#loader-modal').modal({backdrop: 'static', keyboard: false, show: true})
  if(stack.main.home){
    $('#loader-modal').modal('toggle')
    remove()
    $('body').append(`
      <div class="container-fluid" id="main">
        <div class="wraper"></div>
        <div class="sub-content"></div>
      </div>
    `)
    appendMainData(stack.main.home)
    console.log(stack.main)
    sidebar.checkVisible()
  }else{
    core.getData('http://localhost:3000/', function(data){
      //console.log(data)
      $('#loader-modal').modal('toggle')
      if(data.err === null){
        stack.main.home = data.body
        stack.data.push(data.body)
        stack.method.push('main')
        appendMainData(data.body)
        console.log(data.body)
        sidebar.checkVisible()
      }else {
        loadErrorPage()
      }
    })
  }
}

function watchMovie(data){
  $('#loader-modal').modal('toggle')
  $.post('http://localhost:3000/watch-movie', {"movie-url":data}, function(success){
    console.log(success)
    $(window).scrollTop(0)
    if(success.err === null){
      $('#loader-modal').modal('toggle')
      var data = success.body
      stack.data.push(data)
      stack.method.push('watchMovie')
      loadMovieData(data)
      for(var i=0;i<data[0].meta.genre.length;i++)
      $('.genre-contain').append(`
        <span class="genre-item">`+data[0].meta.genre[i]+`</span>
      `)
      sidebar.checkVisible()
    }
      //window.location.href = 'file://'+__dirname+'/watch.html?q='+JSON.stringify(success.body);
    else {
      loadErrorPage()
    }
  })
}

function playMovie(data){
  $('#loader-modal').modal('toggle')
  $.post('http://localhost:3000/play-movie', {"movie-url":data}, function(success){
    $('#loader-modal').modal('toggle')
    $('title').text('Watching... '+''+' - TamaSha')
    success = JSON.parse(success)
    var data = success.data
    stack.data.push(data)
    stack.method.push('play')
    remove()

    $('body').append(`<iframe src="http://`+data+`" allowfullscreen noborder width="100%" id="player"></iframe>`)
    //window.location.href = 'file://'+__dirname+'/play.html?q='+success.data;
    core.iframe()
    sidebar.checkVisible()
  })
}

function appendMainData(data){
  $('title').text('TamaSha | Watch Movies Online')
  id = setInterval(function(){next()}, 6000);
  for(var i=0;i<data.top_data.length;i++){
    $("#main .wraper").append(sliderComponent(data, i))
  }
  $('.wraper .slider-item:first-child').addClass('Visible')

  $('#main .sub-content').append(headingComponent('Recently Added', 'r1'))

  for(var i=0;i<12;i++){
    $('#main .r1').append(rowComponent(data, i))
  }

  $('#main .sub-content').append('<br>'+headingComponent('Most Watched', 'r2'))
  for(var i=12;i<24;i++){
    $('#main .r2').append(rowComponent(data, i))
  }
}

function loadMovieData(data){
  $('title').text('Watch '+data[0]['movie-title']+' - TamaSha')
  $('.back').append(`<i class="fa fa-arrow-left icon back-icon" onclick="goBack('main')"></i`)
  $('.bars').css('left','60px');
  $('br').remove()
  remove()
  $('body').append('<div class="container-fluid" id="main"></div>')
  $('#main').append(bannerComponent(data));
  $('.container-fluid').after(movieInfoComponent(data))

  for(var i=0;i<data[0]['similar-movies'].length;i++){
    $('#similar-movies .row').append(similarMoviesComponent(data, i))
  }
}

function appendSearchData(data){
  for(var i=0;i<data.length;i++){
    $('#main .row').append(searchRowComponent(data, i))
  }
}

function remove(){
  $('.container-fluid').remove();
  $('#player').remove()
  $('br').remove()
}

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
