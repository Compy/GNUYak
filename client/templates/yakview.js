Template.yakview.rendered = function() {
  Session.set("currentYak", this.data);
};

Template.yakview.helpers({
  yak: function() {
    return Session.get("currentYak");
  }
});

Template.yakview.events({
  'click .upvote': function(e,t) {
    e.preventDefault();
    GNUYak.upvote(this._id);
  },
  'click .downvote': function(e,t) {
    e.preventDefault();
    GNUYak.downvote(this._id);
  },
  'submit #addCommentForm': function(e,t) {
    e.preventDefault();
    var comment = t.$("#txtComment").val();
    if (comment == "") {
      IonLoading.show({
        customTemplate: '<p>Comment text cannot be blank!</p>',
        duration: 2000
      });
      return;
    }
    t.$("#txtComment").val("");
    GNUYak.comment(this._id, comment);
  }
});
