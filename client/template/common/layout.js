Template.layout.helpers({
  isHome: ()=> {
    let pathName = Router.current().route.getName();
    if(pathName === 'home') {
      return true;
    } else {
      return false;
    }
  },
});
