const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

router.post('/create', (req, res) => {
  const { body: issueData = {}, session: { userId } = {} } = req;
  const newIssue = new Issue(issueData);
  newIssue.save((err, issue) => {
    if (err) return res.send({ status: 400, message: 'Error posting issue', error: true });
    issue.addUser(userId);
    res.send({ issue, status: 200 });
  });
});

// router.get('/', (req, res) => {
//   const { session: { userId: user } = {} } = req;
//   const issues = Issue.find({ user });
//   issues.exec((err, issues) => {
//     if (err) return res.send({ status: 400, message: 'Error getting issues', error: true });
//     const parsedIssues = issues.map(x => x._doc);
//     res.send({ issues: parsedIssues, status: 200 });
//   });
// });

module.exports = router;
