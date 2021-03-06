

import {Messages} from './Messages.js'
import {FearInventory} from './FearInventory.js'
import {HUDHelp} from './HUDHelp.js'
import {SpellMenu} from './SpellMenu.js'
import {Inventory} from './Inventory.js'
export class PlayerHUD
{
	

	constructor()
{
this.helper = new HUDHelp();
var message = document.getElementById('message');
this.scene = false;
this.message = message;
this.messages = new Messages();
this.fear_inventory = new FearInventory();
this.spell_menu = new SpellMenu(this.helper);
this.inventory = new Inventory(this.helper);

this.icon_groups = {}
this.icon_groups['fear-types']  = document.getElementById('fear-types');
this.icon_groups['crystals']  = document.getElementById('crystals-display');
this.fear_total_amount = document.getElementById('fear-types-total');
this.prompt_countdown_bar = document.getElementById('prompt-count-bar');
this.prompt_countdown = document.getElementById('prompt-count-down');
this.fear_invetory_button = document.getElementById('fear-invetory-player-hud');
this.fear_invetory_menu = document.getElementById('fear-type-inventory-menu');
this.cancel_count_down_bar = false;
this.cancel_count_down_bar_callback = false;
this.dataManager = false;
this.player_hud_bottom_bar = document.getElementById('player-hud');
this.team_battle_bar = document.getElementById('team-battle-bar');


this.crystals_display_total = document.getElementById('cystals-display-total');

this.add_click_listeners();
}

get_inventory() 
{
  return this.inventory;
}

set_scene(scene)
{
  this.scene = scene;
  this.spell_menu.set_scene(scene);
  this.inventory.set_scene(scene);
}


  update_cyrstals(crystals)
  {
    this.crystals_display_total.innerText = crystals;
  }




update_team_player_love(selection,current_love,new_love)
{

var elm = document.getElementById('team-member-'+selection+'-currentlove');

if(current_love - new_love < 0){

}

var love = current_love;

 var update_team_player_love_id = setInterval(update_team_player_love_frame, 120);
    function update_team_player_love_frame() {

      if (love <= new_love) {

        clearInterval(update_team_player_love_id);
          elm.innerText = new_love;
      } else {
        love--;

        elm.innerText = love;
      }

    } 


}

update_fear_type_love_bar(selection,currentpercent,percent)
{
var lovebars = document.getElementsByClassName('fear-type-lovebar');
var elm = '';

for(var i = 0; i < lovebars.length; i++){
      elm = lovebars[i];
      var id = elm.getAttribute('data-id');
      if(id == selection){
        break;
      }
}


var width = currentpercent * 100;
percent *= 100;
var player_hud = this;
 
 var update_fear_type_love_bar_id = setInterval(update_fear_type_love_bar_frame, 30);
    function update_fear_type_love_bar_frame() {

      if (width >= percent || width >= 100) {

        clearInterval(update_fear_type_love_bar_id);

      } else {
        width++;

        elm.style.width = width + "%";
      }




    } 


}

update_action_team_battle_bar_option(option,optionclass)
{

var options =  document.getElementsByClassName("battle-option");
for (i = 0; i < options.length; i++) {
 	removeClass(options[i],"selected");
 	removeClass(options[i],"active");
}


for (i = 0; i < options.length; i++) {

 var id = options[i].getAttribute('data-id');
 if(id == option) {
 	addClass(options[i],optionclass);
 	break;
 }
}

}











update_team_battle_bar_html(currentteam,teamdata,feardata){
	 var teamstats = document.getElementById('team-stats-battle-info-display');
	 var feartypeinfo = document.getElementById('fear-types-battle-info-display');
	

var team_html = `
<div class='team-member-data-label'>
<p class='team-member-love-label'>Love:</p>
<p class='team-member-mana-label'>Mana:</p>
</div>
`;


	currentteam.forEach(function(item,index){

		 var player = teamdata[item];
		var name = player['default-name'];
		var currentlove = player['current-love'];
		var maxlove = player['max-love'];
		var currentmana = player['current-mana'];
		var maxmana = player['max-mana'];
		var ui_image = player['UIimage'];
	team_html +=`
     <div class='team-bar-member'>
              <img src='${ui_image}'/>
              <p class='team-member-name'>
              ${name}
              </p>
              <p class='team-member-health-container'>
              <span id='team-member-${index}-currentlove'>${currentlove}</span>&nbsp;/&nbsp;
              <span id='team-member-${index}-totallove'>${maxlove}</span>
              </p>
              <p class='team-member-mana-container'>
              <span id='team-member-${index}-currentmana'>${currentmana}</span>&nbsp;/&nbsp;
              <span id='team-member-${index}-currentmana'>${maxmana}</span>
              </p>
        </div>`;
	});
teamstats.innerHTML = team_html;



var fear_html = ``;

	feardata.forEach(function(item,index){
		var name = item['displayname'];
 fear_html += `
     <div data-id='${index}' class='feartype-display-container'>
              <p>${name}</p>
                  <div  class="fear-type-lovebar-container">
                  <div data-width='0' data-id='${index}' class="fear-type-lovebar"></div>
                  </div>
             
            </div>
 `;

});
feartypeinfo.innerHTML = fear_html;	

}

battlebar_removefeartype(target)
{

var barscontainers =  document.getElementsByClassName("feartype-display-container");
for (i = 0; i < barscontainers.length; i++) {
    if(barscontainers[i].getAttribute('data-id') == target) {
      barscontainers[i].remove();
      break;
    }
}
var bars =  document.getElementsByClassName("fear-type-lovebar");

for (i = 0; i < bars.length; i++) {
    barscontainers[i].setAttribute('data-id',i);
    bars[i].setAttribute('data-id',i);
}

}



animate_battle_bar_up(callback=null)
{
console.log('animating_battle_bar_up!!');
var top = 100;
var player_hud = this;
 var animate_battle_bar_out_id = setInterval(animate_battle_bar_out_id_frame, 30);

    function animate_battle_bar_out_id_frame() {

      if (top <= 77) {
      	  if(callback != null){
    		callback(player_hud);
    	}
        clearInterval(animate_battle_bar_out_id);

      } else {
        top--;

        player_hud.team_battle_bar.style.top = top + "%";
      }




    }
}

animate_battle_bar_down(callback=null)
{
console.log('animating_battle_bar_down!!');
var top = 77;
var player_hud = this;
 var animate_battle_bar_down_id = setInterval(animate_battle_bar_down_frame, 30);

    function animate_battle_bar_down_frame() {

      if (top > 100) {
          if(callback != null){
        callback(player_hud);
      }
        clearInterval(animate_battle_bar_down_id);

      } else {
        top++;

        player_hud.team_battle_bar.style.top = top + "%";
      }




    }
}




/*
Animate Bottom Bar 
*/
animate_bottom_bar_up(callback=null)
{

var top = 100;
var player_hud = this;
 var animate_bottom_bar_out_id = setInterval(animate_bottom_bar_out_id_frame, 30);

    function animate_bottom_bar_out_id_frame() {

      if (top <= 92) {
      		if(callback!=null){
    		callback(player_hud);
    	}
        clearInterval(animate_bottom_bar_out_id);

      } else {
        top--;

        player_hud.player_hud_bottom_bar.style.top = top + "%";
      }




    } 
}
animate_bottom_bar_down(callback=null)
{
console.log('calling this!!');
var top = 92;
var player_hud = this;
 var animate_bottom_bar_out_id = setInterval(animate_bottom_bar_out_id_frame, 30);

    function animate_bottom_bar_out_id_frame() {

      if (top >= 100) {
      	if(callback != null){
  	callback(player_hud);
  }
        clearInterval(animate_bottom_bar_out_id);
  
      } else {
        top++;
   
        player_hud.player_hud_bottom_bar.style.top = top + "%";
      }




    } 
}

set_data_manager(dataManger)
{
this.dataManger = dataManger;
this.fear_inventory.set_data_manager(dataManger);
}

add_click_listeners(){
var player_hud = this;
this.fear_invetory_button.addEventListener("click", function(){
	console.log('toggle classs');
	toggleClass(player_hud.fear_invetory_menu,'show');
});
}



cancel_time_prompt(callback)
{
removeClass(this.prompt_countdown,'show');
removeClass(this.message,'show');
this.cancel_count_down_bar = true;
this.cancel_count_down_bar_callback = callback;

}

/*
* Creates a time prompt on the screen. Updates the value if the user does not do anything.
* 
*
*/
create_time_prompt(message,callback)
{

this.trigger_count_down_bar(callback);

//this.messages.showAndHideMessage('Will you enter the fear now?',0,1800);
this.messages.showAndHideMessage(message,0,1800);
}


update(looking_for,new_value,added)
{

if('fear-types-total')
{
this.fear_total_amount.innerText = new_value;
this.add_to_fear_bar(added);
this.trigger_active_icon('fear-types')

}
if('crystals-total')
{

}
 

}









trigger_count_down_bar(callback)
{
	 addClass(this.prompt_countdown,'show');

var width = 100;
var player_hud = this;
 
 var trigger_count_down_bar_id = setInterval(trigger_count_down_bar_frame, 30);
    function trigger_count_down_bar_frame() {

      if (width < 0) {
        removeClass(player_hud.prompt_countdown,'show');
        callback();
        clearInterval(trigger_count_down_bar_id);
        setTimeout(function(){
        	        player_hud.prompt_countdown_bar.style.width = "100%";
        },1010);
      } else {
        width--;

        player_hud.prompt_countdown_bar.style.width = width + "%";
      }

      if(player_hud.cancel_count_down_bar){
      	clearInterval(trigger_count_down_bar_id);
      	player_hud.cancel_count_down_bar_callback();
      	player_hud.cancel_count_down_bar = false;
      	console.log('canceling!!');
      	return;
      }


    } 



}

trigger_active_icon(group,show_speed=1,duration=1000,end_speed=1)
{

var teamdata = this;
setTimeout(function(){

addClass(teamdata.icon_groups[group],'active');

setTimeout(function(){

setTimeout(function(){
removeClass(teamdata.icon_groups[group],'active');
},end_speed);

},duration);


}, show_speed );

}










 subtract_from_fear_bar(amount)
{
  var elem = document.getElementById("fear-bar");
var width = parseInt(elem.getAttribute('data-width'));
var total = width - amount;
if(total < 0) {
  total = 0;
}

 var subtract_from_fear_bar_frame_id = setInterval(subtract_from_fear_bar_frame, 30);
    function subtract_from_fear_bar_frame() {
      console.log('calling subtract');
      console.log(`${width} ${total}`)
      if (width <= total) {
        clearInterval(subtract_from_fear_bar_frame_id);

      } else {
        width--;
        elem.style.width = width + "%";
      }
    } 
}

 add_to_fear_bar(amount)
{
 var elem = document.getElementById("fear-bar");
var width = parseInt(elem.getAttribute('data-width'));
var total = width + amount;
if(total > 100) {
  total = 100;
}

elem.setAttribute('data-width', total);
 var add_to_fear_bar_frame_id = setInterval(add_to_fear_bar_frame, 30);
    function add_to_fear_bar_frame() {
      if (width >= total) {

        clearInterval(add_to_fear_bar_frame_id);

      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
}



update_fear_inventory(fear_inventory)
{
this.fear_inventory.update_fear_inventory(fear_inventory);
}

}