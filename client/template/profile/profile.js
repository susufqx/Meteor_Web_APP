
Template.formProfile.onRendered(function() {
  this.$('.ui.dropdown').dropdown();
  this.$('#birth').calendar({
      type      : 'date',
      isChinese : true,
      text: {
        days: ['日', '一', '二', '三', '四', '五', '六'],
        months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        today: '今天',
        now: '现在',
        am: '上午',
        pm: '下午'
      },
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
