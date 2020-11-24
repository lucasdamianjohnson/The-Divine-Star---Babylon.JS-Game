document.getElementById("body").innerHTML = "<h1>TESTING</h1>";
import {AssetManager} from './js/AssetManager.js'
import {SceneManager} from './js/SceneManager.js'
import {PlayerObject} from './js/player/PlayerObject.js'
import {Messages} from './js/UI/Messages.js'
import {PlayerHUD} from './js/UI/PlayerHUD.js'
import {TeamData} from './s/Data/TeamData.js'
import {FearTypes} from './js/Fear/FearTypes.js'
import {DataManager} from './js/Data/DataManager.js';
import {TeamObject} from './js/Team/TeamObject.js';
import {BattleManager} from './js/Battles/BattleManager.js';
import {BattleLoader} from './js/Battles/BattleLoader.js';
//import {PlayerSesnor} from './js/player/PlayerSensor.js'

function animate_player_hud()
{
  console.log("animate player hud");
var color1 = "ec2d2d",color2 = "eca62de7",color3="f9e50de7",color4="2ad24be7",color5="4d34a7e7",color6="a134a7e7",color7="e576ebe7";
var duration = 1500;
var id = "player-hud";

animate(id,color1,color2,duration);
setTimeout(() => {
  animate(id,color2,color3,duration);
}, duration*2);
setTimeout(() => {
  animate(id,color3,color4,duration);
}, duration*3);
setTimeout(() => {
  animate(id,color4,color5,duration);
}, duration*4);
setTimeout(() => {
  animate(id,color5,color6,duration);
}, duration*5);
setTimeout(() => {
  animate(id,color6,color7,duration);
}, duration*6);
setTimeout(() => {
  animate(id,color7,color1,duration);
}, duration*7);
setTimeout(() => {
  animate_player_hud();
}, duration*8);
}


var dataManager = new DataManager();




var teamdata = new TeamData();

var player = new PlayerObject();
var messages = new Messages();
var playerhud = new PlayerHUD();

document.getElementById("body").innerHTML = "<h1> player says"+player.say_hello()+"</h1>";
playerhud.set_data_manager(dataManager);
teamdata.set_player_hud(playerhud);

var fear_types = new FearTypes(dataManager);
var team = new TeamObject(teamdata,dataManager);
var assettManager = new AssetManager(dataManager,team,fear_types);
var sceneManager = new SceneManager(assettManager,dataManager,teamdata);
var battleManager = new BattleManager(sceneManager);
var battleLoader = new BattleLoader(sceneManager,dataManager,teamdata,battleManager,team,fear_types,playerhud);

  sceneManager.set_player_hud(playerhud);

  animate_player_hud();

messages.showAndHideMessage('Hello from Divine Star');



window.addEventListener('DOMContentLoaded', function(){
            // get the canvas DOM element
            var canvas = document.getElementById('renderCanvas');

            // load the 3D engine
            var engine = new BABYLON.Engine(canvas, true);

            sceneManager.set_game_engine(engine);
            sceneManager.set_game_canvas(canvas);

var createScene = function () {





	//var sensor = new PlayerSesnor();
	//sensor.callMe();
    // Setup the scene
    var scene = new BABYLON.Scene(engine);
 
scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var gravityVector = new BABYLON.Vector3(0,-9.8, 0);
	var physicsPlugin = new BABYLON.CannonJSPlugin();
	scene.enablePhysics(gravityVector, physicsPlugin);
    scene.collisionsEnabled = true;

window.addEventListener("click", function () {
   // We try to pick an object
   

});
	
/*
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.attachControl(canvas, true);
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
	
 camera.attachControl(canvas, true);
*/


    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), scene);
    camera.radius = 1; // how far from the object to follow
    camera.heightOffset = 3; // how high above the object to place the camera

    camera.cameraAcceleration = 0; // how fast to move
    camera.maxCameraSpeed = 20; // speed limit
     scene.activeCamera = camera;

//var blackandwhite = new BABYLON.BlackAndWhitePostProcess("bandw", 1, camera);
//console.log(blackandwhite.degree = .4);
 //new BABYLON.FxaaPostProcess("fxaa", 1.0, camera);
  

     camera.attachControl(canvas, false);


    /*
     var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(3, .5, 1.5), scene);
    var light1 = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, .5, 1.5), scene);
    var light2 = new BABYLON.PointLight("Omni2", new BABYLON.Vector3(5.5, 1, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 0, 1);
    light0.specular = new BABYLON.Color3(1, 0, 1);
    light0.intensity = 2;
    light1.intensity = 10;
    light2.intensity = 5;
    light1.diffuse = new BABYLON.Color3(1, 0, 0);
    light1.specular = new BABYLON.Color3(1, 0, 0);

    light2.diffuse = new BABYLON.Color3(0, 0, 1);
    light2.specular = new BABYLON.Color3(0, 0, 1);


*/
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    //engine.enableOfflineSuppourt = false;

 


   

    BABYLON.SceneLoader.ImportMesh("","./assets/", "level.babylon", scene, function (meshes,particles,skeltons) {
 

  		meshes.forEach(function(mesh,index){

				mesh.checkCollisions = true;

  		if(mesh.name != 'player'){
  		mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        mesh.physicsImpostor.physicsBody.collisionFilterGroup = 1| 2;
        console.log(mesh.physicsImpostor.physicsBody.collisionFilterGroup );
  		}

  		


  		});


        
    });


 
    var inputMap ={};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
 





  // Fountain object

assettManager.set_scene(scene);
assettManager.load_soudnds();


player.set_team_data(teamdata);
scene.interactive_objects = new Array();





fear_types.set_scene(scene);
fear_types.set_player(player);
fear_types.set_asset_manager(assettManager);
fear_types.set_team_data(teamdata);
player.set_scene_manager(sceneManager);
sceneManager.set_player(player);
fear_types.create(0,'fearorb',new BABYLON.Vector3(2, .6, 0),dataManager.get_data_value('fearorbtypes','7thoctavepurple'));

var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("test", {height: .8, diameter: .5}, scene);
    cylinder2.position = new BABYLON.Vector3(.5, 1, 0);
    scene.test = cylinder2;

scene.interactive_objects.push(cylinder2);
//player.setCameraOnPlayer(false);
Promise.all([
      BABYLON.SceneLoader.ImportMesh(null,"./assets/players/Mage/", "Mage.glb", scene, function (meshes,particles,skeltons)  {
 		player.setScene(scene);
 		player.setCamera(camera)


 		player.setModel(meshes);


    player.addcontrols(inputMap);

	player.setMovementMode('keyboard');

	player.setMessages(messages);

    }),

]).then(() => {

});








    // Game/Render loop
    scene.onBeforeRenderObservable.add(()=>{

	
    	player.update();
  
    })


    scene.mouse_down = false;
    scene.can_mouse_check = true;
    scene.can_mouse_check_timer = false;
    scene.onBeforePhysicsObservable.add(function() {
     
     if(player.isReady()){
 fear_types.physicsupdate();
 }

    });


    scene.onPointerObservable.add((pointerInfo) => {

      if(scene.can_mouse_check){

        if(scene.mouse_down)
        {
            console.log("moving mouse!!");
            var direction =  get_screen_control_move_direction(pointerInfo)
            console.log(direction);
            if(player.direction != direction) {
            player.move_in_direction(direction); 

            }
        }
        scene.can_mouse_check = false;
      } else {
          if(!scene.can_mouse_check_timer)
          {
            scene.can_mouse_check_timer = true;
            setTimeout(() => {
              scene.can_mouse_check = true;
              scene.can_mouse_check_timer = false;
          }, 500);
        }
      }


    },BABYLON.PointerEventTypes.POINTERMOVE);


    scene.onPointerObservable.add((pointerInfo) => {
           // console.log(pointerInfo);
          //  console.log(pointerInfo);
         //   console.log(pointerInfo.pickInfo.pickedPoint);
         var direction =  get_screen_control_move_direction(pointerInfo)

      console.log(direction);
      scene.mouse_down = true;

         //   var point = pointerInfo.pickInfo.pickedPoint;
         player.move_in_direction(direction);
    },BABYLON.PointerEventTypes.POINTERDOWN);



    scene.onPointerObservable.add((pointerInfo) => {
           // console.log(pointerInfo);
            //console.log(pointerInfo);
            console.log("POINTER UP!");
          player.stop_moving();

          scene.mouse_down = false;

         //   var point = pointerInfo.pickInfo.pickedPoint;
         //   player.set_position(point.x,point.z);
    },BABYLON.PointerEventTypes.POINTERUP);



 scene.onPointerObservable.add (function(evt) {
  //console.log(evt);
  },BABYLON.PointerEventTypes.POINTERDOWN)

    playerhud.set_scene(scene);

    return scene;

};




window.addEventListener('click',function(){
//when you click the window the game will unmute
 // document.getElementById('babylonUnmuteIconBtn').click();
});


            // call the createScene function
            var scene = createScene();
           //var fearscene1 = createFearScene1();
            // run the render loop

      
            sceneManager.add_scene('level','1',scene);
           // sceneManager.add_scene('fear','fearscene1',fearscene1);
            sceneManager.set_active_scene('level','1')

            engine.runRenderLoop(function(){
               // scene.render();
                //fearscene1.render();
                sceneManager.render_active_scene();
            });

            // the canvas/window resize event handler
            window.addEventListener('resize', function(){
                engine.resize();
            });
        });