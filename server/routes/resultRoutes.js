const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

router.get('/', (req, res) => {
  const { session: { userId: user } = {} } = req;
  const issues = Issue.find();
  issues.exec((err, issues) => {
    if (err) return res.send({ status: 400, message: 'Error getting issues', error: true });
    const parsedIssues = issues.map(x => x._doc);
    console.log(parsedIssues);
    res.send({ issues: parsedIssues, status: 200 });
  });
});

module.exports = router;
