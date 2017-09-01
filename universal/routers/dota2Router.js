/* ROUTER OF DOTA2 */
Router.route('/dota2',{
  name: 'dotaTwo'
});

Router.route('/dota2/matches/:_id',{
  name: 'dotaTwoMatch'
});
Router.route('/dota2/players/:_id',{
  name: 'dotaTwoPlayer'
});
