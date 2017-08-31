import {dota2_heros} from './dota2_heros.js';
import {dota2_items} from './dota2_items.js';

let dota2_data = {};

function getHero_Name(id) {
  for (let i in dota2_heros) {
    if(dota2_heros[i].id === id) {
      return _.last((dota2_heros[i].name).split('npc_dota_hero_'));
    }
  }
  id -= 1;
  return dota2_heros[id].name;
}

function getItem_Name(id) {
  for (let i in dota2_items) {
    if(dota2_items[i].id === id) {
      return _.last((dota2_items[i].name).split('item_'));
    }
  }
}

dota2_data.getHeroName  = id => getHero_Name(id);
dota2_data.getHeroImage = id => '/images/dota2heros/small/' + getHero_Name(id) + '_sb.png';
dota2_data.getItemName  = id => getItem_Name(id);
dota2_data.getItemImage = id => (getItem_Name(id)? 'https://cdn.steamstatic.com/apps/dota2/images/items/' + getItem_Name(id) + '_lg.png' : null);

export {dota2_data};
