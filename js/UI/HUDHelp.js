export class HUDHelp
{


get_stat_icon(stat)
{
/*
			'Armor' : 3,
			'Speed':20,
			'Accuracy':10,
			'Luck':1,
			'Flexibility':10,
			'Wisdom':1,
			'Intelligence ':10,
			'Strength':15,
*/

var return_html = '';

	switch (stat) {
		case 'Armor':
		return_html = "<span class='stats-armor-icon'></span>";
      	break;
      	case 'Speed':
		return_html = "<span class='stats-speed-icon'></span>";
      	break;
      	case 'Accuracy':
		return_html = "<span class='stats-accuracy-icon'></span>";
      	break;
      	case 'Luck':
		return_html = "<span class='stats-luck-icon'></span>";
      	break;
      	case 'Flexibility':
		return_html = "<span class='stats-flexibility-icon'></span>";
      	break;
      	case 'Wisdom':
		return_html = "<span class='stats-wisdom-icon'></span>";
      	break;
      	case 'Intelligence':
		return_html = "<span class='stats-intelligence-icon'></span>";
      	break;
      	case 'Strength':
		return_html = "<span class='stats-strength-icon'></span>";
      	break;
		default:
			// statements_def
			break;
	}


}


get_frequency_icon(frequency)
{
var return_html = '';
  switch (frequency) {
    case 'white':
     return_html = "<span class='frequency-icon-white'></span>";
      break;
    case 'red':
     return_html = "<span class='frequency-icon-red'></span>";
      break;
    case 'orange':
     return_html = "<span class='frequency-icon-orange'></span>";
      break;
    case 'yellow':
     return_html = "<span class='frequency-icon-yellow'></span>";
      break;
    case 'green':
     return_html = "<span class='frequency-icon-green'></span>";
      break;
    case 'blue':
     return_html = "<span class='frequency-icon-blue'></span>";
      break;
    case 'ultraviolet':
     return_html = "<span class='frequency-icon-ultraviolet'></span>";
      break;
    case 'pink':
     return_html = "<span class='frequency-icon-pink'></span>";
      break;
    default:
  
      break;
  }
  return return_html;

}




}