
$(document).on('click','.pagination ul li', function(){
  var prev = 'page-'+$('.current').text()
  $('.pagination ul li').removeClass('current')
  $(this).addClass('current')
  var page = $(this).text()
  var tab = $('.active').text().split('\n')[1].split(' ')
  tab.splice(0, tab.length-2)
  tab = tab.join('')

  console.log("'"+page+"'")

  switch(tab){
    case 'AllMovies':
      switch(page){
        case 'Next':
          sidebar.getAllMovies('http://localhost:3000/all-movies/'+prev, 1)
          break;
        case 'Last':
          sidebar.getAllMovies('http://localhost:3000/all-movies/page-405', 1)
          break;
        default:
          sidebar.getAllMovies('http://localhost:3000/all-movies/page-'+page, 1)
      }
      break;
    case 'TVSeries':
    switch(page){
      case 'Next':
        sidebar.getTv('http://localhost:3000/tv/'+prev, 1)
        break;
      case 'Last':
        sidebar.getTv('http://localhost:3000/tv/page-155', 1)
        break;
      default:
        sidebar.getTv('http://localhost:3000/tv/page-'+page, 1)
    }
      break;
  }

})
