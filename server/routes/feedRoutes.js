const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

router.get('/', (req, res) => {
  const { session: { userId: user } = {} } = req;
  const issues = Issue.find({ user });
  console.log(issues);
  issues.exec((err, issues) => {
    if (err) return res.send({ status: 400, message: 'Error getting issues', error: true });
    const parsedIssues = issues.map(i => i._doc);
    console.log(parsedIssues);
    res.send({ issues: parsedIssues, status: 200 });
  });
});

// router.post('/update/:id', (req, res) => {
//   const { body: issueData, params: { id } = {} } = req;
//   Issue.findByIdAndUpdate(id, issueData, { new: true }, (err, issue) => {
//     issue.resolved = !issue.resolved;
//     err ? res.send({ status: 400, message: 'Error updating issue', error: true }) : res.send({ issue, status: 200 });
//   });
//   res.redirect('/');
// });

router.post('/update/:id', (req, res) => {
  const { body: issueData, params: { id } = {} } = req;
  Issue.findByIdAndUpdate(id, issueData, { new: true }, (err, issue) => {
    console.log(issue);
    console.log({ issue });
    issue.resolved = !issue.resolved;
    console.log(issue.resolved, 'resolved issue from route');
    err ? res.send({ status: 400, message: 'Error updating issue', error: true }) : res.send({ issue, status: 200 });
  });
});

module.exports = router;
