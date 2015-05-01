Meteor.methods({
  upvote: function(o) {
    var yakId = o.yakId;
    var factor = o.factor || 1;
    Yaks.update({_id: yakId}, {$inc: { score: factor }});
  },
  downvote: function(o) {
    var yakId = o.yakId;
    var factor = o.factor || -1;
    Yaks.update({_id: yakId}, {$inc: { score: factor }});
  },
  comment: function(o) {
    var yakId = o.yakId;
    var comment = {
      text: o.comment,
      date: new Date()
    };
    Yaks.update({_id: yakId}, {
      $push: { comments: comment }
    });
  }
});
