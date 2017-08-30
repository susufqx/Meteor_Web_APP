import {heros} from './heros.js';

let dota2_items = {};

function getName(number) {
  number -= 1;
  return heros[number].name;
}

dota2_items.getHeroName  = number => getName(number);
dota2_items.getHeroImage = number => '/images/dota2heros/small/' + getName(number) + '_sb.png';

export {dota2_items};
