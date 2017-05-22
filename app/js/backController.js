function goBack(){
  $('#loader-modal').modal('toggle');
  remove()
  console.log("Before " + stack.method)
  var method = stack.method[stack.method.length-2];
  stack.method.splice(stack.method.length-2, 1)
  appendFunction[method](stack.data[stack.data.length-2])
  stack.data.splice(stack.data.length-2, 1)
  $('.sidebar ul li').removeClass('active')
  $('.sidebar ul li:first-child').addClass('active')
}

var appendFunction = {
  main : function(data){
    clearInterval(id);
    $('#loader-modal').modal('toggle')
    $('body').append(`<div class="container-fluid" id="main">
      <div class="wraper"></div>
      <div class="sub-content"></div>
    </div>`)
    appendMainData(stack.main)
    sidebar.checkVisible()
  },
  watchMovie: function(data){
    $(window).scrollTop(0)
    $('#loader-modal').modal('toggle')
    loadMovieData(data)
    for(var i=0;i<data[0].meta.genre.length;i++)
    $('.genre-contain').append(`
      <span class="genre-item">`+data[0].meta.genre[i]+`</span>
    `)
    sidebar.checkVisible()
  },
  searchMovie: function(data){
    $('#loader-modal').modal('toggle')
    $('.back').append(`<i class="fa fa-arrow-left icon back-icon" onclick="goBack('search')"></i`)
    $('.bars').css('left','60px');
    remove()
    $('body').append(`<div class="container-fluid mv-info" id="main">
          <h3 style="color: white">Search Results for "`+query+`"</h3>
         <div class="row"></div>
       </div>`)
    appendSearchData(data)
    sidebar.checkVisible()
  }
}
