
var sidebar = {
  "visible": false,

  checkVisible: function(){
    if(this.visible){
      $('.sidebar').width(250);
      $('.container-fluid').css('margin-left', '250px')
      //$('iframe').css('margin-left', '250px')
    }else{
      $('.sidebar').width(0);
      $('.container-fluid').css('margin-left', '0px')
      $('iframe').css('margin-left', '0px')
    }
  },

  getAllMovies: function(url, sw){
    $('#loader-modal').modal('toggle')
    $(window).scrollTop(0)
    if(stack.main.movies && sw==0){
      $('#loader-modal').modal('toggle')
      remove()
      $('body').append(`<div class="container-fluid mv-info" id="main">
           <div class="navigation"></div>
           <div class="sub"><div class="row"></div></div><br>
           <div class="pagination"></div>
      </div>`)
      $('#main .navigation').append(allTabComponent())
      appendSideBarData(stack.main.movies)
      $('.pagination').append(paginationComponent)
      this.checkVisible()
    }else{
      $.get(url, function(success){
        $('#loader-modal').modal('toggle')
        remove()
        $('body').append(`<div class="container-fluid mv-info" id="main">
             <div class="navigation"></div>
             <div class="sub"><div class="row"></div></div><br>
             <div class="pagination"></div>
           </div>`)
        stack.main.movies = success.body
        $('#main .navigation').append(allTabComponent())
        appendSideBarData(success.body)
        $('.pagination').append(paginationComponent)
        sidebar.checkVisible()
      })
    }
  },

  getTv: function(url, sw){
    $('#loader-modal').modal('toggle')
    $(window).scrollTop(0)
    if(stack.main.tv && sw==0){
      $('#loader-modal').modal('toggle')
      remove()
      $('body').append(`<div class="container-fluid mv-info" id="main">
            <h3 style="color: white">TV Series</h3>
           <div class="row"></div><br>
           <div class="pagination"></div>
      </div>`)
      appendSearchData(stack.main.tv)
      $('.pagination').append(paginationComponent)
      this.checkVisible()
    }else{
      $.get(url, function(success){
        $('#loader-modal').modal('toggle')
        remove()
        $('body').append(`<div class="container-fluid mv-info" id="main">
              <h3 style="color: white">TV Series</h3>
             <div class="row"></div><br>
             <div class="pagination"></div>
           </div>`)
        stack.main.tv = success.body
        appendSearchData(success.body)
        $('.pagination').append(paginationComponent)
        sidebar.checkVisible()
      })
    }
  },

  getImdb: function(url, sw){
    $('#loader-modal').modal('toggle')
    $(window).scrollTop(0)
    if(stack.main.tv && sw==0){
      $('#loader-modal').modal('toggle')
      remove()
      $('body').append(`<div class="container-fluid mv-info" id="main">
            <h3 style="color: white">Top IMDB</h3>
           <div class="row"></div><br>
           <div class="pagination"></div>
      </div>`)
      appendSearchData(stack.main.tv)
      $('.pagination').append(paginationComponent)
      this.checkVisible()
    }else{
      $.get(url, function(success){
        $('#loader-modal').modal('toggle')
        remove()
        $('body').append(`<div class="container-fluid mv-info" id="main">
              <h3 style="color: white">Top IMDB</h3>
             <div class="row"></div><br>
             <div class="pagination"></div>
           </div>`)
        stack.main.tv = success.body
        appendSearchData(success.body)
        $('.pagination').append(paginationComponent)
        sidebar.checkVisible()
      })
    }
  },
}

function toggleSidebar(){
  if(!sidebar.visible){
    $('.sidebar').width(250);
    $('.container-fluid').css('margin-left', '250px')
    //$('iframe').css('margin-left', '250px')
    sidebar.visible = true;
  }
  else {
    $('.sidebar').width(0);
    $('.container-fluid').css('margin-left', '0')
    $('iframe').css('margin-left', '0')
    sidebar.visible = false
  }
}

$('.sidebar ul li').click(function(){
  $('.sidebar ul li').removeClass('active')
  $(this).addClass('active');
})
