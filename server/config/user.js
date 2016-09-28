export default function(options, user)
{
  let profile;

  profile  = user.profile || {};
  user._id = Random.id();

  profile.name      = options.name;
  profile.gender    = null;
  profile.phone     = null;
  profile.birthday  = null;
  profile.career    = null;
  profile.hobby     = [];
  profile.photo     = null;
  profile.agree     = null;

  if(options.verify)
    user.emails[0].verified = true;

  user.profile = profile;
  return user;
}
