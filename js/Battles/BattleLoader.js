
export class BattleLoader
{


	constructor(sceneManager,dataManager,teamdata,battleManager,team,feartypes,playerhud)
	{
		this.sceneManager = sceneManager;
		this.dataManager = dataManager;
		this.battleManager = battleManager;
		this.team = team;
		this.teamdata = teamdata;
		this.feartypes = feartypes;
		this.playerhud = playerhud;
		this.sceneManager.set_battle_loader(this);
		this.is_loaded = false;
		this.scene = false;	
		this.camera_intro_animation = false;
	}

	is_battle_loaded()
	{
		return this.is_loaded;
	}

	clear_battle_loaded()
	{
		this.is_loaded = false;
	}


create_anims()
{

 console.log('called creat anims!');
 console.log(this.scene.camera);
  var camera_intro_keys = [];
  var camera_intro = new BABYLON.Animation("camera-intro", "position.x", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);


//ligth out keys
   camera_intro_keys.push({
        frame: 0,
        value: 15
    });

  
    camera_intro_keys.push({
        frame: 15,
        value: 20
    });
    camera_intro.setKeys(camera_intro_keys);
  var camera_intro_ykeys = [];
  var camera_introy = new BABYLON.Animation("camera-intro", "position.y", 15, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);


//ligth out keys
   camera_intro_ykeys.push({
        frame: 0,
        value: 5
    });

  
    camera_intro_ykeys.push({
        frame: 15,
        value: 7
    });
    camera_introy.setKeys(camera_intro_ykeys);


    this.scene.camera.animations.push(camera_intro);
    this.scene.camera.animations.push(camera_introy);
//this.scene.animations.push(camera_intro);
this.camera_intro_animation = camera_intro;

}

start_battle()
{

	this.scene.beginAnimation(this.scene.camera, 0, 15, false);
	//.play(false);
	//console.log(	this.camera_intro_animation);
}




	load_battle(data,scene,fearspace_data)
	{


		var battleLoader = this;

	    this.is_loaded = false;
	    this.scene = scene;
	    var camera = this.scene.camera;
		var space = data.space;
		var fearplayers = data.models;
		var teammodels = data.teammodels;

		var player_position = fearspace_data['player_position'];
		var fear_type_position = fearspace_data['fear_type_position'];
			camera.position.y = 5;
  			camera.position.x =15;
        	camera.position.z =5;
	
space['model'].forEach(function(mesh,index){
  		
      mesh.rotation.z = -Math.PI/ 2;
      if(mesh.name == '__root__') {
  mesh.position.z += 10;
  mesh.position.x -= 15;


      }

		if(mesh.name == 'camera-look-at'){
      mesh.position.x = 10;
      mesh.position.z = -6;
  			 camera.setTarget(mesh.position);
camera.lockedTarget = mesh; 

  			mesh.isVisible = false;
  			return;

  		}
  		if(mesh.name=='camera-position') {
  			
  			camera.position.y = 4;
  			camera.position.x =15;
        	camera.position.z =5;
  			mesh.isVisible = false;
       
  			return;
  		}
  		if(mesh.name =='player1-position'){
  			mesh.isVisible = false;
  

  			return;
  		}
  		if(mesh.name=='fear1-position'){
  		   mesh.isVisible = false;
  		   return;
  		}




  		if(mesh.name != 'player'){
  		//mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

  		}

  		


  		});


        var game_grid = {
        	'team' : [],
        	'feartypes' : []
        }

        var player_objects = [];

    teammodels.forEach(function(item,index){

     item.set_scaling_xyz(.3);
   //  item.set_position( player_position[index]["position"]);
   item.set_axis_y_rotation(player_position[index]["rotation"]);
     
      game_grid['team'].push({ id:teammodels[index]['id'],position:player_position[index]["position"]});
      player_objects.push(item);
    });


 	var feartypedata = [];


  var fear_objects = [];

    fearplayers.forEach(function(item,index){
     

         var fear_object = item;


         //fear_object.set_scaling_xyz(.8);
  	 var position = fear_type_position[index]["position"];
   //  fear_object.set_position(position);
    item.set_axis_y_rotation(.8);
     var data = fear_object.get_data();

     feartypedata.push(data);
     fear_objects.push(fear_object);

     game_grid['feartypes'].push({id:name,position:position});
  


    });





    //create battle selector 
    var battleselctor = BABYLON.MeshBuilder.CreateCylinder("battleselector", {height: 40, diameter: 1}, this.scene);
    battleselctor.isVisible = false;
    battleselctor.visibility = .5;
    var battleselctormaterial = new BABYLON.StandardMaterial("battleselector-material", this.scene);

    battleselctormaterial.diffuseColor = new BABYLON.Color4(.5, .04, .27,.8);
    battleselctor.position.y = 8;
    battleselctor.position.x = fear_type_position[0]["position"].x;
    battleselctor.position.z = fear_type_position[0]["position"].z;
    battleselctor.material = battleselctormaterial;

    

    //create activeteamselector selector 
    var activeteamselector = BABYLON.MeshBuilder.CreateCylinder("battleselector", {height: 40, diameter: 1}, this.scene);
    activeteamselector.isVisible = false;
    activeteamselector.visibility = .2;
    var activeteamselectormaterial = new BABYLON.StandardMaterial("activeteamselector-material", this.scene);

    activeteamselectormaterial.diffuseColor = new BABYLON.Color4(0, .5, 2.52,.8);
    activeteamselector.position.y = 8;
    activeteamselector.position.x = player_position[0]["position"].x - .1;
    activeteamselector.position.z = player_position[0]["position"].z - .6;
    activeteamselector.material = activeteamselectormaterial;
    this.battleManager.set_game_meshes(battleselctor,activeteamselector);

    this.battleManager.set_game_grid(game_grid);
     this.battleManager.set_scene(this.scene);
		this.create_anims();
	
			var currentteam = this.teamdata.get_data_value('teamdata','currentteam');

			var teamdata = this.teamdata.get_data('teamplayerdata');


			this.playerhud.update_team_battle_bar_html(currentteam,teamdata,feartypedata);


	    
      this.battleManager.set_teamdata(this.teamdata);
	    this.battleManager.set_team(this.team);
	    this.battleManager.set_player_hud(this.playerhud);
	    this.battleManager.set_fear_types(this.feartypes);
	    this.battleManager.set_players(player_objects,fear_objects);
      //this.playerhud.set_scene(scene);
	    

      this.is_loaded = true;
      this.battleManager.start_battle();
	}



}