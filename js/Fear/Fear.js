


export class Fear
{
	



	constructor(mesh,feardata)
	{

		this.mesh = mesh;
		this.data = feardata;
		this.maxlove = this.data['Fear'];
		this.love = this.data['Love'];


		this.create_anims();

	}



	get_rewards()
	{
        var expmin = this.data['exp']['min'];
        var expmax = this.data['exp']['max'];
        var exp = getRandomNumber(expmin,expmax);
        var cmin = this.data['crystals']['min'];
        var cmax = this.data['crystals']['max'];
        var crystals = getRandomNumber(cmin,cmax);
		return {
			exp: exp,
			crystals: crystals,
			items: []
		}
	}
	

	current_love_percent()
	{
		return this.love / this.maxlove;
	}

	take_love(love)
	{
		this.love += love;
		return this.current_love_percent();
	}
	is_love_full()
	{

	 return this.love >= this.maxlove;
	}


	get_data()
	{
		return this.data;
	}


	set_position(position){
		this.mesh.position = position;
	}
	
	set_scaling_xyz(scaling)
	{
	this.mesh.scaling.x = 	this.mesh.scaling.y = 	this.mesh.scaling.z = scaling;
	}

	set_axis_y_rotation(rotation)
	{
    this.mesh.rotate(BABYLON.Axis.Y,rotation, BABYLON.Space.WORLD);
	}


	hide()
	{


	 this.mesh.isVisible = false;
	 this.mesh.visibility = 0;
	// this.mesh.position = new BABYLON.Vector3(0,0, 0);
	}






	show()
	{
	 this.mesh.isVisible = true;
	}


	create_anims()
	{
		var attack_keys = [];
		var attack = new BABYLON.Animation("animation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		var current_z  = this.mesh.position.z;

		//ligth out keys
		attack_keys.push({
		frame: 0,
		value: current_z
		});


		attack_keys.push({
		frame: 15,
		value: current_z - 1
		});
		attack_keys.push({
		frame: 30,
		value: current_z
		});
		attack.setKeys(attack_keys);
		var attack_animation = new BABYLON.AnimationGroup("attack");

		attack_animation.addTargetedAnimation(attack,this.mesh);
		attack_animation.normalize(0, 30);
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
		value: current_z + 1
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


		var scale_z_keys = [];
		var scale_z = new BABYLON.Animation("animation", "scaling.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		scale_z_keys.push({
		frame: 0,
		value: 1
		});
		scale_z_keys.push({
		frame: 30,
		value: 0
		});
		scale_z.setKeys(scale_z_keys);

		var scale_y_keys = [];
		var scale_y = new BABYLON.Animation("animation", "scaling.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		scale_y_keys.push({
		frame: 0,
		value: 1
		});
		scale_y_keys.push({
		frame: 30,
		value: 0
		});
		scale_y.setKeys(scale_y_keys);

		var scale_x_keys = [];
		var scale_x = new BABYLON.Animation("animation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		scale_x_keys.push({
		frame: 0,
		value: 1
		});
		scale_x_keys.push({
		frame: 30,
		value: 0
		});
		scale_x.setKeys(scale_x_keys);


		var exit_animation = new BABYLON.AnimationGroup("exit");
		exit_animation.addTargetedAnimation(scale_x,this.mesh);
		exit_animation.addTargetedAnimation(scale_y,this.mesh);
		exit_animation.addTargetedAnimation(scale_z,this.mesh);
		exit_animation.normalize(0, 45);
		this.exit_animation = exit_animation;


	}

play_animation(animation)
	{

		if(animation == 'attack'){
		this.attack_animation.play(false);
		}

		if(animation == 'hit'){
		this.hit_animation.play(false);
		}

		if(animation == 'exit'){
		this.exit_animation.play(false);
		}

	}

	stop_animation()
	{

	}

}