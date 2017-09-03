
Template.searchPart.events ({
  'click .get-dota-id' (evt, template) {
    let dota_id = $('.dota-id-input').val();
    let path_kind;
    let type = $('.dota2-type').text();

    switch (type) {
      case 'By Account ID'  :
        /*if(template.data) {
          template.data.playerInfo.set();
        }*/
        Router.go('dotaTwoPlayerSummaries',  {_id: dota_id});
      break;
      case 'By Match ID'    :
        if(template.data) {
          template.data.matchInfo.set();
        }
        Router.go('dotaTwoMatch',   {_id: dota_id});
      break;
      default : alert('Choose type and enter the dota2 id please!');
    }
  }
});

Template.searchPart.onRendered(function() {
  this.$('.js-dota2-type-dropdown').dropdown();
});

Template.dotaTwo.onRendered(function() {
  document.title = 'Dota2-SusuFQX';
});
