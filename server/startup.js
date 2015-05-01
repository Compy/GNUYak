Meteor.startup(function() {
  Yaks._ensureIndex({ location : "2d" });
});
