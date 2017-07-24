var sliderComponent = function(data, i){
  return `<div class="slider-item" style="background:url('`+data.top_data[i].top_banner+`');background-size:cover;">
    <div class="inner">
      <h3 class="text-center tit">`+data.top_data[i].top_name+`</h3>
      <p class="text-center des">`+data.top_data[i].top_des+`</p>
      <p class="text-center"><button type="button" class="btn watch-btn" onclick="watchMovie('`+data.top_data[i].top_link+`')">Watch Now</button></p>
    </div>
    <button type="button" class="btn nav-btn next-button" onclick="next()"><i class="fa fa-chevron-right fa-fw"></i></button>
    <button type="button" class="btn nav-btn back-button" onclick="prev()"><i class="fa fa-chevron-left fa-fw"></i></button>
    <div class="below">
      <p class="text-center">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </p>
    </div>
  </div>`
}

var headingComponent = function(data, clas){
  return '<h3 class="heading">'+data+'</h3><br><div class="row '+clas+'"></div>'
}

var tabComponent = function(){
  return `
    <div class="row tab-list">
      <div class="col-xs-3 tab active">
        <h4 class="text-center">Recommended</h4>
      </div>
      <div class="col-xs-3 tab">
        <h4 class="text-center">Recently Added</h4>
      </div>
      <div class="col-xs-3 tab">
        <h4 class="text-center">Most Watched</h4>
      </div>
      <div class="col-xs-3 tab">
        <h4 class="text-center">Requested</h4>
      </div>
    </div>
  `
}

var allTabComponent = function(){
  return `
  <div class="row tab-list">
    <div class="col-xs-4 tab active">
      <h4 class="text-center">HD Movies</h4>
    </div>
    <div class="col-xs-4 tab">
      <h4 class="text-center">SD Movies</h4>
    </div>
    <div class="col-xs-4 tab">
      <h4 class="text-center">CAM Movies</h4>
    </div>
  </div>
  `
}

var rowComponent = function(data, i){
  var len = data.content[i].name.length;

  if(len <= 18)
    return `
      <div class="col-xs-6 col-md-2 col-sm-3 wrap">
        <div class="movie-card" onclick="watchMovie('`+data.content[i].watch+`')">
          <div class="thumb-div">
            <img class="img-responsive thumb" src="`+data.content[i].thumbnail+`">
          </div>
          <div class="meta">
            <h5>`+data.content[i].name+`</h5>
            <span>`+data.content[i].meta.episode+`</span>
            <span>2017</span>
          </div>

        </div>
      </div>`
    else{
      var name = data.content[i].name.substr(0, 15)+'...';

      return `
        <div class="col-xs-6 col-md-2 col-sm-3 wrap">
          <div class="movie-card" onclick="watchMovie('`+data.content[i].watch+`')">
            <div class="thumb-div">
              <img class="img-responsive thumb" src="`+data.content[i].thumbnail+`">
            </div>
            <div class="meta">
              <h5>`+name+`</h5>
              <span>`+data.content[i].meta.episode+`</span>
              <span>2017</span>
            </div>
          </div>
        </div>`
    }
}

var bannerComponent = function(data){
  return `<div class="banner" style="background: url('`+data.content[0]['movie-banner']+`');background-size:cover;">
    <p class="text-center play-icon" onclick="playMovie('`+data.content[0]['play-link']+`')"><i class="fa fa-play-circle"></i></p>
  </div>`
}

var movieInfoComponent = function(data){
  return `<br>

  <div class="container-fluid mv-info" id="mv-info">
    <div class="movie-info">
      <div class="row">
        <div class="col-xs-2">
          <img class="img-responsive thumb" src="`+data.content[0].meta.thumb+`"><br><br>
        </div>
        <div class="col-xs-10">
          <h2 class="mv-title">`+data.content[0]['movie-title']+`</h2>
          <br>
          <p>`+data.content[0]['movie-des']+`</p><br>
          <div class="col-xs-6">
            <span>Director :  `+data.content[0].meta.director+`</span><br>
            <span>Country :  `+data.content[0].meta.country+`</span><br>
            <span class="genre-contain">Genre :  </span><br>
            <span>Release : `+getDate(data.content[0].meta.release)+`</span>
          </div>
          <div class="col-xs-6">
            Quality :  <span class="quality">`+data.content[0].meta.quality+`</span><br><br>
            <span class="imdb">IMDB :  `+data.content[0].meta.imdb+`</span><br><br>
          </div><br>
          <div class="episodes-info">
          </div>
        </div>
      </div>
    </div><br>
  </div><br>
  <div class="container-fluid" id="similar-movies">
    <h3 style="color: white;">You may also like </h3>
    <div class="row"></div>
  </div>`;
}

var episodeInfoComponent = function(data, i){
  return `
    <button type="button" class="btn episode-btn" onclick="playMovie('`+data.episodes[i].links+`')">`+
      data.episodes[i].episodes
    +`</button>
  `
}

var similarMoviesComponent = function(data, i){
  var len = data.content[0]['similar-movies'][i].name.length;

  if(len <= 18)
    return `
      <div class="col-xs-6 col-md-2 col-sm-3 wrap">
        <div class="movie-card" onclick="watchMovie('`+data.content[0]['similar-movies'][i].watch+`')">
          <div class="thumb-div">
            <img class="img-responsive thumb" src="`+data.content[0]['similar-movies'][i].thumbnail+`">
          </div>
          <div class="meta">
            <h5>`+data.content[0]['similar-movies'][i].name+`</h5>
            <span>`+data.content[0]['similar-movies'][i].meta.episode+`</span>
            <span>2017</span>
          </div>
        </div>
      </div>`
    else{
      var name = data.content[0]['similar-movies'][i].name.substr(0, 15)+'...';

      return `
        <div class="col-xs-6 col-md-2 col-sm-3 wrap">
          <div class="movie-card" onclick="watchMovie('`+data.content[0]['similar-movies'][i].watch+`')">
            <div class="thumb-div">
              <img class="img-responsive thumb" src="`+data.content[0]['similar-movies'][i].thumbnail+`">
            </div>
            <div class="meta">
              <h5>`+name+`</h5>
              <span>`+data.content[0]['similar-movies'][i].meta.episode+`</span>
              <span>2017</span>
            </div>
          </div>
        </div>`
    }
}

var searchRowComponent = function(data, i){
  var len = data[i].name.length;

  if(len <= 18)
    return `
      <div class="col-xs-6 col-md-2 col-sm-3 wrap">
        <div class="movie-card" onclick="watchMovie('`+data[i].watch+`')">
          <!--<span class="movie-meta">`+data[i].meta+`</span>-->
          <div class="thumb-div">
            <img class="img-responsive thumb" src="`+data[i].thumbnail+`">
          </div>
          <div class="meta">
            <h5>`+data[i].name+`</h5>
            <span>`+data[i].meta+`</span>
            <span>2017</span>
          </div>
        </div>
      </div>`
    else{
      var name = data[i].name.substr(0, 15)+'...';

      return `
        <div class="col-xs-6 col-md-2 col-sm-3 wrap">
          <div class="movie-card" onclick="watchMovie('`+data[i].watch+`')">
            <div class="thumb-div">
              <img class="img-responsive thumb" src="`+data[i].thumbnail+`">
            </div>
            <div class="meta">
              <h5>`+name+`</h5>
              <span>`+data[i].meta+`</span>
              <span>2017</span>
            </div>
          </div>
        </div>`
    }
}

var paginationComponent = function(){
  return `
      <ul>
        <li class="text-center current">1</li>
        <li class="text-center">2</li>
        <li class="text-center">3</li>
        <li class="text-center">Next</li>
        <li class="text-center">Last</li>
      </ul>
  `
}
