
export class TeamSpellCaster
{
	

	constructor(scene)
	{
		this.scene = scene;

	}



	create_moving_animation(mesh,going_to,start,end)
	{


		var move_z_keys = [];
		var move_z = new BABYLON.Animation("animation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		var current_z = mesh.position.z;
		move_z_keys.push({
		frame: 0,
		value: current_z
		});
		move_z_keys.push({
		frame: start,
		value: current_z
		});
		move_z_keys.push({
		frame: end,
		value: going_to.z
		});
		move_z.setKeys(move_z_keys);
		var move_x_keys = [];
		var move_x = new BABYLON.Animation("animation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		var current_x = mesh.position.x;
		move_x_keys.push({
		frame: 0,
		value: current_x
		});
		move_x_keys.push({
		frame: start,
		value: current_x
		});
		move_x_keys.push({
		frame: end,
		value: going_to.x
		});

		move_z.setKeys(move_z_keys);
		move_x.setKeys(move_x_keys);

		mesh.animations.push(move_z);
        mesh.animations.push(move_x);


        
	
	}
	create_grow_animation(mesh,start,end)
	{
		var scale_z_keys = [];
		var scale_z = new BABYLON.Animation("animation", "scaling.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		scale_z_keys.push({
		frame: start,
		value: 0
		});
		scale_z_keys.push({
		frame: end,
		value: 1
		});
		scale_z.setKeys(scale_z_keys);

		var scale_y_keys = [];
		var scale_y = new BABYLON.Animation("animation", "scaling.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		scale_y_keys.push({
		frame: start,
		value: 0
		});
		scale_y_keys.push({
		frame: end,
		value: 1
		});
		scale_y.setKeys(scale_y_keys);

		var scale_x_keys = [];
		var scale_x = new BABYLON.Animation("animation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		scale_x_keys.push({
		frame: start,
		value: 0
		});
		scale_x_keys.push({
		frame: end,
		value: 1
		});
		scale_x.setKeys(scale_x_keys);

		mesh.animations.push(scale_x);
		mesh.animations.push(scale_y);
		mesh.animations.push(scale_z);

	}

	create_disappear_animation(mesh,start,end)
	{
		var visiblity_keys = [];
		var visibility = new BABYLON.Animation("animation", "visibility", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		visiblity_keys.push({
		frame: 0,
		value: 1
		});

		visiblity_keys.push({
		frame: start,
		value: 1
		});

		visiblity_keys.push({
		frame: end,
		value: 0
		});

		visibility.setKeys(visiblity_keys);
		mesh.animations.push(visibility);
	}

	create_light_out_animation(light,start,end)
	{
		var light_out_keys = [];
		var light_out = new BABYLON.Animation("animation", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		var current_intensity = light.intensity;

		light_out_keys.push({
		frame: 0,
		value: current_intensity
		});

		light_out_keys.push({
		frame: start,
		value: current_intensity
		});

		light_out_keys.push({
		frame: end,
		value: 0
		});

		light_out.setKeys(light_out_keys);
		light.animations.push(light_out);
	}

	create_particle_system_shrink_animation(partileSystem,start,end)
	{
		var particle_shrink_min_keys = [];
		var particle_shrink_max_keys = [];
		var particle_shrink_min = new BABYLON.Animation("animation", "minSize", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		var particle_shrink_max = new BABYLON.Animation("animation", "maxSize", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		particle_shrink_max_keys.push({
		frame: 0,
		value: .3
		});
		particle_shrink_max_keys.push({
		frame: start,
		value: .3
		});

		particle_shrink_max_keys.push({
		frame: end,
		value: 0
		});

		particle_shrink_min_keys.push({
		frame: 0,
		value: .2
		});

		particle_shrink_min_keys.push({
		frame: start,
		value: .2
		});

		particle_shrink_min_keys.push({
		frame: end,
		value: 0
		});

		particle_shrink_min.setKeys(particle_shrink_min_keys);
		particle_shrink_max.setKeys(particle_shrink_max_keys);

		partileSystem.animations.push(particle_shrink_max);
	}


	cast_spell(spell,from,going_to)
	{


		if(spell == 'Spark')
		{
	
			this.create_spark(from,going_to);
			
		}

	}


	create_spark(from,going_to)
	{
		var mesh =  BABYLON.MeshBuilder.CreateSphere("spark", { diameter: .1}, this.scene);
		mesh.isVisible = false;

		mesh.position.x = from.x;
		mesh.position.z = from.z;
		mesh.position.y = from.y + 1;
		//mesh.position.y += 5;

		var sparklight = new BABYLON.PointLight("sparklight", new BABYLON.Vector3(0, 0, 0), this.scene);
    	sparklight.diffuse = new BABYLON.Color3(1, 1, 1);
    	sparklight.specular = new BABYLON.Color3(1, 1, 1);
    	sparklight.intensity = 10;
    	//sparklight.position = new BABYLON.Vector3(-.05, -.05, 0);

    	sparklight.parent = mesh;



		var particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
		particleSystem.particleTexture = new BABYLON.Texture("assets/particles/orb1.jpg", this.scene);


		// Where the particles come from
		particleSystem.emitter = mesh; // the starting object, the emitter
		particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from
		particleSystem.maxEmitBox = new BABYLON.Vector3(.5, .5, .5); // To...

		// Colors of all particles
		particleSystem.color1 = new BABYLON.Color4(1, 1,1, 1.0);
		particleSystem.color2 = new BABYLON.Color4(.5, .5,.5, .5);
		particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0);

		// Size of each particle (random between...
		particleSystem.minSize = 0.1;
		particleSystem.maxSize = 0.2;

		// Life time of each particle (random between...
		particleSystem.minLifeTime = .03;
		particleSystem.maxLifeTime = .2;

		// Emission rate
		particleSystem.emitRate = 1000;

		// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
		particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

		// Set the gravity of all particles
		particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

		// Direction of each particle after it has been emitted
		particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
		particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

		// Angular speed, in radians
		particleSystem.minAngularSpeed = 0;
		particleSystem.maxAngularSpeed = Math.PI;

		// Speed
		particleSystem.minEmitPower = .1;
		particleSystem.maxEmitPower = .2;
		particleSystem.updateSpeed = 0.005;

		// Start the particle system
		particleSystem.start();

		particleSystem.parent = mesh;



		this.create_moving_animation(mesh,going_to,20,40);
		this.create_grow_animation(mesh,0,15);
		this.create_disappear_animation(mesh,40,40);

		
		this.create_light_out_animation(sparklight,40,40)
		
		this.create_particle_system_shrink_animation(particleSystem,20,40);

		this.scene.beginAnimation(mesh, 0, 40, false);
		this.scene.beginAnimation(sparklight, 0, 40, false);
		this.scene.beginAnimation(particleSystem, 0, 40, false);


		setTimeout(function(){
			mesh.dispose();
			sparklight.dispose();
			particleSystem.dispose();

		},1500);
		
	}



}