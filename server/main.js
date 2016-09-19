import { Meteor } from 'meteor/meteor';
import setupBrowserPolicy from './config/security.js';
import accountCreationHook from './config/user.js';

setupBrowserPolicy(BrowserPolicy);
Accounts.onCreateUser(accountCreationHook);

Meteor.startup(() => {
  // code to run on server at startup
});
