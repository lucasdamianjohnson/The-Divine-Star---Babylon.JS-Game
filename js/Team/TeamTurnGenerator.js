

export class TeamTurnGenerator
{
	
	constructor(teamdata)
	{

		this.teamdata = teamdata;
	
	}


	generate_turn_data(teammember,action,fear,data)
	{


		var memberstats = this.teamdata.get_data_value('teamplayerdata',teammember);
		var strength = memberstats['Strength'];
		var love_impact = strength + getRandomNumber(0,3);
		var speed = memberstats['Speed'];
		var intelligence = memberstats['Intelligence'];
		var wisdom  = memberstats['Wisdom'];
		var flexibility  = memberstats['Flexibility'];
		var accuracy  = memberstats['Accuracy'];
		var luck  = memberstats['Luck'];




		var turndata = {
			'action' : action,
			'love_impact' : love_impact,
			'speed' : speed,
			'intelligence' : intelligence,
			'luck' : luck,
			'wisdom' : wisdom,
			'flexibility' : flexibility,
			'accuracy' : accuracy,
 			'move' : '',
			'target' : fear,
			'id' : teammember,
			'duration' : 1000
		}

		if(action == 'Cast Spell') 
		{
			turndata['spell'] = data;
		}

		if(action == 'Summon') 
		{
			turndata['summon'] = data;
		}

		if(action == 'Use Item') 
		{
			turndata['item'] = data;
		}


		return turndata;
	}



}