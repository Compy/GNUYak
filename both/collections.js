Yaks = new Meteor.Collection("yaks");

Yaks.allow({
  insert: function() { return true; },
  remove: function() { return false; },
  update: function() { return false; },
});
