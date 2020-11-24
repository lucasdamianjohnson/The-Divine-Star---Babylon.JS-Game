function animate(id,color0,color1,duration){
  //public attributes
  this.elem = document.getElementById(id);
  //private attributes
  var r0= parseInt(color0.substring(0,2),16);
  var g0= parseInt(color0.substring(2,4),16);
  var b0= parseInt(color0.substring(4,6),16);
  var r1= parseInt(color1.substring(0,2),16);
  var g1= parseInt(color1.substring(2,4),16);
  var b1= parseInt(color1.substring(4,6),16);
  var wait = 100; //100ms
  var steps = duration/wait;
  var rstep = (r1 - r0) / (steps);
  var gstep = (g1 - g0) / (steps);
  var bstep = (b1 - b0) / (steps);
  var self = this;
  //public functions
  this.step  = function() {
      steps--;
      if ( steps>0 ) {
          r0 = Math.floor(r0 + rstep);
          g0 = Math.floor(g0 + gstep);
          b0 = Math.floor(b0 + bstep);
          elem.style.borderTopColor = 'rgb('+r0+','+g0+','+b0+')';
          //alert(steps + ' ; ' + elem.style.backgroundColor);
          window.setTimeout(function(){self.step();}, wait);
          //http://www.west-wind.com/weblog/posts/2006/Mar/28/JavaScript-windowSetTimeout-to-a-JavaScript-Class-method-or-function-with-parameters#5042
          //http://blog.vorpal.cc/category/development/javascript-class-event-handlers.html
      } else {
          elem.style.borderTopColor = '#'+color1;
          
      }
  }
  step();
  //alert(this.b0);
}




function get_screen_control_move_direction(pointerInfo)
{
  console.log(pointerInfo);
           var screenX = pointerInfo.event.pageX;
           var screenY = pointerInfo.event.pageY;
           var w = window.innerWidth;
           var h = window.innerHeight;
           var ww = window.innerWidth;
           var hh = window.innerHeight;

      console.log(`${w} ${ww} ${h} ${hh}`)


          var wpercent = screenX / w;
          var hpercent = screenY / h;
          console.log(`${wpercent} ${hpercent}`);
/*
  _         _______   ____________    __________    __________  
 /         /         |            \  |             |           |\       |
/         /          |             | |             |           | \      |
\        /           |             / |             |           |  \     |
  \     /            |____________/  |__________   |__________ |   \    |
    |   \            |     \         |             |           |    \   |
    /    \           |      \        |             |           |     \  |
  /       \          |       \       |             |           |      \ |
_/         \______   |        \      |__________   |__________ |       \|
  ______________________________________________            
  |  |             ^                 |          |
  |  |         |   |   |             |          |
  |  |         |   |   |             |          |
  |  |     ----|---|---|----- 30%    |    00    | 
  |00| <- -----|---|---|------ -> 50%|   0000   |
  |00|     ----|---|---|------70%    |   0000   |
  |  |         |   |   |             |    00    |
  |  |         |   |   |             |          |
  |  |        30% 50%  70%           |          |
  |__|_______________________________|__________|
*/

      var direction;
      if(wpercent <= .5 && (hpercent >= .3 && hpercent <= .7 )) {
        direction = "left"
      }else if(wpercent >= .5 && (hpercent >= .3 && hpercent <= 7 )) {
        direction = "right";
      }
      if(hpercent <= .5 && (wpercent >= .3 && wpercent <= .7 )) {
        direction = "up"
      }else if(hpercent >= .5 && (wpercent >= .3 && wpercent <= .7 )) {
        direction = "down";
      }
      if(hpercent <= .3 && (wpercent >= .7 && wpercent <= 1 )) {
        direction = "upright"
      }else if(hpercent >= .7 && (wpercent >= .7 && wpercent <= 1 )) {
        direction = "downright";
      }
      if(hpercent <= .3 && (wpercent >= 0 && wpercent <= .3 )) {
        direction = "upleft"
      }else if(hpercent >= .7 && (wpercent >= 0 && wpercent <= .3 )) {
        direction = "downleft";
      }
      return direction;
}


function degressToRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


function getRandomNumber(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
}

function getRandomOdds(odds)
{

  if(odds <= 0) {
    return false;
  }

  if(odds > 0 && odds <= 5 ) {
    //console.log('A');
    var test = getRandomNumber(1,20);
    var roll = getRandomNumber(1,20);
    if(test == roll){
      return true;
    }

  }
  if(odds > 5 && odds <= 10 ) {
   // console.log('B');
    var test = getRandomNumber(1,10);
    var roll = getRandomNumber(1,10);
    if(test == roll){
      return true;
    }

  }
  if(odds > 10 && odds <= 15 ) {
    //console.log('C');
    var test = getRandomNumber(1,9);
    var roll = getRandomNumber(1,9);
    if(test == roll){
      return true;
    }

  }
  if(odds > 15 && odds <= 20 ) {
    //console.log('D');
    var test = getRandomNumber(1,6);
    var roll = getRandomNumber(1,6);
    if(test == roll){
      return true;
    }

  }
  if(odds > 20 && odds <= 23 ) {
    //console.log('E');
    var test = getRandomNumber(1,5);
    var roll = getRandomNumber(1,5);
    if(test == roll){
      return true;
    }

  }
  if(odds > 23 && odds <= 25 ) {
    //console.log('E');
    var test = getRandomNumber(1,4);
    var roll = getRandomNumber(1,4);
    if(test == roll){
      return true;
    }

  }
    if(odds >= 28 && odds < 50 ) {
    //console.log('F');
    var test = getRandomNumber(1,3);
    var roll = getRandomNumber(1,3);
    if(test == roll){
      return true;
    }

  }
      if(odds >= 50 && odds < 75 ) {
   // console.log('G');
    var test = getRandomNumber(1,2);
    var roll = getRandomNumber(1,2);
    if(test == roll){
      return true;
    }

  }
  if(odds >= 75) {
  //console.log('H');
  return true;
  }
return false;
}



function hasClass(element, class_name) {
    return (' ' + element.className + ' ').indexOf(' ' + class_name+ ' ') > -1;
}

function removeClass(element,remove_class) {

  var re = new RegExp(remove_class,"g");
  element.className = element.className.replace(re, "");

}

function addClass(element,add_class) {

  classes = element.className.split(" ");
  if (classes.indexOf(add_class) == -1) {
    element.className += " " + add_class;
  }
  
}



function addRemoveClass(element,add_class,remove_class) {
 classes = element.className.split(" ");
  if (classes.indexOf(add_class) == -1) {
    element.className += " " + add_class;
  }

  var re = new RegExp(remove_class,"g");
  element.className = element.className.replace(re, "");
 

}


function toggleClass(element,toggle_class) { 

if (element.classList) {
  element.classList.toggle(toggle_class);
} else {
  // For IE9
  var classes = element.className.split(" ");
  var i = classes.indexOf(toggle_class);

  if (i >= 0)
    classes.splice(i, 1);
  else
    classes.push(toggle_class);
    element.className = classes.join(" ");
}

}





var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("fear-bar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}











