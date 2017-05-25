
$(document).on('click', '.tab', function(){
  //console.log('id')
  $('.tab').removeClass('active')
  $(this).addClass('active');

  var tabName = $('.active h4').text()
  var data = stack.main.home;
  $('#loader-modal').modal('toggle');

  switch(tabName){
    case 'Recommended':
      $('#main .sub-content .row').empty()
      for(var i=0;i<24;i++){
        $('#main .sub-content .row').append(rowComponent(data, i))
      }
      $('#loader-modal').modal('toggle');
      break;
    case 'Recently Added':
      $('#main .sub-content .row').empty()
      for(var i=24;i<50;i++){
        $('#main .sub-content .row').append(rowComponent(data, i))
      }
      $('#loader-modal').modal('toggle');
      break;
    case 'Most Watched':
      $('#main .sub-content .row').empty()
      for(var i=50;i<90;i++){
        $('#main .sub-content .row').append(rowComponent(data, i))
      }
      $('#loader-modal').modal('toggle');
      break;
    case 'Requested':
      $('#main .sub-content .row').empty()
      for(var i=90;i<112;i++){
        $('#main .sub-content .row').append(rowComponent(data, i))
      }
      $('#loader-modal').modal('toggle');
      break;
  }
})

$(window).on('scroll', function(){
  if($(this).scrollTop() >= 502){
    $('.navigation').addClass('affix')
  }else {
    $('.navigation').removeClass('affix')
  }
})
