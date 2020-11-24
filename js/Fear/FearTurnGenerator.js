



export class FearTurnGenerator
{
	


	constructor(dataManager)
	{
 	this.dataManager = dataManager;
 	this.teamdata = false;
	}


	set_team_data(teamdata)
	{
		this.teamdata = teamdata;
	}


	get_turns(feartypes,currentteam)
	{
		

		var turn_data = [];

		var teamlength = currentteam.length;
		var turnGenerator = this;

		feartypes.forEach(function(item,index){
		var data = item.get_data();

		var speed = data['Speed'];
		var intelligence = data['Intelligence'];
		var wisdom  = data['Wisdom'];
		var flexibility  = data['Flexibility'];
		var accuracy  = data['Accuracy'];
		var luck  = data['Luck'];
		var totalspeed = speed +   getRandomNumber(0,3);

		var strength = data['Strength'];

		var fear_impact = strength +  getRandomNumber(0,2);

		var target = getRandomNumber(0,teamlength);

			turn_data.push({
				"fear_impact": fear_impact,
				'speed' : speed,
				'intelligence' : intelligence,
				'luck' : luck,
				'wisdom' : wisdom,
				'flexibility' : flexibility,
				'accuracy' : accuracy,
				"target" : target,
				"move" : '',
				"id" : 10,
				'duration' : 800

			});



		});




		return turn_data;

	}


	generate_turn()
	{

	}

}