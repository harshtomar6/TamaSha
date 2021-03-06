
let stack = {
  "main": {"home": null, "movies": null, "tv": null},
  "method": [],
  "data": []
};
var iterator = 1, id;

function loadMainData(){
  clearInterval(id)
  $(window).scrollTop(0)
  $('#loader-modal').modal({backdrop: 'static', keyboard: false, show: true})
  if(stack.main.home){
    $('#loader-modal').modal('toggle')
    remove()
    $('.sidebar').after(`
      <div class="container-fluid" id="main">
        <div class="wraper"></div>
        <div class="navigation"></div>
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
      console.log(data)
      loadMovieData(data)
      for(var i=0;i<data.content[0].meta.genre.length;i++)
      $('.genre-contain').append(`
        <span class="genre-item">`+data.content[0].meta.genre[i]+`</span>
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

    $('body').append(`<div class="container-fluid" style="padding: 0">
        <iframe src="http://`+data+`" allowfullscreen noborder width="100%" id="player"></iframe>
      </div>`)
    //window.location.href = 'file://'+__dirname+'/play.html?q='+success.data;
    core.iframe()
    sidebar.checkVisible()
  })
}

function appendMainData(data){
  $('title').text('TamaSha | Watch Movies Online')
  iterator=1;
  id = setInterval(function(){next()}, 6000);
  for(var i=0;i<data.top_data.length;i++){
    $("#main .wraper").append(sliderComponent(data, i))
  }
  $('.wraper .slider-item').removeClass('Visible')
  $('.wraper .slider-item:first-child').addClass('Visible')
  $('#main .navigation').append(tabComponent());
  $('#main .sub-content').append('<div class="row"></div>')
  for(var i=0;i<24;i++){
    $('#main .sub-content .row').append(rowComponent(data, i))
  }
  var len = $('.meta h5').text().length
  console.log("len = "+len);
}

function loadMovieData(data){
  $('title').text('Watch '+data.content[0]['movie-title']+' - TamaSha')
  $('.back').append(`<i class="fa fa-arrow-left icon back-icon" onclick="goBack('main')"></i`)
  $('.bars').css('left','60px');
  $('br').remove()
  remove()
  $('body').append('<div class="container-fluid" id="main"></div>')
  $('#main').append(bannerComponent(data));
  $('.container-fluid').after(movieInfoComponent(data))

  for(var i=0;i<data.episodes.length;i++)
    $('.episodes-info').append(episodeInfoComponent(data, i))

  for(var i=0;i<data.content[0]['similar-movies'].length;i++){
    $('#similar-movies .row').append(similarMoviesComponent(data, i))
  }
}

function appendSearchData(data){
  for(var i=0;i<data.length;i++){
    $('#main .row').append(searchRowComponent(data, i))
  }
}

function appendSideBarData(data){
  for(var i=0;i<data.length;i++){
    $('#main .sub .row').append(searchRowComponent(data, i))
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
    $('.below p span:nth-child('+iterator+')').removeClass('active')
    iterator++;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
    $('.below p span:nth-child('+iterator+')').addClass('active')
  }else{
    $('.slider-item:nth-child('+iterator+')').removeClass('Visible')
    $('.below p span:nth-child('+iterator+')').removeClass('active')
    iterator=1;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
    $('.below p span:nth-child('+iterator+')').addClass('active')
  }
}

function prev(){
  if(iterator > 1){
    $('.slider-item:nth-child('+iterator+')').removeClass('Visible')
    $('.below p span:nth-child('+iterator+')').removeClass('active')
    iterator--;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
    $('.below p span:nth-child('+iterator+')').addClass('active')
  }else{
    $('.slider-item:nth-child('+iterator+')').removeClass('Visible')
    $('.below p span:nth-child('+iterator+')').removeClass('active')
    iterator=10;
    $('.slider-item:nth-child('+iterator+')').addClass('Visible')
    $('.below p span:nth-child('+iterator+')').addClass('active')
  }
}

function getDate(date){
  date = date.split('-');
  var num = date[1]

  var month = "";

  switch(num){
    case '01':
      month = 'Jan';
      break;
    case '02':
      month = 'Feb';
      break;
    case '03':
      month = 'March';
      break;
    case '04':
      month = 'April';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'June';
      break;
    case '07':
      month = 'July';
      break;
    case '08':
      month = 'Aug';
      break;
    case '09':
      month = 'Sep';
      break;
    case '10':
      month = 'Oct';
      break;
    case '11':
      month = 'Nov';
      break;
    case '12':
      month = 'Dec';
      break;
  }

  return date[2] + " "+month+" "+date[0];
}
