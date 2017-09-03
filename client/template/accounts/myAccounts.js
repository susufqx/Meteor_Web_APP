
Template.myAccounts.helpers({
  login       : ()=> Template.instance().login.get(),
  register    : ()=> Template.instance().register.get(),
  forgetPwd   : ()=> Template.instance().forgetPwd.get(),
});

Template.myAccounts.onCreated(function() {
  let state       = Template.currentData().state;
  let pathName    = Router.curren().route.getName();

  this.login      = new ReactiveVar((state==='signIn'));
  this.register   = new ReactiveVar((state==='signUp'));
  this.forgetPwd  = new ReactiveVar((state==='forgetPwd'));

  switch (pathName) {
    case 'login':
      document.title = 'Login-SusuFQX';
    break;
    case 'register':
      document.title = 'Register-SusuFQX';
    break;
  }
});

Template.myAccounts.events({
  'submit .myAccounts'(evt, template){
    evt.preventDefault();
    let email      = evt.target.email.value;
    let login      = template.login.get();
    let register   = template.register.get();
    let forgetPwd  = template.forgetPwd.get();

    let password;
    if(!forgetPwd){
      password = evt.target.password.value;

      if(login){
        Meteor.loginWithPassword(email, password, (err)=>{
          if(err){
            console.log(err);
          }else{
            Router.go('/');
          }
        });
      }
      if(register){
        let user = {
          email     : email,
          password  : password
        };
        Meteor.call('newUser',
          user,
          (err, res)=>{
            if(!err){
              if(res){
                console.log("Success");
                Meteor.loginWithPassword(email, password);
                Router.go('/');
              }else{
                console.log("Faild");
              }
            }
          }
        );
      }
    }
    /* method to forget the password */
  }
});
