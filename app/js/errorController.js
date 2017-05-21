function loadErrorPage(){
  $('#loader-modal').modal('toggle')
  $('#main').empty();
  $('.container').empty();

  $('.container').attr('id', 'err')
  .append(`<p class="text-center error-icon"><i class="fa fa-exclamation-triangle fa-fw fa-7x error-icon"></i></p>
  <p class="text-center">An error occured<br><a class="text-center" href="" onclick="tryAgain()" >Try Again ?</a></p>`)
}

function tryAgain(){
  loadMainData()
}
