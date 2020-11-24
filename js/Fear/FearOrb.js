


export class FearOrb
{
	
	constructor(id,orbdata)
	{
		this.scene = false;
		this.mesh = false;
		this.sound = false;
		this.sound_die = false;
		this.player = false;
		this.teamdata = false;
		this.id = id;
 	this.hitbox = false;
 	this.assets = false;
 	this.fear_types = false;
 	this.orbdata = orbdata;
 	   this.player_hud = false;
     this.light = false;
     this.particle_system = false;
	}

set_player_hud(player_hud)
{
	this.player_hud = player_hud;
}
set_fear_types(fear_types)
{
	this.fear_types = fear_types;
}
set_team_data(teamdata)
{
this.teamdata = teamdata;
}
set_player(player)
	{
	this.player = player;
	}

set_assets_manager(assetManager)
{
this.assets = assetManager;
}


	set_scene(scene)
	{
		this.scene = scene;
	}

delete_self()
{
	this.fear_types.destroy(this.id,'fearorb');
}

on_asorb()
{

    this.mesh.dispose();
    this.hitbox.dispose();
    this.mesh = null;
    delete this.mesh;
    this.hitbox = null;
    delete this.hitbox;
    if(this.sound){
    this.sound.stop();
    this.sound_die.play();
    }
    var orb = this;
    this.player.get_actions().set_action('fearscene',function(sceneManager,teamdata){
   
       sceneManager.set_active_scene('fear','',orb.orbdata);
      teamdata.cancel_fear_prompt(function(sceneManager){
   
            
      });
     
    });
      var teamdata = this.teamdata;
     this.teamdata.prompt_fear_update(function(){
      teamdata.add_to_data('fear-types-total',1);
      teamdata.add_to_fear_inventory(orb.orbdata);
    });

    //this.fear_types.set_scene_standby(scene);




   this.delete_self();
}

	create_anims(mesh)
	{
        console.log("create anims!");
        console.log(this.mesh);
        /*
    var particle_shrink_min_keys = [];
    var particle_shrink_max_keys = [];
var particle_shrink_min = new BABYLON.Animation("animation", "minSize", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var particle_shrink_max = new BABYLON.Animation("animation", "maxSize", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
   particle_shrink_max_keys.push({
        frame: 0,
        value: .09
    });

     particle_shrink_max_keys.push({
        frame: 5,
        value: 0
    });
   particle_shrink_min_keys.push({
        frame: 0,
        value: .01
    });

     particle_shrink_min_keys.push({
        frame: 5,
        value: 0
    });


particle_shrink_min.setKeys(particle_shrink_min_keys);
particle_shrink_max.setKeys(particle_shrink_max_keys);
    var light_out_keys = [];
  var light_out = new BABYLON.Animation("animation", "intensity", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);


//ligth out keys
   light_out_keys.push({
        frame: 0,
        value: 2
    });

  
    light_out_keys.push({
        frame: 15,
        value: 0
    });
    light_out.setKeys(light_out_keys);
   var light_out_animation = new BABYLON.AnimationGroup("fear_orb_shrink-"+this.id);

light_out_animation.addTargetedAnimation(light_out,this.light);
light_out_animation.addTargetedAnimation(particle_shrink_min,this.particle_system);
light_out_animation.addTargetedAnimation(particle_shrink_max,this.particle_system);
light_out_animation.normalize(0, 15);
this.light_out_animation = light_out_animation;
*/
   var shrinkz = new BABYLON.Animation("animation", "scaling.z", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

var shrink_keys = [];
    var shrinkz = new BABYLON.Animation("animation", "scaling.z", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var shrinky = new BABYLON.Animation("animation", "scaling.y", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var shrinkx = new BABYLON.Animation("animation", "scaling.x", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
   shrink_keys.push({
        frame: 0,
        value: 1
    });

     shrink_keys.push({
        frame: 15,
        value: 0
    });

 shrinkz.setKeys(shrink_keys);
 shrinky.setKeys(shrink_keys);
 shrinkx.setKeys(shrink_keys);

    var shrink_animation = new BABYLON.AnimationGroup("fear_orb_shrink-"+this.id);
    shrink_animation.addTargetedAnimation(shrinkz, mesh);
    shrink_animation.addTargetedAnimation(shrinky, mesh);
    shrink_animation.addTargetedAnimation(shrinkx, mesh);

   shrink_animation.normalize(0, 15);

   this.shrink_animation = shrink_animation;
   var orb = this;
   this.shrink_animation.onAnimationGroupEndObservable.addOnce(function(){
   	console.log('it eneded!!');

    orb.on_asorb();



   });


   var keys2 = [];
   var animation2 = new BABYLON.Animation("animation", "position.y", 40, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
   var keys = [];
   var animation = new BABYLON.Animation("animation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  
                                                                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

animation.framePerSecond = 80;

   keys.push({
       frame: 0,
       value: 3
   });

   keys.push({
       frame: 100,
       value: 5
   });

    keys2.push({
       frame: 0,
       value: .5
   });

   keys2.push({
       frame: 0,
       value: 1
   });
   keys2.push({
       frame: 50,
       value: 3
   });
    keys2.push({
       frame: 100,
       value: 1
   });

   animation.setKeys(keys);
  // animation2.setKeys(keys2);




   var idle_animation = new BABYLON.AnimationGroup("fear_orb_idle");
   idle_animation.addTargetedAnimation(animation, mesh);
   //idle_animation.addTargetedAnimation(animation2, mesh);


  idle_animation.normalize(0, 100);


 idle_animation.play(true);


	}


	play_shrink()
	{
		
      console.log('play shrink!');
		this.shrink_animation.play();
    //this.light_out_animation.play();
	}


	create_orb(orb_position)
	{

        var orbMat = new BABYLON.StandardMaterial("orbMat", this.scene);;
        orbMat.diffuseColor.copyFromFloats(0, 1, 0);
        orbMat.backFaceCulling = true;
        var material = orbMat;   

        var orb = BABYLON.MeshBuilder.CreateSphere("orb", {diameter: .5}, this.scene);
orb.position = orb_position;
orb.material = material;
orb.isPickable = false;
orb.checkCollisions = false;
orb.isVisible = false;
this.hitbox = orb;
this.mesh = orb;
var fearOrb = this;

        BABYLON.SceneLoader.ImportMesh(null,"./assets/feartypes/crystal/red/", "redcrystal.babylon", this.scene, function (meshes,particles,skeltons)  {

            meshes.forEach(function(mesh,index){

                mesh.isVisible = true;
                mesh.isPickable = false;
                mesh.checkCollisions = false;
                if(mesh.name == '__root__') {
                   
      
                } else {
                    console.log("updated texture")
                    var material = mesh.material;
                    mesh.parent = fearOrb.hitbox;
                   // fearcrystal = mesh;
                   
                   // mesh.position = new BABYLON.Vector3(5,3,-10);
                    material.samplingMode = BABYLON.Texture.NEAREST_SAMPLINGMODE
                         //console.log("UPDATED SAMPLING MODE");
                         var turl = material.albedoTexture.url;
                        console.log(turl);
                
                         var texture = new BABYLON.Texture(turl, fearOrb.scene);
                        
                         texture.onLoadObservable.add(() => {
                        texture.updateSamplingMode(BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR);
                 
                        fearOrb.mesh = mesh;
                        //fearOrb.create_anims(mesh);
                    });
                         texture.anisotropicFilteringLevel = 0;
                         var mat = new BABYLON.StandardMaterial("groundmat", fearOrb.scene);
                         mat.diffuseTexture = texture;
                         mat.samplingMode = BABYLON.Texture.NEAREST_SAMPLINGMODE
                         mesh.material = mat;
                         mesh.scaling.x = 	mesh.scaling.y = 	mesh.scaling.z = .5;
                
                  
                         
                         
                         
                
                
                
                
                
                
                }
        
             
   
   
          });
    });







this._rayOrbFront = new BABYLON.Ray();
var rayOrbFrontHelper = new BABYLON.RayHelper(this._rayOrbFront);
rayOrbFrontHelper.attachToMesh(orb, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, .5), .3);

this._rayOrbBack = new BABYLON.Ray();
var rayOrbBackHelper = new BABYLON.RayHelper(this._rayOrbBack);
rayOrbBackHelper.attachToMesh(orb, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -.1), .3);

this._rayOrbLeft = new BABYLON.Ray();
var rayOrbLeftHelper = new BABYLON.RayHelper(this._rayOrbLeft);
rayOrbLeftHelper.attachToMesh(orb, new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(.2, 0, 0), .3);

this._rayOrbRight = new BABYLON.Ray();
var rayOrbRightHelper = new BABYLON.RayHelper(this._rayOrbRight);
rayOrbRightHelper.attachToMesh(orb, new BABYLON.Vector3(-1, 0, 0), new BABYLON.Vector3(-.2, 0, -0), .3);

this._rayOrbUp = new BABYLON.Ray();
var rayOrbUpHelper = new BABYLON.RayHelper(this._rayOrbUp);
rayOrbUpHelper.attachToMesh(orb, new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(0, .5, 0), .3);

this._rayOrbDown = new BABYLON.Ray();
var rayOrbDownHelper = new BABYLON.RayHelper(this._rayOrbDown);
rayOrbDownHelper.attachToMesh(orb, new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(0, -.5, 0), .3);
this.create_anims(this.mesh);



	}



physicsupdate()
{		

    var maxFollow = 10;
    var speedFactor = 16;
        if(this.player.hitbox){
           //console.log(orb.position);
            this.hitbox.setEnabled(true);
            var distance = BABYLON.Vector3.Distance( this.hitbox.getAbsolutePosition(), this.player.hitbox.getAbsolutePosition());
            var dir = this.hitbox.getAbsolutePosition().subtract(this.player.hitbox.getAbsolutePosition()).normalize().negate();
        
            var orbFrontPick = this.scene.pickWithRay(this._rayOrbFront);
            var orbFrontHit = false;
            if (orbFrontPick) orbFrontHit = orbFrontPick.hit;

            var orbBackPick = this.scene.pickWithRay(this._rayOrbBack);
            var orbBackHit = false;
            if (orbBackPick) orbBackHit = orbBackPick.hit;

            var orbLeftPick = this.scene.pickWithRay(this._rayOrbLeft);
            var orbLeftHit = false;
            if (orbLeftPick) orbLeftHit = orbLeftPick.hit;

            var orbRightPick = this.scene.pickWithRay(this._rayOrbRight);
            var orbRightHit = false;
            if (orbRightPick) orbRightHit = orbRightPick.hit;

            var orbUpPick = this.scene.pickWithRay(this._rayOrbUp);
            var orbUpHit = false;
            if (orbUpPick) orbUpHit = orbUpPick.hit;

            var orbDownPick = this.scene.pickWithRay(this._rayOrbDown);
            var orbDownHit = false;
            if (orbDownPick) orbDownHit = orbDownPick.hit;
   
                if(distance <= 1) {
                   this.play_shrink();
                   console.log('ABSORB!!!');
                }
                if(distance <= 0 || distance >= maxFollow){
                    //orb.setEnabled(false);
                }
                else {
                   // orb.setEnabled(true);
                   var factor = speedFactor;
                    dir._x = dir._x / factor;
                    dir._y = dir._y / factor;
                    dir._z = dir._z / factor;
                    if(orbBackHit && dir._z < 0) { 
                        dir._z = 0;
                    }
                    if(orbFrontHit && dir._z > 0) { 
                        dir._z = 0;
                    }
                    if(orbLeftHit && dir._x > 0) { 
                        dir._x = 0;
                    }
                    if(orbRightHit && dir._x < 0) { 
                        dir._x = 0;
                    }
                    if(orbUpHit && dir._y > 0) { 
                        dir._y = 0;
                    }
                    if(orbDownHit && dir._y < 0) { 
                        dir._y = 0;
                    }
                    this.hitbox.position.addInPlace(dir);
                //    orb.rotation.addInPlace(dir);
                

            }

        }

}

}