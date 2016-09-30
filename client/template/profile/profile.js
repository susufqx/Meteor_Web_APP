
Template.formProfile.helpers({
  'checked': ()=> Meteor.user().profile.agree
});

Template.formProfile.onRendered(function() {
  this.$('.ui.dropdown').dropdown();
  this.$('#birth').calendar({
      type      : 'date',
    });
  this.$('.toggle.checkbox').checkbox({
    onChecked:()=>{
      this.checked.set(true);
      console.log(this.checked.get());
    },
    onUnchecked:()=>{
      this.checked.set(false);
      console.log(this.checked.get());
    }
  });
});

Template.formProfile.onCreated(function() {
  this.checked = new ReactiveVar();
});

Template.formProfile.events({
  'click .js-add-button'(){
    let a = document.getElementById('hobby-text');
    let text = a.value;
    console.log(text);
  },

  'submit .profile'(evt, template){
    evt.preventDefault();
    let user    = Meteor.user();
    let target  = evt.target;
    let profile = user.profile || {};
    // get the information
    let username           = target.username.value;
    //let email  = target.email.value; now we don't set it

    profile.name      = target.name.value;
    profile.gender    = target.gender.value;
    profile.phone     = target.phone.value;
    profile.birthday  = target.birth.value;
    console.log(profile.birthday);
    profile.career    = target.career.value;
    console.log(template);
    profile.agree     = template.checked.get();


    Meteor.call('profile.update',
      username,
      profile,
      (err)=>{
        if(err){
          console.error(err);
        }
      }
    );
  }
});

Template.userPhoto.onRendered(function() {
  Meteor.image.resumable.assignBrowse(this.$(".fileBrowse"));
});
