

export class Inventory
{


constructor(helper)
	{


		this.menu = document.getElementById('inventory');

		this.helper = helper;
		this.lightweapons_list = document.getElementById('lightweapons-inventory-list');
		this.equitment_list = document.getElementById('equitment-inventory-list');
		this.potions_list = document.getElementById('potions-inventory-list');
		this.jewls_list = document.getElementById('jewls-inventory-list');
		this.crafting_list = document.getElementById('crafting-inventory-list');

		this.types_list = document.getElementById('inventory-type-list');
		this.pagination_list = document.getElementById('inventory-pagination-list');

		this.exit_button = document.getElementById('exit-inventory');

		this.active = true;

		this.current_item_select = 0;
		this.row = 1;


		this.current_type = 'lightweapons';

		this.inventory_status = {
			lightweapons: {
				current_item_select: 0,
				current_row: 1,
				current_page: 0
			},
			equitment: {
				current_item_select: 0,
				current_row: 1,
				current_page: 0
			},
			potions: {
				current_item_select: 0,
				current_row: 1,
				current_page: 0
			},
			jewls: {
				current_item_select: 0,
				current_row: 1,
				current_page: 0
			},
			crafting: {
				current_item_select: 0,
				current_row: 1,
				current_page: 0
			}
		}
	
		this.current_page_select = 0;
		this.current_type_select = 0;

		/*Modes
		*selectitem, selecttype, selectpage, selectexit
		*/
		this.current_inventory_mode = 'selectitem';

		this.scene = false;
}

set_scene(scene)
{
	this.scene = scene;
	this.add_controls();
}

show()
	{
		this.active = true;
		addClass(this.menu,'show')
	}
	hide()
	{
		this.active = false;
    	removeClass(this.menu,'show')
	}


move(direction)
	{
/*
*Select Type
*[0][1][2][3][4]
*Select Item
*[0][1][2][3]
*[4][5][6][7]
*[8][9][10][11]
*[12][13][14][15]
*[16][17][18][19]
*[20][21][22][23]
*Select Page
*[0][1]

	Modes
		*selectitem, selecttype, selectpage, selectexit

*/
//console.log('move inventory! ' + direction + " " + this.current_inventory_mode + " " + this.current_type)
if(this.current_inventory_mode == 'selectitem'){	
			var current = this.inventory_status[this.current_type]['current_item_select'];
			var current_row = this.inventory_status[this.current_type]['current_row'];
			//console.log(current + " " + current_row)
		}
	
		if(direction == 'up'){
			if(this.current_inventory_mode == 'selecttype'){
				this.current_inventory_mode = 'selectexit';
				this.select_exit_button();
				return;
			}
			if(this.current_inventory_mode == 'selectexit'){
				return;
			}
			if(this.current_inventory_mode == 'selectpage'){
				this.turn_off_pagination();
				var current = this.inventory_status[this.current_type]['current_item_select'];
				this.set_active_item(current);
				this.current_inventory_mode = 'selectitem';
				return;
			}

			if(this.current_inventory_mode == 'selectitem'){
			
		

			if(current == 0 
				|| current == 1 
				|| current == 2 
				|| current == 3){
				this.current_inventory_mode = 'selecttype';
			    this.turn_off_item_select();
			    this.set_active_type();
				return;
			}

			current -= 4;

			}
		}

		if(direction == 'down'){
			if(this.current_inventory_mode == 'selecttype'){
				this.current_inventory_mode = 'selectitem';
				this.turn_off_type_select();
				var current = this.inventory_status[this.current_type]['current_item_select'];
				this.set_active_item(current);
				return;
			}
			if(this.current_inventory_mode == 'selectexit'){
				this.unselect_exit_button();
				this.set_active_type();
				this.current_inventory_mode = 'selecttype';
				return;
			}

			if(this.current_inventory_mode == 'selectpage'){
				return;
			}


			if(this.current_inventory_mode == 'selectitem'){

			if(current == 20
			|| current == 21
			|| current == 22
			|| current == 23){
			this.current_inventory_mode = 'selectpage';
			this.turn_off_item_select();
			this.set_active_pagination();
				return;
			}
			current += 4;

			}


		}

		if(direction == 'left'){



			if(this.current_inventory_mode == 'selecttype'){	
				if(this.current_type_select > 0) {
					this.current_type_select--;
				} else {
					return;
				}
			}
			if(this.current_inventory_mode == 'selectpage'){
				if(this.current_page_select > 0) {
					this.current_page_select--;
				} else {
					return;
				}

			}



			if(this.current_inventory_mode == 'selectitem'){	
			 if(current_row == 1) {
			 	return;
			 }
			if(current_row > 1) {

				current--;
				current_row--;
			}
			}

		}

		if(direction == 'right'){

			if(this.current_inventory_mode == 'selecttype'){	
				if(this.current_type_select < 4) {
					this.current_type_select++;
				} else {
					return;
				}
			}
			if(this.current_inventory_mode == 'selectpage'){
				if(this.current_page_select < 1) {
					this.current_page_select++;
				} else {
					return;
				}

			}


			if(this.current_inventory_mode == 'selectitem'){	
			 if(current_row == 4) {
			 	return;
			 }

		    if(current_row < 4) {
				current++;
				current_row++;
			}
			}

		}

		if(this.current_inventory_mode == 'selectitem'){	
		this.inventory_status[this.current_type]['current_item_select'] = current;
		this.inventory_status[this.current_type]['current_row'] = current_row;
		//(current + " " + current_row)
		this.set_active_item(current);
		}

		
			if(this.current_inventory_mode == 'selecttype'){	
				this.set_active_type();
			}
			if(this.current_inventory_mode == 'selectpage'){
				this.set_active_pagination();
			}


	}
	
	select_exit_button()
	{
		addClass(this.exit_button,'selected');
	}

	unselect_exit_button()
	{
		removeClass(this.exit_button,'selected');
	}

	turn_off_type_select()
	{
		var li = this.types_list.getElementsByTagName("li");

		for (i = 0; i < li.length; i++) {
			removeClass(li[i],"active");
		}
	}

	turn_off_pagination()
	{
		var li = this.pagination_list.getElementsByTagName("li");

		for (i = 0; i < li.length; i++) {
			removeClass(li[i],"selected");
			removeClass(li[i],"active");
		}

	}

	set_active_pagination()
	{
		var li = this.pagination_list.getElementsByTagName("li");

		for (i = 0; i < li.length; i++) {
			removeClass(li[i],"selected");
			removeClass(li[i],"active");
		}


		for (i = 0; i < li.length; i++) {

			var id = li[i].getAttribute('data-id');
			if(id == this.current_page_select) {
			addClass(li[i],'active');
			break;
			}
		}
	}	


	set_active_type()
	{
	//	console.log('set active type')
	//	console.log(this.current_type_select);
		var li = this.types_list.getElementsByTagName("li");

		for (i = 0; i < li.length; i++) {
			//removeClass(li[i],"selected");
			removeClass(li[i],"active");
		}


		for (i = 0; i < li.length; i++) {

			var id = li[i].getAttribute('data-id');
			if(id == this.current_type_select) {
			addClass(li[i],'active');
			break;
			}
		}
	}


	turn_off_item_select()
	{
		if(this.current_type == 'lightweapons') {
				var slots = this.lightweapons_list.getElementsByTagName("li");
		}


		for (i = 0; i < slots.length; i++) {
			removeClass(slots[i],"selected");
			removeClass(slots[i],"active");
		}


	

	}

	set_active_item(item)
	{
	//	console.log('SETTING Active Item')
	//	console.log(item);

		if(this.current_type == 'lightweapons') {
				var slots = this.lightweapons_list.getElementsByTagName("li");
		}


		for (i = 0; i < slots.length; i++) {
			removeClass(slots[i],"selected");
			removeClass(slots[i],"active");
		}


		for (i = 0; i < slots.length; i++) {

			var id = slots[i].getAttribute('data-slot');
			if(id == item) {
			addClass(slots[i],'active');
			break;
			}
		}

	}

	add_controls()
	{



	var inventory = this;

		this.scene.onKeyboardObservable.add((key) => {
    // console.log('keyup from inventory!')
			if(this.active){

     if(key.type ==  BABYLON.KeyboardEventTypes.KEYUP){
     
			if(key.event.key == 'x' ) {

			
     	   	}
     	   if(key.event.key == 'z' ) {
     	   		
	


     	   	}
     		if(key.event.key == 'w' || key.event.key == 'arrowUp') {

     			inventory.move('up');
     			return;

     		}
     		if(key.event.key == 's' || key.event.key == 'arrowDown') {

     			inventory.move('down');
				return;
     		}
     		if(key.event.key == 'a' || key.event.key == 'arrowLeft') {
     		//	console.log('move inventory menu left');
     			inventory.move('left');
     			return;
     		}
     		if(key.event.key == 'd' || key.event.key == 'arrowRight') {
     		//	console.log('move invenotry menu right');
     			inventory.move('right');
     			return;
     		}



     		}
     	}

     });

	}




}