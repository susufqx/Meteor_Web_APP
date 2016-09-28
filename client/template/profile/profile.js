
Template.formProfile.onRendered(function() {
  this.$('.ui.dropdown').dropdown();
  this.$('#birth').calendar({
      type      : 'date',
    });
});

Template.formProfile.onCreated(function() {
  this.checked = new ReactiveVar(false);
  $('.toggle.checkbox').checkbox({
    onChecked:()=>{
      this.checked.set(true);
    },
    onUnchecked:()=>{
      this.checked.set(false);
    }
  });
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
    profile.agree     = template.agree.get();


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
