UI.registerHelper('timeAgo', function(t) {
  return moment(t).fromNow();
});

UI.registerHelper('numComments', function(t) {
  if (!t.comments) return 0;
  return t.comments.length;
});
