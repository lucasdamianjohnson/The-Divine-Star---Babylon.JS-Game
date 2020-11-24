

export class BattleMessages 
{

	constructor()
	{
		this.scene = false;
		this.messages = [];
	}

	set_scene(scene)
	{
		this.scene = scene;
	}





	create_message(text,position,color)
	{




	var outputplane = BABYLON.Mesh.CreatePlane("outputplane", 8, this.scene, false);
	
	outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
	outputplane.material = new BABYLON.StandardMaterial("outputplane", this.scene);
	var x = position.x;
	var y = position.y;
	var z = position.z;
	outputplane.position.x = x;
	outputplane.position.y = y;
	outputplane.position.z = z;
	//outputplane.position.y += 2;
	outputplane.scaling.y = 0.4;
	outputplane.visibility = 0;
	outputplane.displayingtexture = false;
	var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, this.scene, true);
	outputplane.displayingtexture = outputplaneTexture;
	outputplaneTexture.hasAlpha = true;

var ctx = outputplaneTexture.getContext();

outputplaneTexture.fillStyle = 'transparent'; 
	outputplane.material.opacityTexture = outputplaneTexture;
	outputplane.material.diffuseTexture = outputplaneTexture;
	//outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
	//outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
	outputplane.material.backFaceCulling = false;

	outputplaneTexture.drawText(text, null, 50, "bold 60px verdana", color, null);

	

		//this.messages.push(outputplane);





	var fadeinkeys = [];
    var fadein = new BABYLON.Animation("animation", "visibility", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
   
                                                                 BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    fadeinkeys.push({
        frame: 0,
        value: 0
    });

    fadeinkeys.push({
        frame: 5,
        value: 1
    });

var moveupkeys = [];
 var moveup = new BABYLON.Animation("animation", "position.y", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
   
                                                                 BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    var current_y = outputplane.position.y;
    moveupkeys.push({
        frame: 0,
        value: current_y
    });

    moveupkeys.push({
        frame: 50,
        value: current_y + 10
    });
var rotatekeys = [];
 var rotate = new BABYLON.Animation("animation", "rotation.y", 50, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
   
                                                                 BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var current_y = outputplane.rotation.y;
    rotatekeys.push({
        frame: 0,
        value: current_y - .5
    });

    rotatekeys.push({
        frame: 15,
        value: current_y + .5
    });
  rotatekeys.push({
        frame: 30,
        value: current_y
    });
                



    fadein.setKeys(fadeinkeys);
    moveup.setKeys(moveupkeys);
    rotate.setKeys(rotatekeys);

    outputplane.animations.push(fadein);
    outputplane.animations.push(moveup);
    outputplane.animations.push(rotate);
    //animation.play();	
    this.scene.beginAnimation(outputplane, 0, 50, false);
   // var idle_animation = new BABYLON.AnimationGroup("message");
   // idle_animation.addTargetedAnimation(animation, parent);



  // idle_animation.normalize(0, 100);


 // idle_animation.play();





		setTimeout(function(){
			outputplane.dispose();
		}, 4000);

	}

}