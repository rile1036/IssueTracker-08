const {
  getAllOpenIssues,
  getAllCloseIssues,
  getIssue,
  createIssue,
  updateIssue,
  openIssue,
  closeIssue,
  createAssignee,
  deleteAssignee,
} = require('./issue.service');
const { failResponse, successResponse } = require('../utils/returnForm');

module.exports = {
  getAllOpenIssues: (req, res) => {
    getAllOpenIssues(req.body, (err, results) => {
      const failMessage = 'open된 이슈 목록을 불러오는데 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  getAllCloseIssues: (req, res) => {
    getAllCloseIssues(req.body, (err, results) => {
      const failMessage = 'closed된 이슈 목록을 불러오는데 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  getIssue: (req, res) => {
    const issueId = req.params.issue_id;

    getIssue(issueId, (err, results) => {
      const failMessage =
        '요청하신 사용자가 만든 이슈 목록을 불러오는데 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  createIssue: (req, res) => {
    createIssue(req.body, (err, results) => {
      const failMessage = '이슈를 생성하는데 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  updateIssue: (req, res) => {
    req.body.id = req.params.issue_id;
    updateIssue(req.body, (err, results) => {
      if (err) {
        return res.status(400).json(failResponse(err));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  openIssue: (req, res) => {
    const issueId = req.params.issue_id;

    openIssue(issueId, (err, results) => {
      const failMessage = '이슈를 open 하는데 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  closeIssue: (req, res) => {
    const issueId = req.params.issue_id;

    closeIssue(issueId, (err, results) => {
      const failMessage = '이슈를 closed 하는데 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  updateIssue: (req, res) => {
    req.body.id = req.params.issue_id;
    updateIssue(req.body, (err, results) => {
      if (err) {
        return res.status(400).json(failResponse(err));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  createAssignee: (req, res) => {
    createAssignee(req.body, (err, results) => {
      const failMessage = '요청하신 이슈의 담당자 지정을 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },

  deleteAssignee: (req, res) => {
    deleteAssignee(req.body, (err, results) => {
      const failMessage = '요청하신 이슈의 담당자 삭제를 실패했습니다.';

      if (err) {
        return res.status(400).json(failResponse(failMessage));
      }

      return res.status(200).json(successResponse(results));
    });
  },
};
