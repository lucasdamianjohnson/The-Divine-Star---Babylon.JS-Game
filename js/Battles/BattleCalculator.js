export class BattleCalculator
{



	constructor()
	{




	}




	calculate_impact(type,turndata,otherentitydata)
	{
	

		if(type == 'team'){
		var impact = turndata['love_impact'];
		}
		if(type == 'fear'){
		var impact = turndata['fear_impact'];
		}

		var tspeed = turndata['speed'];
		var tintelligence = turndata['intelligence'];
		var twisdom  = turndata['wisdom'];
		var tflexibility  = turndata['flexibility'];
		var taccuracy  = turndata['accuracy'];
		var tluck  = turndata['luck'];



		
		var armor = otherentitydata['Armor'];
		var speed = otherentitydata['Speed'];
		var intelligence = otherentitydata['Intelligence'];
		var wisdom  = otherentitydata['Wisdom'];
		var flexibility  = otherentitydata['Flexibility'];
		var accuracy  = otherentitydata['Accuracy'];
		var luck  = otherentitydata['Luck'];


		var multihitchance = 0;
		var possiblehits = 0;
		var misschance = 60;
		//if player is faster
		if( (speed - tspeed) < 0) {
		
			var speeddif = tspeed - speed;
			multihitchance += (speeddif / 2) * 5;
			misschance -= (speeddif / 2) * 7;
			possiblehits++;

		}
		if( (speed - tspeed) == 0) {

			multihitchance += 5;
			misschance -= 20;

		}

		//if player is more intelligent
		if( (intelligence - tintelligence) < 0 ) {

			var intelligencedif = tintelligence - intelligence;
			multihitchance += (intelligencedif / 2) * 5;
			misschance -= (intelligencedif / 2) * 7;
			possiblehits++;


		}

		if( (intelligence - tintelligence) == 0 ) {

			multihitchance += 5;
			misschance -=  15;
		}


		//if player is more flexibile 
		if( (flexibility - tflexibility) < 0 ) {

			var flexibilitydif = tflexibility - flexibility;
			multihitchance += (flexibilitydif / 2);
			misschance -= (flexibilitydif / 2);
			possiblehits++;


		}

		if( (flexibility - tflexibility) == 0 ) {

			multihitchance += 5;
			misschance -= 15;

		}
		


		multihitchance += (taccuracy / 2) * 5;
		misschance -= (taccuracy / 2) * 7;
		console.log(`${multihitchance} ${possiblehits} misschance: ${misschance}`);

		if(!getRandomOdds(multihitchance)){
			possiblehits = 1;

		}
		if(getRandomOdds(misschance)){
			possiblehits = 0;

		}


		impact = impact -= armor;


		var totalimpact = impact * possiblehits;
		return {
			hits: possiblehits,
			totalimpact: totalimpact
		}

	}



}