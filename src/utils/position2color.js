export default function position2color(position_eng){
  switch(position_eng){
      case 'aye':
        return '#00FFB0';
      
      case 'nay':
        return '#FF0055';
      
      case 'unknown':
        return '#FFF800';
      
      case 'evading':
      	return 'black';

      case 'none':
        return 'gray';

      default:
        return 'black';
 }
  
}


