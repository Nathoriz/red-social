// Tip: avoid this ton of code using AniJS ;)

var element = $('.like');

// when mouseover execute the animation
element.click(function(){
  
  // the animation starts
  element.addClass('rubberBand animated');
  
  // do something when animation ends
  element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
   
    // trick to execute the animation again
    $(e.target).removeClass('rubberBand animated');
  
  });
  
});