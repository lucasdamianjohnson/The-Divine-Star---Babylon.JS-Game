import {PlayerSesnor} from './PlayerSensor.js'
import {TeamPlayers} from './TeamPlayers.js'
import {PlayerActions} from './PlayerActions.js'
export class PlayerObject
{



	constructor(){
		this.player_mesh = false;
		this.hitbox = false;
		this.player_moving = false;
		this.current_game_xy = {x:0,y:0};
		this.play_run_stop = false;
		this.anim_start = false;
		this.run_stop_buffer_current_steps = 0;
		this.run_stop_buffer_steps = 10;
		this.scene = false;
		this.inputMap = {};
		this.camera = false;
		this.movement_mode = 'joystick'
		this.camera_on_player = false;
		this.sensor = false;
		this.current_move_key = '';
		this.player_actions = new PlayerActions();
		this.scene_manager = false;
		this.teamdata = false;
		this.active = true;

		this.going_to = new BABYLON.Vector3(0,0,0);
		this.player_is_going = false;
		this.rotationQuaternionY = 0;
		//this.rotationQuaternionY = this.hitbox.rotationQuaternion.y;
		/*down,up,left,right,ur,ul,dr,dl*/
		this.facing = "down";
		this.player_can_move = true;
		this.playerhud = false;
		
	}


set_hello()
{
	return "hello";
}

set_player_hud(playerhud)
{
	this.playerhud = playerhud;
}



move_in_direction(direction)
{
/*		  
		    up
upleft	 \	|  /   upright
		   \|/
left  ------|------  right
		   /|\
downleft /	|  \ downright
		   down
*/

	this.player_is_going = true;
	//this.getAnim('idle',this.scene.animationGroups).stop();
	//this.getAnim('running',this.scene.animationGroups).play(true);
	var x = 0;
	var z = 0;
	
	switch (direction) {
		case "up":
			z = 1;
			break;
		case "down":
			z = -1;
			break;
		case "left":
			x = -1;
			break;
		case "right":
			x = 1;
			break;
		case "upleft":
			z = 1;
			x = -1;
			break;
		case "downleft":
			z = -1;
			x = -1;
			break;
		case "upright":
			z = 1;
			x = 1;
			break;
		case "downright":
			z = -1;
			x = 1;
			break;
		default:
			break;
	}

	
	if(direction != this.facing){
		this.player_can_move = false;
		console.log("ROTATE");
		console.log(this.facing);
		var angle = 0;
		if(this.facing == "down") 
		{
			switch (direction) {
				case "up":
					angle = degressToRadians(180);
					break;
				case "left":
					angle =degressToRadians(90);
					break;
				case "right":
					angle = degressToRadians(-90);
					break;
				case "upleft":
					angle = degressToRadians(135);
					break;
				case "downleft":
					angle = degressToRadians(45);
					break;
				case "upright":
					angle = degressToRadians(-135);
					break;
				case "downright":
					angle = degressToRadians(-45);
					break;
				default:
					break;
			}
		}
		if(this.facing == "up") 
		{
			switch (direction) {
				case "down":
					angle = degressToRadians(180);
					break;
				case "left":
					angle =degressToRadians(-90);
					break;
				case "right":
					angle = degressToRadians(90);
					break;
				case "upleft":
					angle = degressToRadians(-45);
					break;
				case "downleft":
					angle = degressToRadians(-135);
					break;
				case "upright":
					angle = degressToRadians(45);
					break;
				case "downright":
					angle = degressToRadians(135);
					break;
				default:
					break;
			}
		}
		if(this.facing == "left") 
		{
			switch (direction) {
				case "up":
					angle = degressToRadians(90);
					break;
				case "right":
					angle =degressToRadians(180);
					break;
				case "down":
					angle = degressToRadians(-90);
					break;
				case "upleft":
					angle = degressToRadians(45);
					break;
				case "downleft":
					angle = degressToRadians(-45);
					break;
				case "upright":
					angle = degressToRadians(135);
					break;
				case "downright":
					angle = degressToRadians(-135);
					break;
				default:
					break;
			}
		}
		if(this.facing == "right") 
		{
			switch (direction) {
				case "up":
					angle = degressToRadians(-90);
					break;
				case "left":
					angle =degressToRadians(180);
					break;
				case "down":
					angle = degressToRadians(90);
					break;
				case "upleft":
					angle = degressToRadians(-135);
					break;
				case "downleft":
					angle = degressToRadians(135);
					break;
				case "upright":
					angle = degressToRadians(-45);
					break;
				case "downright":
					angle = degressToRadians(45);
					break;
				default:
					break;
			}
		}

		if(this.facing == "upright") 
		{
			switch (direction) {
				case "up":
					angle = degressToRadians(-45);
					break;
				case "right":
					angle =degressToRadians(45);
					break;
				case "left":
					angle =degressToRadians(-135);
					break;
				case "down":
					angle = degressToRadians(135);
					break;
				case "upleft":
					angle = degressToRadians(-90);
					break;
				case "downleft":
					angle = degressToRadians(180);
					break;
				case "downright":
					angle = degressToRadians(90);
					break;
				default:
					break;
			}
		}

		if(this.facing == "upleft") 
		{
			switch (direction) {
				case "up":
					angle = degressToRadians(45);
					break;
				case "right":
					angle =degressToRadians(135);
					break;
				case "left":
					angle =degressToRadians(-45);
					break;
				case "down":
					angle = degressToRadians(-135);
					break;
				case "upright":
					angle = degressToRadians(90);
					break;
				case "downleft":
					angle = degressToRadians(-90);
					break;
				case "downright":
					angle = degressToRadians(180);
					break;
				default:
					break;
			}
		}


		if(this.facing == "downright") 
		{
			switch (direction) {
				case "up":
					angle = degressToRadians(-135);
					break;
				case "right":
					angle =degressToRadians(-45);
					break;
				case "left":
					angle =degressToRadians(135);
					break;
				case "down":
					angle = degressToRadians(45);
					break;
				case "upleft":
					angle = degressToRadians(180);
					break;
				case "downleft":
					angle = degressToRadians(90);
					break;
				case "upright":
					angle = degressToRadians(-90);
					break;
				default:
					break;
			}
		}

		if(this.facing == "downleft") 
		{
			switch (direction) {
				case "up":
					angle = degressToRadians(135);
					break;
				case "right":
					angle =degressToRadians(-135);
					break;
				case "left":
					angle =degressToRadians(45);
					break;
				case "down":
					angle = degressToRadians(-45);
					break;
				case "upleft":
					angle = degressToRadians(90);
					break;
				case "downright":
					angle = degressToRadians(-90);
					break;
				case "upright":
					angle = degressToRadians(180);
					break;
				default:
					break;
			}
		}

		this.facing = direction;
		
		var player = this;
		var anim_angle = angle/10;
		var player_roate_id = setInterval(player_roate_frame, 10);
		var counter = 0;
	
		function player_roate_frame() {
	
		  if (counter == 10) {
			
			console.log("DONE");

			console.log(player.facing);
			console.log(player.rotationQuaternionY);
			clearInterval(player_roate_id);
			player.rotationQuaternionY = player.hitbox.rotationQuaternion.y;
			player.player_can_move = true;
		  } else {
		
			counter++;
			//player.hitbox.rotate(BABYLON.Axis.Y, anim_angle, BABYLON.Space.WORLD);
		  }
	
		} 

	}
	//console.log(`${x} ${z}`);
	this.going_to = new BABYLON.Vector3(x * 15,0,z * 15);
	
}

set_team_data(teamdata){
	this.teamdata = teamdata;
	this.player_actions.set_team_data(teamdata);
}

setCameraOnPlayer(){
   console.log("set camera on player called!");
	




  //root camera parent that handles positioning of the camera to follow the player
  this._camRoot = new BABYLON.TransformNode("root");
  this._camRoot.position = new BABYLON.Vector3(0, 0, 0); //initialized at (0,0,0)

  //to face the player from behind (180 degrees)
  this._camRoot.rotation = new BABYLON.Vector3(0, 0, 0);
  
  
  //rotations along the x-axis (up/down tilting)
  var yTilt = new BABYLON.TransformNode("ytilt");
  //adjustments to camera view to point down at our player
  yTilt.rotation =  new BABYLON.Vector3(.8, 0, 0);
  console.log(yTilt.rotation);
  this._yTilt = yTilt;
  yTilt.parent = this._camRoot;

  //our actual camera that's pointing at our root's position
  
  this.camera = new BABYLON.UniversalCamera("cam", new BABYLON.Vector3(0, 0, 0), this.scene);
  //this.camera.lockedTarget =  this._camRoot.position;
  this.camera.fov = 0.47350045992678597;
  this.camera.parent = yTilt;

  this.scene.activeCamera = this.camera;
  
  this.camera_on_player = true;
  
  
return this.camera;

}

set_scene_manager(sceneManager)
{
	this.scene_manager = sceneManager;
	this.player_actions.set_scene_manager(sceneManager);
}
getHitbox()
{
	return this.hitbox;
}
isReady()
{
	return this.player_mesh != false;
}

getPosition()
{

	return this.hitbox.position;
}

setMessages(messages)
{
this.messages = messages;
this.sensor.setMessages(messages);
}

setScene(scene){
	this.scene = scene;
}
setCamera(camera){
   this.camera = camera;
}

setMovementMode(mode)
{
	this.movement_mode = mode; 
}

 getAnim(name,animations){

	var varreturn = null;
		animations.forEach(function(anim,index){
			
    					if(anim.name == name) {
    					
    						varreturn = anim;
    					}
    			
    		});
		return varreturn;
}



setModel(meshes){

	
  var hitbox = BABYLON.MeshBuilder.CreateCylinder("playerhitbox", {height: 1, diameter: 1.5}, this.scene);
	hitbox.position = new BABYLON.Vector3(0, 8, -3);
	hitbox.isPickable = false;
	hitbox.checkCollisions = false;
var playersesnor =  BABYLON.MeshBuilder.CreateSphere("sesnor", { diameter: 3}, this.scene);
	playersesnor.isPickable = false;
	hitbox.checkCollisions = false;
var player = this;
    playersesnor.position = new BABYLON.Vector3(0, .5, .1);
	playersesnor.isVisible = false;
		meshes.forEach(function(mesh,index){

		mesh.isVisible = true;
		mesh.isPickable = false;
		mesh.checkCollisions = false;




		if( mesh.material){
		
			if(mesh.material.albedoTexture){
			mesh.material.albedoTexture.hasAlpha = true;
		  console.log("UPDATE PLAYER SAMPING MODE!");
		  mesh.material.transparencyMode = BABYLON.Material.MATERIAL_ALPHATEST;
  
			mesh.material.useAlphaFromAlbedoTexture = true;
			mesh.material.albedoTexture.updateSamplingMode(BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR);
			  }
		}



		if(mesh.name == '__root__') {
		player.player_mesh = mesh;
		mesh.parent = hitbox;
	    
		mesh.position = new BABYLON.Vector3(0,-1,0);
		playersesnor.parent = hitbox;
		hitbox.isVisible = false;
		player.hitbox = hitbox;
		}

		});

		//this.camera.lockedTarget = this.hitbox;

	/*
	this.getAnim('idle',this.scene.animationGroups);													
	this.getAnim('idle',this.scene.animationGroups).enableBlending = true;
	this.getAnim('idle',this.scene.animationGroups).blendingSpeed = 0.01;
	this.getAnim('running',this.scene.animationGroups).enableBlending = true;
	this.getAnim('running',this.scene.animationGroups).blendingSpeed = 0.01;
	this.getAnim('running_stop',this.scene.animationGroups).enableBlending = true;
	this.getAnim('running_stop',this.scene.animationGroups).blendingSpeed = 0.01;
*/

		this.player_mesh.isVisible = false;
		//this.player_mesh.ellipsoid = new BABYLON.Vector3(1, 3, 2);
		//this.player_mesh.ellipsoidOffset = new BABYLON.Vector3(0, 0, 0);

		this.player_mesh.scaling.x = 	this.player_mesh.scaling.y = 	this.player_mesh.scaling.z = .3;


		//this.player_mesh.checkCollisions = true;


		this.sensor = new PlayerSesnor(this.scene,playersesnor);


		this.onObject = true;
		this.touchingWall = false;
		this.velocity = new BABYLON.Vector3();
		this.touching_mesh = false;
		this.playerFacing = 'S';
		this.jumpKeyDown = false;
		this.playerMoving = false;

		this.attatch_rays();
}


attatch_rays()
{

	var playerhitbox = this.hitbox;

	var rayCheck = new BABYLON.Ray();
	var rayCheckHelper = new BABYLON.RayHelper(rayCheck);
	rayCheckHelper.attachToMesh(this.hitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, 0), 1);
   this._rayCheck = rayCheck;
   // rayCheckHelper.show(this.scene);

	//right
	this._rayEast = new BABYLON.Ray();	
	var rayHelperEast = new BABYLON.RayHelper(this._rayEast);
	rayHelperEast.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(.5, 0, -.1), .9);
	
	
	//left
	this._rayWest = new BABYLON.Ray();
	var rayHelperWest = new BABYLON.RayHelper(this._rayWest);
	rayHelperWest.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(-.5, 0, -.1), .9);
	
	//back
	this._rayNorth = new BABYLON.Ray();
	var rayHelperNorth = new BABYLON.RayHelper(this._rayNorth);
	rayHelperNorth.attachToMesh(playerhitbox, new BABYLON.Vector3(-1, 0, 0), new BABYLON.Vector3(.7, 0, 0), .5);
	

	this._raySouth = new BABYLON.Ray();
	var rayHelperSouth = new BABYLON.RayHelper(this._raySouth);
	rayHelperSouth.attachToMesh(playerhitbox, new BABYLON.Vector3(-1, 0, 0), new BABYLON.Vector3(.1, 0, 0), .5);
	

	this._rayFront = new BABYLON.Ray();
	var rayHelperFront = new BABYLON.RayHelper(this._rayFront);
	rayHelperFront.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -.3), .2);
	
	//front
	this._rayBack = new BABYLON.Ray();
	var rayHelperBack = new BABYLON.RayHelper(this._rayBack);
	rayHelperBack.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, 1), .5);
	
	//foot
	this._rayFoot = new BABYLON.Ray();
	var rayHelperFoot = new BABYLON.RayHelper(this._rayFoot);
	rayHelperFoot.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, -.8, 0), .3);
	
	//head
	this._rayHead = new BABYLON.Ray();
	var rayHelperHead = new BABYLON.RayHelper(this._rayHead);
	rayHelperHead.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, .9, 0), .3);
	
	
	this._pHitNorth = false;
	this._pHitSouth = false;
	this._pHitBack = false;
	this._pHitFront = false;
	this._pHitEast = false;
	this._pHitWest = false;
	

	var showRay = false;


	this._rayDown1 = new BABYLON.Ray();
	var rayHelperDown1 = new BABYLON.RayHelper(this._rayDown1);
	rayHelperDown1.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(0, -.5, -.4), 2);
	
	this._rayDown2 = new BABYLON.Ray();
	var rayHelperDown2 = new BABYLON.RayHelper(this._rayDown2);
	rayHelperDown2.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(0, -.5, .4), 2);
	
	this._rayDown3 = new BABYLON.Ray();
	var rayHelperDown3 = new BABYLON.RayHelper(this._rayDown3);
	rayHelperDown3.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(-.4, -.5, 0), 2);
	
	this._rayDown4 = new BABYLON.Ray();
	var rayHelperDown4 = new BABYLON.RayHelper(this._rayDown4);
	rayHelperDown4.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(.4, -.5, 0), 2);
	
	if(showRay){
	rayHelperEast.show(this.scene);
	rayHelperWest.show(this.scene);
	rayHelperNorth.show(this.scene);
	rayHelperSouth.show(this.scene);
	rayHelperFront.show(this.scene);
	rayHelperBack.show(this.scene);
	rayHelperFoot.show(this.scene);
	rayHelperHead.show(this.scene);
	rayHelperDown1.show(this.scene);
	rayHelperDown2.show(this.scene);
	rayHelperDown3.show(this.scene);
	rayHelperDown4.show(this.scene);
	}



}


player_before_render()
{

	
	//check for walls 

  var pickCheck = this.scene.pickWithRay(this._rayCheck);
 // rayHelper.show(this.scene);
   if(pickCheck){
	   if(pickCheck.pickedMesh != null ) {
	 // console.log(pick2);
  // console.log(pickCheck.pickedMesh.name);


   

   if(this.touching_mesh != pickCheck.pickedMesh.name) {
	//console.log("showing message");
	//this.messages.setAndShowMessage('Your are touching ' + pickCheck.pickedMesh.name);
	
	if(pickCheck.pickedMesh.name.includes('green')) {
	this.playerhud.get_inventory().show();
	} else {
		//this.messages.setAndShowMessage('Your are touching ' + pickCheck.pickedMesh.name);
	}
	

   }

   this.touching_mesh = pickCheck.pickedMesh.name;


} else {

	this.touching_mesh = false;

	if(this.playerhud.get_inventory()){
	this.playerhud.get_inventory().hide();
	}

	//this.messages.hideMessage();
}
	   
   }


	var delta = this.scene.getEngine().getDeltaTime();

	var pick1 = this.scene.pickWithRay(this._rayEast);
    var hit1 = false;
    if (pick1) hit1 = pick1.hit;
   
    var pick2 = this.scene.pickWithRay(this._rayWest);
    var hit2 = false;
    if (pick2) hit2 = pick2.hit;

    var pick3 = this.scene.pickWithRay(this._rayNorth);
    var hit3 = false;
    if (pick3) hit3 = pick3.hit;

    var pick4 = this.scene.pickWithRay(this._raySouth);
    var hit4 = false;
    if (pick4) hit4 = pick4.hit;

    var pick5 = this.scene.pickWithRay(this._rayFront);
    var hit5 = false;
    if (pick5) hit5 = pick5.hit;

    var pick6 = this.scene.pickWithRay(this._rayBack);
    var hit6 = false;
    if (pick6) hit6 = pick6.hit;

    var pick7 = this.scene.pickWithRay(this._rayFoot);
    var hit7 = false;
    if (pick7) hit7 = pick7.hit;

    var pick8    = this.scene.pickWithRay(this._rayHead);
    var hit8 = false;
    if (pick8) hit8 = pick8.hit;

  //console.log(pick5);
    if(hit1 || hit2 || hit3 || hit4 || hit7 || hit8) {
		this.touchingWall = true;
	
       // console.log(playerFacing);

     this.pHitEast = hit1;
     this.pHitWest = hit2;
     this.pHitNorth = hit3;
     this.pHitSouth = hit4;
     this.pHitBack = hit6;
     if(hit5 || hit7 || hit8) {
		this.pHitFront = true;
     } else {
		this.pHitFront = false;
     }
    

      // console.log(`East ${hit1} West ${hit2} North ${hit3} South ${hit4} Front ${hit5} Back ${hit6}`);
    } else {
        this.touchingWall = false;
    }
    //check for floor
    if(this.velocity.y<=0){

    var dHit1 = false;
    var dHit2 = false;
    var dHit3 = false;
    var dHit4 = false;
	
	
   var meshCheck = (mesh) => {
		if(mesh.name.includes('physics')) {
			return true;
		} else {
		return false;
		}
   }

    var pick1 = this.scene.pickWithRay(this._rayDown1,meshCheck);
    if (pick1) dHit1 = pick1.hit;
    var pick2 = this.scene.pickWithRay(this._rayDown2,meshCheck);
    if (pick2) dHit2 = pick2.hit; 
    var pick3 = this.scene.pickWithRay(this._rayDown3,meshCheck);
    if (pick3) dHit3 = pick3.hit;
    var pick4 = this.scene.pickWithRay(this._rayDown4,meshCheck);
    if (pick4) dHit4 = pick4.hit; 
    //console.log(pick4);
        if(dHit1 || dHit2 || dHit3 || dHit4) {
			this.onObject = true;
	
        } else { 
        	this.onObject = false;
        }

    }

	//console.log(this.onObject);
    

	this.velocity.y -= delta / 3000;

    if (this.onObject) {
    this.velocity.y = Math.max(0, this.velocity.y)
    };

    var dpick = false;
    if(pick1 && pick1.pickedMesh != null) {
        dpick = pick1;
    }  else 
    if(pick2 && pick2.pickedMesh != null) {
        dpick = pick2;
    } else 
    if(pick3 && pick3.pickedMesh != null) {
        dpick = pick3;
    } else 
    if(pick4 && pick4.pickedMesh != null) {
        dpick = pick4;
    }

    if(pick7 && pick7.pickedMesh != null) {
        var footPick = pick7;

    }
  

   //console.log(dpick);


    if(dpick ) {

     if( dpick.pickedMesh.name.includes('movingPlatform') ) {
        var dir = dpick.pickedMesh.direction;
    //  console.log(dir);
        if(dir == 'up'){
			this.hitbox.position = new BABYLON.Vector3.Lerp(this.hitbox.position, new BABYLON.Vector3(this.hitbox.position.x , dpick.pickedMesh.position.y + 2.1, this.hitbox.position.z), 0.4);
        
        } else if (dir == 'down') {
            this.hitbox.position = new BABYLON.Vector3.Lerp(this.hitbox.position, new BABYLON.Vector3(this.hitbox.position.x , dpick.pickedMesh.position.y + 1.75, this.hitbox.position.z), 0.4);

        } else if (dir == 'south') {
           velocity.z = -.1;
        } else if (dir == 'north') {
            velocity.z = .1;
        } else if (dir == 'east') {
           velocity.x = .1;
        } else if (dir == 'west') {
            velocity.x = -.1;
        }
            

        }

       

        if( dpick.pickedMesh.name.includes('slope') ) {
            console.log('%c SLOPE ', 'background: red; color: white;');
            var dir =  dpick.pickedMesh.direction;
              //console.log(dir);
               console.log(playerFacing);
                if(this.playerMoving) {

                if( dir == "ew" ) {
                    if(this.playerFacing=='W') {
						this.velocity.y = -.06;
                    } else {
                        this.velocity.y = 0; 
                    }
                    
                }
                if( dir == "we" ) {
                    if(this.playerFacing=='E') {
						this.velocity.y = -.06;
                    }  else {
                        this.velocity.y = 0; 
                    }
                }
                if( dir == "sn" ) {
                    if(playerFacing=='S') {
						this.velocity.y = -.06;
                    }  else {
                        this.velocity.y = 0; 
                    }
                    
                }
                if( dir == "ns" ) {
                    if(this.playerFacing=='N') {
                
						this.velocity.y = -.06; 
                    //console.log('GOING DOWN!');
                    console.log('%c Going Down ', 'background: red; color: white;');
                    }  else {
                        this.velocity.y = 0; 
                        console.log('%c what? ', 'background: green; color: white;');
                    }
                    
                }
                } else {
                    //velocity.y = 0;
                }

        }


    } else {
        this.velocity.x = 0;
        this.velocity.z = 0;
    }
  
    if(footPick){
    //console.log(footPick.pickedMesh.name);

    if( footPick.pickedMesh.name.includes('slope')) {
        this.velocity.y = 0;
         
            var dir =  footPick.pickedMesh.direction;

            if(playerMoving) {
            if( dir == "ew" ) {
               this.hitbox.position= new BABYLON.Vector3.Lerp(this.hitbox.position, new BABYLON.Vector3(this.hitbox.position.x +.3, this.hitbox.position.y + .3, this.hitbox.position.z), 0.3);     
            
            }
            if( dir == "we" ) {
                this.hitbox.position= new BABYLON.Vector3.Lerp(this.hitbox.position, new BABYLON.Vector3(this.hitbox.position.x -.3, this.hitbox.position.y + .3, this.hitbox.position.z), 0.3);
            }
            if( dir == "sn" ) {
				this.hitbox.position= new BABYLON.Vector3.Lerp(this.hitbox.position, new BABYLON.Vector3(this.hitbox.position.x, this.hitbox.position.y + .3, this.hitbox.position.z + .3), 0.3);
           
            }
            if( dir == "ns" ) {
                this.hitbox.position= new BABYLON.Vector3.Lerp(this.hitbox.position, new BABYLON.Vector3(this.hitbox.position.x, this.hitbox.position.y + .3, this.hitbox.position.z -.3), 0.3);
            }
            } 

        }


    }




    if (this.jumpKeyDown && this.onObject) {
            this.velocity.y = 0.25;
			this.onObject = false;
			console.log('hey!!!');
		}


 // console.log(velocity.y);
    this.hitbox.moveWithCollisions(this.velocity);
    }
   






player_move(){

	this.keydown = false;
	this.speed = .05;
	
			// dash implementation Blackthornprod unity tutorial
			// not dashing
	
			if(this.hitbox){


		  if(this.inputMap["w"] || this.inputMap["ArrowUp"]){
			this.playerMoving = true;
                if(!this.touchingWall){
					this.hitbox.position.z+=0.1 + this.speed;
                } else {
                    var canMove = false;
                    if(this.playerFacing == "W") {
                    if(!this.pHitSouth) {
                        canMove = true;
                    }
                    }
                    if(this.playerFacing == "N") {
                        if(!this.pHitFront  && (!this.pHitEast) && (!this.pHitWest)) {
                            canMove = true;
                        }
                    }

                    if(canMove){
                    
						this.hitbox.position.z+=0.1 + this.speed; 
                    }
                }
                this.hitbox.rotation.y = 2*Math.PI/2;
                this.keydown=true;
                this.playerFacing = 'N';
                
            } else 
            if(this.inputMap["a"] || this.inputMap["ArrowLeft"]){
                this.playerMoving = true;
                if(!this.touchingWall){
					this.hitbox.position.x-=0.1 + this.speed;
                }  else {
                    var canMove = false;
                    if(this.playerFacing == "W") {
                    if(!this.pHitFront  && (!this.pHitEast) && (!this.pHitWest)) {
                        canMove = true;
                    }
                    }
                    if(this.playerFacing == "E") {
                    if(!this.pHitBack) {
                        canMove = true;
                    }
                    }
                    if(this.playerFacing == "N") {
                        if(!this.pHitNorth) {
                            canMove = true;
                        }
                    }
                    

                    if(canMove){
                    
						this.hitbox.position.x-=0.1 + this.speed;
                    }
                }
                this.hitbox.rotation.y = Math.PI/2;
               // this.keydown=true;
                
                this.playerFacing = 'W';
                
            } else 
            if(this.inputMap["s"] || this.inputMap["ArrowDown"]){
                this.playerMoving = true;
                if(!this.touchingWall){
					this.hitbox.position.z-=0.1 + this.speed;
                }  else {
                    var canMove = false;
                    if(this.playerFacing == "S") {
                    if(!this.pHitFront && (!this.pHitEast) && (!this.pHitWest)) {
                        canMove = true;
                    }
                    if(this.pHitSouth && this.pHitWest && !this.pHitFront) {
                        canMove = true; 
                    }
                    if(this.pHitNorth && this.pHitEast && !this.pHitFront) {
                        canMove = true; 
                    }

                    }
                    if(this.playerFacing == "W") {
                    if(!this.pHitNorth) {
                        canMove = true;
                    }
                    }
                    if(this.playerFacing == "N") {
                        if(!this.pHitBack) {
                            canMove = true;
                        }
                    }
                    

                    if(canMove){
                        
                        this.hitbox.position.z-=0.1 + this.speed;
                    }
                }
                this.hitbox.rotation.y = 0;
                this.playerFacing = 'S';
                
            } else
            if(this.inputMap["d"] || this.inputMap["ArrowRight"]){
                this.playerMoving = true;
                if(!this.touchingWall){
                 
					this.hitbox.position.x+=0.1 + this.speed;
                }   else {
                    var canMove = false;
                    if(this.playerFacing == "E") {
                    if(!this.pHitFront && (!this.pHitEast) && (!this.pHitWest)) {
                        canMove = true;
                    }
                    }
                    if(this.playerFacing == "N") {
                    if(!this.pHitSouth) {
                        canMove = true;
                    }
                    }
                 
                    if(this.canMove){
                    
						this.hitbox.position.x+=0.1 + this.speed;
                    }
                }
				this.hitbox.rotation.y = 3*Math.PI/2;
                
          
                this.playerFacing = 'E';
            } else {
                this.playerMoving = false;
            }
     

	




			}
	
		
}

addcontrols(){

	this.inputMap ={};
	var player = this;

	this.scene.actionManager = new BABYLON.ActionManager(this.scene);
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
		player.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
		if (evt.sourceEvent.type == "keydown" && (evt.sourceEvent.key == "z")) {
			player.jumpKeyDown = true;
			player.do_action();
        }
        if (evt.sourceEvent.type == "keydown" && (evt.sourceEvent.key == "x")) {
            player.actionKeyDown = true;
        }
    }));
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
		player.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
		if (evt.sourceEvent.type == "keyup" && ( evt.sourceEvent.key == "z")) {
			player.jumpKeyDown = false;
			player.do_action();
        }
        if (evt.sourceEvent.type == "keyup" && ( evt.sourceEvent.key == "x")) {
            player.actionKeyDown = false;
            player.doingAction = false;
        }
    }));

}


getHitbox()
{
	return this.hitbox;
}

get_actions()
{
	return this.player_actions;
}
do_action()
{
		this.player_actions.do_action();
}


/*
 addcontrols(inputMap){

 	this.inputMap = inputMap;


this.scene.audioListenerPositionProvider = () => {
  // Returns a static position

  return this.hitbox.absolutePosition;
};



this.scene.onKeyboardObservable.add((kbInfo) => {


	if(this.active){

	  console.log(kbInfo.event.key);
     if(kbInfo.type ==  BABYLON.KeyboardEventTypes.KEYUP){
         if(kbInfo.event.key == 'x'){
         		this.sensor.check_objects('test');
         }
         if(kbInfo.event.key == 'z'){
         		this.do_action();
         }
     }

    if(kbInfo.type ==  BABYLON.KeyboardEventTypes.KEYDOWN){
	
		/*
         if(kbInfo.event.key == 'w' || kbInfo.event.key == 's' || kbInfo.event.key == 'ArrowUp' || kbInfo.event.key == 'ArrowDown'){
         	         this.player_moving = true;
         			 this.current_move_key = 'w'
         	        
        }

        if( this.current_move_key != 'w'){
        	if(kbInfo.event.key == 'a' || kbInfo.event.key == 'd' || kbInfo.event.key == 'ArrowLeft' || kbInfo.event.key == 'ArrowRight'){
        		 this.player_moving = true;
         		 this.current_move_key = 's'
        	}
		}
		*/


		/*
		if(kbInfo.event.key == 'w' || kbInfo.event.key == 'ArrowUp') {
			this.move_in_direction("up");
			
		}
		if(kbInfo.event.key == 'a' || kbInfo.event.key == 'ArrowLeft') {
			this.move_in_direction("left");
		}
		if(kbInfo.event.key == 'd' || kbInfo.event.key == 'ArrowRight') {
			this.move_in_direction("right");
		}
		if(kbInfo.event.key == 's' || kbInfo.event.key == 'ArrowDown') {
			this.move_in_direction("down");
		}

     }
    if(kbInfo.type ==  BABYLON.KeyboardEventTypes.KEYUP){


         if(kbInfo.event.key == 'w' || kbInfo.event.key == 's' || kbInfo.event.key == 'ArrowUp' || kbInfo.event.key == 'ArrowDown' ){
         		this.play_run_stop = true;
         		this.player_moving = false;
         		console.log('calling stop')
				 this.current_move_key = '';
				 this.stop_moving();
         }
         if( (kbInfo.event.key == 'a' || kbInfo.event.key == 'd'
         	|| kbInfo.event.key == 'ArrowLeft' || kbInfo.event.key == 'ArrowRight')
         	 && !(this.current_move_key == 'w')){
         	    console.log(this.current_move_key == 'w');
         		this.play_run_stop = true;
				 this.player_moving = false;
				 this.stop_moving();
         }


     }
  
}

});





	var gamepadManager = new BABYLON.GamepadManager();
gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{
    gamepad.onButtonDownObservable.add((button, state)=>{
        //Button has been pressed
 
        if(button == 9) {
        	var dis = document.getElementById('menu').style.display;
        	if(dis == 'block'){
        	document.getElementById('menu').style.display = 'none';
        	} else {
        	document.getElementById('menu').style.display = 'block';
        	}

        }
    })
    /*
    * right =  x->1
    * left =  x->-1
    * up = y->-1
    * down = y->1
    */


	/*
    gamepad.onleftstickchanged((values)=>{
    	var x = Math.floor(values.x);
    	var y = Math.floor(values.y);
    

    	if(x == 0 && y == 0) {
    	this.player_moving = false;
   
    	} else {
    	this.player_moving = true;
    	}
     	this.current_game_xy.x = x;
    	this.current_game_xy.y = y;
        //Left stick has been moved

       // moveplayer(values.x,values.y)
    })
     gamepad.onrightstickchanged((values)=>{
     	var x = Math.floor(values.x);
    	var y = Math.floor(values.y);
    	if(x != 0 && y != 0) {
    	this.player_moving = true;

    	} else {
    	this.player_moving = false;
    	}
    	this.current_game_xy.x = x;
    	this.current_game_xy.y = y;
        //Left stick has been moved

       // moveplayer(values.x,values.y)
    })
}
);


}

*/

/*
player_movement()
{
			if(this.player_moving){
		
		
				if(!this.anim_start){
				
			this.getAnim('idle',this.scene.animationGroups).stop();
				this.getAnim('running',this.scene.animationGroups).play(true);

					this.anim_start = true;
				}
				this.moveplayer();
			} else {
			this.hitbox.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
				this.hitbox.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
				if(this.play_run_stop){
					if(!this.anim_start){
			
						this.getAnim('running',this.scene.animationGroups).stop();
						this.getAnim('running_stop',this.scene.animationGroups).play(true);
						this.anim_start = true;
					}

					if(this.run_stop_buffer_current_steps < this.run_stop_buffer_steps){
						this.run_stop_buffer_current_steps++;
					} else if(this.run_stop_buffer_current_steps == this.run_stop_buffer_steps) {
						this.run_stop_buffer_current_steps = 0;
						this.play_run_stop = false;

					}

				} else {
					this.getAnim('running_stop',this.scene.animationGroups).stop();
					this.getAnim('idle',this.scene.animationGroups).play(true);
					this.anim_start = false;	
				}
			}	
}


    moveplayer(x,y){
		

			if(this.hitbox){



			    if(y == -1  || this.inputMap["w"] || this.inputMap["ArrowUp"]){
			    			rotate_angle = .02;
			    }
					
	   var rotate_angle = .08;
   if(x == -1 || this.inputMap["a"] || this.inputMap["ArrowLeft"]){
					// this.player_mesh.parent.rotate(BABYLON.Axis.Y, -.03, BABYLON.Space.WORLD);
					 this.hitbox.rotate(BABYLON.Axis.Y, -rotate_angle, BABYLON.Space.WORLD);
					    } 
					
					  if(x == 1 || this.inputMap["d"] || this.inputMap["ArrowRight"]){			  
					  // this.player_mesh.parent.rotate(BABYLON.Axis.Y, .03, BABYLON.Space.WORLD);
					     this.hitbox.rotate(BABYLON.Axis.Y, rotate_angle, BABYLON.Space.WORLD);
					    }

    if((x == 1 && y == 0) || (x == -1 && y == 0)){
					  
					    			if(!this.anim_start){
					    				//this.play_run_stop  = true;
					    			getAnim('idle',scene.animationGroups).play(true);
					    			return;
					    			}
					    		}

				

					    	var xx = this.player_mesh.forward.x * 0;
					       var z = this.player_mesh.forward.z * 0;

					    if(y == -1  || this.inputMap["w"] || this.inputMap["ArrowUp"]){
 				  this.hitbox.physicsImpostor.setLinearVelocity(this.player_mesh.forward.scaleInPlace(1));
							this.anim_start = true;
	
					
					   }  else  if(y == 1 || this.inputMap["s"] || this.inputMap["ArrowDown"]){
			
					  	this.hitbox.physicsImpostor.setLinearVelocity(this.player_mesh.forward.scaleInPlace(-1));

					    } 

					     else {
					    
					     this.anim_start = false;
					  
					 	this.hitbox.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
					 	 this.hitbox.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));

					        }


					

		
}
}

*/





update()
{
	if(this.hitbox && this.scene){
	
//this.sensor.update();



			if(this.camera_on_player){

				//console.log(this._camRoot.position);
			//	var centerPlayer = this.hitbox.position.y + 2;
			//	this._camRoot.position = new BABYLON.Vector3.Lerp(this._camRoot.position, new BABYLON.Vector3(this.hitbox.position.x , centerPlayer + 15, this.hitbox.position.z - 15), 0.4);
			   
		} 


	}



}



}