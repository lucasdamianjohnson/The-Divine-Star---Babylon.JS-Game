import {TeamPlayer} from './TeamPlayer.js';
import {TeamTurnGenerator} from './TeamTurnGenerator.js';
export class TeamObject
{
	constructor(teamdata,dataManager)
	{

		this.teamdata = teamdata;
		this.meshes = [];
		this.players = [];
		this.turnGenerator = new TeamTurnGenerator(teamdata,dataManager);
	}


	set_team_meshes(meshes)
	{
		var team = this;
		meshes.forEach(function(item,index){
			team.players.push( new TeamPlayer(item,team.teamdata));
		});
		this.meshes = meshes;
	}

	create_team_player(id,mesh,scene)
	{
		return new TeamPlayer(id,mesh,this.teamdata.get_data_value('teamplayerdata',id),scene);
	}

	generate_turn_data(teammember,action,fear,data)
	{
		return this.turnGenerator.generate_turn_data(teammember,action,fear,data)
	}

	get_team_players()
	{
		return this.players;
	}



}