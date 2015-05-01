// MOBILE ROUTER CONFIG
Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  notFoundTemplate: "notfound",
  waitOn: function() {
    var latLng = latLng = {lat: 37.774936, lng: -122.415463};
    if (Session.get("latLng") && Session.get("latLng") !== null) {
      latLng = Session.get("latLng");
    }
    return [
      Meteor.subscribe("yaks", latLng)
    ];
  }
  // waitOn
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('yak.view', {
    path: '/yak/:_id',
    template: 'yakview',
    data: function() {
      var yak = Yaks.findOne({_id: this.params._id});
      Session.set("currentYak", yak);
      return yak;
    }
  });
});
