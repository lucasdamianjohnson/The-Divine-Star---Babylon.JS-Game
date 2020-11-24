import {BattleMessages} from './BattleMessages.js';
import {BattleCalculator} from './BattleCalculator.js';
export class TurnExecuter
{
	constructor(battleManager)
	{
		this.battleManager = battleManager;

		this.teamturndata = false;
		this.fearturndata = false;
		this.team = false;
		this.feartypes = false;
		this.teamplayers = false;
		this.fearplayers = false;
		this.turngoing = false;
		this.current_team_turn = 0;
		this.current_fear_turn = 0;
		this.current_turn = 'team';
		this.current_game_turn = 0;
		this.current_max_turns = 0;
		this.playerhud = false;
		this.game_grid = false;

		this.scene = false;
		this.battlemessages = new BattleMessages();
		this.battlecalculator = new BattleCalculator();
	}
	set_game_grid(game_grid)
	{
		this.game_grid = game_grid;
	}
	set_scene(scene)
	{
		this.scene = scene;
		this.battlemessages.set_scene(scene);
	}

	set_player_hud(playerhud)
	{
		this.playerhud = playerhud;
	}

	set_turn_data(teamturn,fearturn){
		this.teamturndata = teamturn;
		this.fearturndata = fearturn;
	}

	start()
	{
	

/*
		this.teamplayers.forEach(function(item,index){
			//item.play_animation();
		});
		//this.teamplayers[0].play_animation();

		this.fearplayers.forEach(function(item,index){
		//item.play_animation();
		});
*/
		var turnexcuter = this;

		this.teamturns = [];
		this.teamturndata.forEach(function(item,index){
	    var duration = item.duration;
		var team_turn = function(callback){

			setTimeout(function(){
				
				
				setTimeout(function(){
					turnexcuter.turngoing = false;
					turnexcuter.run();
				},1000);

				callback();
			}
				,duration)

		};

			turnexcuter.teamturns.push(team_turn);
		});

		this.fearturns = [];
		this.fearturndata.forEach(function(item,index){
	    var duration = item.duration;
		var fear_turn = function(callback){

			setTimeout(function(){
				setTimeout(function(){
					turnexcuter.turngoing = false;
					turnexcuter.run();
				},1000);

				callback();
			}
				,duration)

		};

			turnexcuter.fearturns.push(fear_turn);
		});

		this.current_max_turns = this.fearturndata.length + this.teamturndata.length;



		this.run();
	}


	run_at_end_of_turn(callback,duration)
	{

		setTimeout(function(){
				callback();
			}
				,duration)

	}


	run()
	{
		if(this.current_game_turn < this.current_max_turns){


		if(!this.turngoing) {

			if(this.current_turn == 'team'){

			if(this.current_team_turn < this.teamturns.length){
			var target = this.teamturndata[this.current_team_turn].target;
			if(typeof this.fearplayers[target] == 'undefined')
			{
				console.log('find new targeT!!!');
				if(typeof this.fearplayers[target--] != 'undefined') {
					this.teamturndata[this.current_team_turn].target++;
				} else 
				if(typeof this.fearplayers[target++] != 'undefined') {
					this.teamturndata[this.current_team_turn].target--;
				} else {
				for(var i = 0; i < this.fearplayers.length; i++) {
					if(typeof this.fearplayers[i] != 'undefined') {
						this.teamturndata[this.current_team_turn].target = i;
					}
				}
				}
				console.log(this.teamturndata[this.current_team_turn].target);
			}
			if(this.fearplayers.length <= 0){
				this.win();
				return;
			}

			var teamfunction = this.teamturns[this.current_team_turn];
			this.do_turn('team',this.teamturndata[this.current_team_turn],teamfunction);
			
			
			//here we do the actual turn stuff;
			this.current_team_turn++;
		    } else {
		    	this.current_turn = 'fear'
		    }

		   }


		   if(this.current_turn == 'fear') {

			if(this.current_fear_turn < this.fearturns.length){
			var fearfunction = this.fearturns[this.current_fear_turn];
			if(typeof this.fearplayers[this.current_fear_turn] == 'undefined'){
				this.current_fear_turn++;
				this.current_game_turn++;
				this.turngoing = false;
				this.run();
				console.log('exiting fear turns')
				return;
			} else {
			this.do_turn('fear',this.fearturndata[this.current_fear_turn],fearfunction);
			this.current_fear_turn++;
			console.log('run fear turn');
			}
			//fearfunction();
			//here we do the actual turn stuff;
			
			} else {
				this.current_turn = 'team'
			}

		   }




		}

		this.current_game_turn++;
		console.log('current game turns: ' + this.current_game_turn + 'current max turns: '+ this.current_max_turns);
		} else {
			console.log('restart turns!');
			if(this.fearplayers.length <= 0){
				this.win();
				return;
			}
			this.current_turn = 0;
			this.restart_turns();
		}

	}



	send_impact_message(type,position,impact,hits)
	{
	var turnexcuter = this;
		if(hits == 1) {

			if(type == 'team')
			{

		    if(impact <= 0) {
				turnexcuter.battlemessages.create_message("Ineffective!",position,'#0066ff');	
			} else { 
    			turnexcuter.battlemessages.create_message("+"+impact,position,'#00cc44');
    		}

			}
			if(type == 'fear')
			{

			if(impact <= 0) {
				turnexcuter.battlemessages.create_message("Ineffective!",position,'#0066ff');	
			} else { 
    			turnexcuter.battlemessages.create_message("-"+impact,position,'#ff1a1a');
    		}

			}


    		}else if(hits > 1){

    		setTimeout(function(){

	    		if(type == 'team')
				{

			    if(impact <= 0) {
					turnexcuter.battlemessages.create_message("Ineffective!",position,'#0066ff');	
				} else { 
	    			turnexcuter.battlemessages.create_message("+"+impact,position,'#00cc44');
	    		}

				}
				if(type == 'fear')
				{

				if(impact <= 0) {
					turnexcuter.battlemessages.create_message("Ineffective!",position,'#0066ff');	
				} else { 
	    			turnexcuter.battlemessages.create_message("-"+impact,position,'#ff1a1a');
	    		}

				}

    		}
    			, 500);

    		this.battlemessages.create_message(hits+"x",position,'white');
    

    		} else {

    		this.battlemessages.create_message("Missed!",position,'white');
    		}

	}


    do_turn(type,data,callback)
    {
    	var turnexcuter = this;

    	if(type == 'team'){
    	
    		if(data.action == 'Use Force'){

    		if(data.target >= -1) {
    		this.teamplayers[this.current_team_turn].play_animation('attack');
    		var target = this.fearplayers[data.target];
    		var effected_data = this.battlecalculator.calculate_impact('team',data,target.get_data());
    		var total_impact = effected_data['totalimpact'];
    		var total_hits = effected_data['hits'];
    		var current_percent = target.current_love_percent();
    		var percent = target.take_love(total_impact);
    		var position = this.game_grid['feartypes'][data.target]['position'];

    		if(target.is_love_full()){
    	    	turnexcuter.get_rewards(target);
    	    }

    		callback(function(){
    			if(total_hits >= 1 && !target.is_love_full()){
    	    	target.play_animation('hit');
    	    	turnexcuter.playerhud.update_fear_type_love_bar(data.target,current_percent,percent);
    	    	}
    	    	if(target.is_love_full()){
    	    	target.play_animation('exit');
    	    	turnexcuter.get_rewards(target);
    	    	turnexcuter.game_grid['feartypes'].splice(data.target,1);
    	    	//turnexcuter.teamplayers.splice(data.target,1);
				turnexcuter.fearplayers.splice(data.target,1);
    	    	turnexcuter.battleManager.set_game_grid(turnexcuter.game_grid);
    	    	turnexcuter.battleManager.set_players(turnexcuter.teamplayers,turnexcuter.fearplayers);
    	    	turnexcuter.playerhud.update_fear_type_love_bar(data.target,current_percent,percent);
    	    	setTimeout(function(){
    	    		turnexcuter.playerhud.battlebar_removefeartype(data.target);
    	    	}, 400);

    	    	}
    	    	
    			turnexcuter.send_impact_message('team',position,total_impact,total_hits);
    			
    		});
    		//console.log(`current: ${current_percent} new: ${percent}`);
    		

    		}

    	    }

    	    if(data.action == 'Cast Spell'){

    		if(data.target >= -1) {
    		
    		var target = this.fearplayers[data.target];
    	

    		
    		var effected_data = this.battlecalculator.calculate_impact('team',data,target.get_data());
    		var total_impact = effected_data['totalimpact'];
    		var total_hits = effected_data['hits'];
    		var current_percent = target.current_love_percent();
    		var percent = target.take_love(total_impact);
    		var position = this.game_grid['feartypes'][data.target]['position'];
  
    		this.teamplayers[this.current_team_turn].cast_spell(data.spell,position);
    		
    		if(target.is_love_full()){
    	    	turnexcuter.get_rewards(target);
    	    }
    		
    		callback(function(){
    			if(total_hits >= 1 && !target.is_love_full()){
    	    	target.play_animation('hit');
    	    	turnexcuter.playerhud.update_fear_type_love_bar(data.target,current_percent,percent);
    	    	}
    	    	if(target.is_love_full()){
    	    	target.play_animation('exit');
    	    	
    	    	turnexcuter.game_grid['feartypes'].splice(data.target,1);
    	    	//turnexcuter.teamplayers.splice(data.target,1);
				turnexcuter.fearplayers.splice(data.target,1);
    	    	turnexcuter.battleManager.set_game_grid(turnexcuter.game_grid);
    	    	turnexcuter.battleManager.set_players(turnexcuter.teamplayers,turnexcuter.fearplayers);
    	    	turnexcuter.playerhud.update_fear_type_love_bar(data.target,current_percent,percent);
    	    	setTimeout(function(){
    	    		turnexcuter.playerhud.battlebar_removefeartype(data.target);
    	    	}, 1000);

    	    	}
    	    	
    			turnexcuter.send_impact_message('team',position,total_impact,total_hits);
    			
    		});
    	    
    		//console.log(`current: ${current_percent} new: ${percent}`);
    		

    		}
    	    }

    	}


    	if(type == 'fear'){
    
    		if(data.target >= -1) {
            this.fearplayers[this.current_fear_turn].play_animation('attack');
    		var target = this.teamplayers[data.target];
    		var effected_data = this.battlecalculator.calculate_impact('fear',data,target.get_data());
    		var total_impact = effected_data['totalimpact'];
    		var total_hits = effected_data['hits'];
    	    var position = this.game_grid['team'][data.target]['position'];

    	    

    	    callback(function(){
    	    	if(total_hits >= 1){
    	    	target.play_animation('hit');
    	    	}
    	    	turnexcuter.send_impact_message('fear',position,total_impact,total_hits);
    	    });

    		//console.log(`current: ${health_current} new: ${health_now}`);
    		var love_current = target.get_current_love();
    		var love_now = target.take_fear(total_impact);
    		this.playerhud.update_team_player_love(data.target,love_current,love_now)

    		}

    	}

    }

	set_players(teamplayers,fearplayers)
	{
		this.teamplayers = teamplayers;
		this.fearplayers = fearplayers;
	}


get_rewards(target)
{
	var rewards = target.get_rewards()
this.battleManager.add_to_rewards(rewards.exp,rewards.crystals,[]);
}

win()
	{
		console.log('run win process');
		this.battleManager.win();
	}	

	restart_turns()
	{
		console.log('restart turns')
		this.current_team_turn = 0;
		this.current_fear_turn = 0;
		this.current_turn = 'team';
		this.current_game_turn = 0;
		this.current_max_turns = 0;
		this.teamturndata = false;
		this.fearturndata = false;
		this.battleManager.restart_turns();
	}


}