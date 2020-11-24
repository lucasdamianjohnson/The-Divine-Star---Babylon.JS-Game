
export class SpellMenu
{
	

	constructor(helper)
	{
		this.helper = helper;
		this.menu = document.getElementById('cast-spell-menu');
		this.active = false;

		this.current_spell_select = 0;
		this.row = 1;

		this.spells = false;
	}


	show_menu()
	{
		this.active = true;
		addClass(this.menu,'show')
	}
	hide_menu()
	{
		this.active = false;
    	removeClass(this.menu,'show')
	}

	set_scene(scene)
	{
		this.scene = scene;
		this.add_controls();
	}


	get_selected_spell()
	{

		return this.spells[this.current_spell_select];
	}


	create_menu(knownspells,spells)
	{

	this.spells = knownspells;

	var spellMenu = this;
	var spell_list = document.getElementById('cast-spell-list');
	spell_list.innerHTML = '';

	var spell_html = '';

	var i = 0;
	knownspells.forEach(function(item,index){

	var spelldata = spells[item];

	var frequency_html = '';
	spelldata['frequncies'].forEach(function(item,index){

	frequency_html += spellMenu.helper.get_frequency_icon(item);

	} );
	var eclass = 'spell-option';
	if(i == 0){eclass +=' active';}
	
	spell_html += `
	<li  data-id='${i}' class='${eclass}'>
	<div class='spell-title'>${spelldata['name']}</div>
	<div class='spell-info-row'>
	<div class='spell-loveimpact'><span class='small-loveimpact-icon'></span>${spelldata['loveimpact']}</div>
	<div class='spell-level-label'>Level:&nbsp;<spam class='spell-level'>${spelldata['level']}</spam></div>
	</div>
	<div class='spell-info-row'>
	<div class='spell-manause'><span class='small-mana-icon'></span>${spelldata['manause']}</div>
	<div class='spell-light-frequency-label'>${frequency_html}</div>
	</div>
	</li>
	`;

	i++;

	});

	spell_list.innerHTML = spell_html;


	}


	move_spell_menu(direction)
	{
/*
*[0][1][2][3]
*[4][5][6][7]
*[8][9][10][11]
*/
	
		if(direction == 'up'){
			if(this.current_spell_select == 0 
				|| this.current_spell_select == 1 
				|| this.current_spell_select == 2 
				|| this.current_spell_select == 3){
				return;
			}
			this.current_spell_select -= 4;
		}

		if(direction == 'down'){
			if(this.current_spell_select == this.spells.length - 1
			|| this.current_spell_select == this.spells.length - 2
			|| this.current_spell_select == this.spells.length - 3
			|| this.current_spell_select == this.spells.length - 4){
				return;
			}
			this.current_spell_select += 4;
		}

		if(direction == 'left'){
		 if(this.row == 1) {
		 	return;
		 }
		if(this.row > 1) {

			this.current_spell_select--;
			this.row--;
		}

		}

		if(direction == 'right'){
		 if(this.row == 4) {
		 	return;
		 }

	    if(this.row < 4) {

			this.current_spell_select++;
			this.row++;
		}

		}

		this.set_active_spell(this.current_spell_select);
	
	}


	set_active_spell(spell)
	{
		console.log('SETTING ACTIVE SPELL')
		console.log(spell);
		var options =  document.getElementsByClassName("spell-option");
		for (i = 0; i < options.length; i++) {
			removeClass(options[i],"selected");
			removeClass(options[i],"active");
		}


		for (i = 0; i < options.length; i++) {

			var id = options[i].getAttribute('data-id');
			if(id == spell) {
			addClass(options[i],'active');
			break;
			}
		}

	}

	add_controls()
	{



	var spellMenu = this;

		this.scene.onKeyboardObservable.add((key) => {

			if(this.active){

     if(key.type ==  BABYLON.KeyboardEventTypes.KEYUP){
     
			if(key.event.key == 'x' ) {

			
     	   	}
     	   if(key.event.key == 'z' ) {
     	   		
	


     	   	}
     		if(key.event.key == 'w' || key.event.key == 'arrowUp') {

     			spellMenu.move_spell_menu('up');
     			return;

     		}
     		if(key.event.key == 's' || key.event.key == 'arrowDown') {

     			spellMenu.move_spell_menu('down');
				return;
     		}
     		if(key.event.key == 'a' || key.event.key == 'arrowLeft') {
     			console.log('move spell menu left');
     			spellMenu.move_spell_menu('left');
     			return;
     		}
     		if(key.event.key == 'd' || key.event.key == 'arrowRight') {
     			console.log('move spell menu right');
     			spellMenu.move_spell_menu('right');
     			return;
     		}



     		}
     	}

     });

	}


}