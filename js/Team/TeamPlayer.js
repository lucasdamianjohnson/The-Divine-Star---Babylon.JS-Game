import {TeamSpellCaster} from './TeamSpellCaster.js';

export class TeamPlayer
{

	constructor(id,meshes,data,scene)
	{
	
		this.mesh = meshes;
		this.id = id;
		this.data = data;

		this.scene = scene;

		this.current_love = data['current-love'];
		this.max_love = data['max-love'];

		this.orig_position = false;
		this.create_anims();
		this.spellcaster = new TeamSpellCaster(scene);
	}

cast_spell(spell,going_to)
	{
	
		var from = this.mesh.position;
		this.spellcaster.cast_spell(spell,from,going_to);
	}

	get_data()
	{
		return this.data;
	}

	set_position(position){
		this.mesh.position = position;
		this.orig_position = position;

	}

	get_current_love()
	{
		return this.current_love;
	}

	take_fear(fear)
	{

		this.current_love  -= fear;
		return this.current_love ;
	}


	


	get_name()
	{
		return this.id;
	}
	
	set_scaling_xyz(scaling)
	{
	this.mesh.scaling.x = 	this.mesh.scaling.y = 	this.mesh.scaling.z = scaling;
	}

	set_axis_y_rotation(rotation)
	{
    this.mesh.rotate(BABYLON.Axis.Y,rotation, BABYLON.Space.WORLD);
	}

create_anims()
	{
   var attack_keys = [];
  var attack = new BABYLON.Animation("animation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,                                                                  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var current_z  = this.mesh.position.z;


//ligth out keys
   attack_keys.push({
        frame: 0,
        value: current_z
    });

  
    attack_keys.push({
        frame: 15,
        value: current_z + 1
    });
     attack_keys.push({
        frame: 30,
        value: current_z
    });

    attack.setKeys(attack_keys);
   var attack_animation = new BABYLON.AnimationGroup("attack");

attack_animation.addTargetedAnimation(attack,this.mesh);
attack_animation.normalize(0, 45);
this.attack_animation = attack_animation;

  var hit_keys = [];
  var hit = new BABYLON.Animation("animation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,                                                                  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var current_z  = this.mesh.position.z;


//ligth out keys
   hit_keys.push({
        frame: 0,
        value: current_z
    });

  
    hit_keys.push({
        frame: 15,
        value: current_z - 1
    });
     hit_keys.push({
        frame: 30,
        value: current_z
    });

    hit.setKeys(hit_keys);
   var hit_animation = new BABYLON.AnimationGroup("hit");

hit_animation.addTargetedAnimation(hit,this.mesh);
hit_animation.normalize(0, 45);
this.hit_animation = hit_animation;

	}








	play_animation(animation)
	{

		if(animation == 'attack'){
		this.attack_animation.play(false);
		}

		if(animation == 'hit'){
		this.hit_animation.play(false);
		}

	}

	show()
	{

		this.mesh.isVisible = true;
	}
	hide()
	{
		

		this.mesh.forEach(function(item,index){
			item.isVisible = false;
		});
	}

		
}