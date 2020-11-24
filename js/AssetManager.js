


export class AssetManager
{
	
constructor(dataManager,team,feartypes)
{
	this.team = team;
	this.featypes = feartypes;

	this.sounds = {};
	this.modles = {};
	this.scene = false;
	this.team_models ={};
	this.feartype_models = {};
	this.fear_spaces = {};
	this.dataManager = dataManager;
	this.fear_types_loaded = false;
	this.fear_space_loaded = false;
	this.team_models_loaded = false;
	this.loaded_battle_assets = {
		space: false,
		models: false,
		teammodels: false,
	}
}

set_scene(scene)
{
	this.scene = scene;
}


get_sound(sound_name)
{
	return this.sounds[sound_name];
}

load_soudnds()
{
this.sounds['fearwub'] =	 new BABYLON.Sound("fearorb", "./assets/sounds/fearball/fearwub.wav", this.scene, null, {
  loop: true,
  autoplay: true,
  spatialSound: true,
  distanceModel: "exponential",
  rolloffFactor: 1.5
});
this.sounds['fear_orb_die'] =	 new BABYLON.Sound("fear_orb_die", "./assets/sounds/fearball/fearorbdie.wav", this.scene, null, {
  loop: false,
  autoplay: false,
  spatialSound: true,
  distanceModel: "exponential",
  rolloffFactor: 1.5
});
}




load_team_models(team,player_position)
{

this.team_models_loaded = false;
var assets = this;
var var_return = [];
team.forEach( function(item, index) {

	if(typeof assets.team_models[item] != 'undefined' && assets.team_models[item] != false) {
		var_return.push({id:item,model:assets.feartype_models[item]} )
	} else {
			 assets.team_models[item] = false;
  BABYLON.SceneLoader.ImportMesh(null,`./assets/players/${item}/`, `${item}.glb`, assets.scene, function (meshes,particles,skeltons)  {
   			 assets.team_models[item] = true;
   			 var hitbox = BABYLON.MeshBuilder.CreateCylinder("playerhitbox", {height: 10, diameter: 4}, assets.scene);
   			 hitbox.isVisible = false;
   			 hitbox.children = [];
   			 meshes.forEach(function(item,index){
   			 	item.parent = hitbox;
					hitbox.children.push(item);
					//item.scaling.x = item.scaling.z = item.scaling.y = .5;
					if(item.material){
						item.material.albedoTexture.updateSamplingMode(BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR);
						}
   			 });
   			 var position = player_position[index]['position'];
   		     hitbox.position = position;

   			 var_return.push(assets.team.create_team_player(item,hitbox,assets.scene));
   });


	}


});

var timeout = function(){ setTimeout(function(){

var allloaded = true;
team.forEach( function(item, index) {

	if(typeof assets.team_models[item] == 'undefined' || assets.team_models[item] == false) {
		allloaded = false;

	}

});
assets.team_models_loaded = allloaded;
if(!allloaded){
timeout();
} else {

var new_return = [];
team.forEach( function(newreturn, index) {

var_return.forEach( function(player, index) {
	if(player.get_name() == newreturn){
		new_return.push(player);
	}
});


});
var_return = null;

assets.loaded_battle_assets.teammodels = new_return;
clearTimeout(timeout);
}

},
100);

}

timeout();

}

loadfear_space(space)
{
	var var_return = false;
this.fear_space_loaded = false;
if(typeof this.feartype_models[space] != 'undefined' && this.feartype_models[space] != false){
	this.fear_space_loaded = true;
	var_return = this.fear_spaces[space];
} else {
	this.feartype_models[space] = false;
	var assets = this;
 BABYLON.SceneLoader.ImportMesh("",`./assets/spaces/fearspaces/${space}/`, `${space}.glb`, this.scene, function (meshes,particles,skeltons) {
			 assets.fear_spaces[space] = true;
			 
			 meshes.forEach(function(mesh,index){
			 if(mesh.material){
			
				if( mesh.material.albedoTexture){
		
			// mesh.material.albedoTexture.hasAlpha = true;
			 console.log("ALPHA MODE");
			console.log(mesh.material);
			  mesh.material.albedoTexture.hasAlpha = true;
			 // console.log(mesh.material.albedoTexture.hasAlpha);
			mesh.material.transparencyMode = BABYLON.Material.MATERIAL_ALPHATEST;
			console.log(mesh.material.useAlphaFromAlbedoTexture);
			  mesh.material.useAlphaFromAlbedoTexture = true;
			  mesh.material.albedoTexture.updateSamplingMode(BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR);
				}
			
				}
			});

 			var_return = {id:space,model:meshes};
 	});

}


var timeout = function() {
setTimeout(function(){

var allloaded = false;

	if(typeof assets.fear_spaces[space] != 'undefined' && assets.fear_spaces[space] != false) {
		allloaded = true;
	}

assets.fear_space_loaded  = allloaded;
if(!allloaded){
timeout();
} else {
assets.loaded_battle_assets.space = var_return;
clearTimeout(timeout);
}

},
100);

}
timeout();

}


loadfeartype_models(models,fear_positions)
{
this.fear_types_loaded = false;
var assets = this;
var var_return = [];
models.forEach( function(item, index) {
	var feartypedata = assets.dataManager.get_data_value('feartypes',item);
	var speicies = feartypedata['species'];
	var type = feartypedata['type'];


			 assets.feartype_models[index] = false;
  BABYLON.SceneLoader.ImportMesh(null,`./assets/feartypes/${speicies}/${type}/${item}/`, item +".glb", assets.scene, function (meshes,particles,skeltons)  {
   			 assets.feartype_models[index] = true;
   		
   			

   			var hitbox = BABYLON.MeshBuilder.CreateCylinder("fearhitbox", {height: 10, diameter: 4}, assets.scene);
   			 hitbox.isVisible = false;
   			 hitbox.children = [];
   			 meshes.forEach(function(mesh,index){
   			 	mesh.parent = hitbox;
					//hitbox.children.push(mesh);
					
				
					if(mesh.material){
						mesh.material.albedoTexture.updateSamplingMode(BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR);
						}
						 mesh.scaling.x = 	mesh.scaling.y = 	mesh.scaling.z = .5;
						 hitbox.rotation.y = Math.PI / 2;
						 //mesh.rotation.y = Math.Pi / 2;
					    // hitbox.rotation.x = Math.Pi /2;




   			 });
   			 //fear_type_position
   			 var position = fear_positions[index]['position'];
   			 hitbox.position = position;
   			 var fear_object =  assets.featypes.create_fear(hitbox,item);

   			  var_return.push({index: index, object: fear_object});
   });


	


});



var timeout = function(){ setTimeout(function(){


var allloaded = true;
models.forEach( function(item, index) {
	if(typeof assets.feartype_models[index] == 'undefined'|| assets.feartype_models[index] == false) {
		allloaded = false;
	}

});
assets.fear_types_loaded = allloaded;
if(!allloaded){

timeout();
} else {
var new_return = [];
models.forEach( function(fear, index) {

var_return.forEach( function(oldreturn, i) {
	if(oldreturn.index == index){
		new_return.push(oldreturn.object);

	}
});


});
var_return = null;

assets.loaded_battle_assets.models = new_return;
clearTimeout(timeout);
}

},
100);

}

timeout();



}

get_loaded_battle_assets()
{
	return this.loaded_battle_assets;
}

clear_battle_assets_load()
{
	this.fear_space_loaded = false;
	this.fear_types_loaded = false;
	this.team_models_loaded = false;
}

is_battle_assets_loaded()
{
	return this.fear_types_loaded && this.fear_space_loaded && this.team_models_loaded
}




}