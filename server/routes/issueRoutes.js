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

module.exports = router;
