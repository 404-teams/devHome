'use strict';
const DB = require('./database');
const queFunctions = {};
let user_Id;
let que_ID;
function getAllQue(req, res) {
  if (req.query.search || req.query.filter) {
    let allQusetionQuery =
      'select q.id as id, u.name as username,q.title as title FROM questions q LEFT JOIN USERS U ON U.id = q.user_id where q.title Like $1 OR q.tags Like $2;';
    DB.client
      .query(allQusetionQuery, [
        `%${req.query.search}%`,
        `%${req.query.filter}%`,
      ])
      .then((queData) => {
        res.render('questions', { queData: queData.rows });
      });
  } else {
    let allQusetionQuery =
      'select  q.id as id, u.name as username,q.title as title FROM questions q LEFT JOIN USERS U ON U.id = q.user_id;';
    DB.client.query(allQusetionQuery).then((queData) => {
      res.render('questions', { queData: queData.rows });
    });
  }
}

function getQue(req, res) {
  que_ID = req.query.id || que_ID;
  console.log(que_ID);
  var QusetionQuery =
    'select q.user_id as q_user_id, u.name as username, q.id as que_id, q.title as title,q.description as que_description,q.tags as tags ,q.code as que_code,q.rank as que_rank from questions q LEFT JOIN USERS U ON U.id = q.user_id where q.id = $1;';
  DB.client
    .query(QusetionQuery, [que_ID])
    .then((queData) => {
      var answersQuery =
        'select r.answer_id as rep_answer_id, r.reply as reply,r.description as rep_description,r.code as rep_code,u.id as ans_user_id , u.name as username, a.id as ans_id, a.answer as answer,a.description as ans_description,a.code as ans_code,a.rank as ans_rank,a.approved as approved from answers a LEFT JOIN USERS U ON U.id = a.user_id LEFT JOIN replies r ON r.answer_id = a.id where a.question_id = $1;';
      DB.client
        .query(answersQuery, [que_ID])
        .then((ansData) => {
          res.render('question', {
            queData: queData.rows,
            ansData: ansData.rows,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function myQue(req, res) {
  var QusetionQuery =
    'select u.name as username, q.id as que_id, q.title as title,q.description as que_description,q.tags as tags ,q.code as que_code,q.rank as que_rank from questions q LEFT JOIN USERS U ON U.id = q.user_id where q.user_id = $1;';
  DB.client
    .query(QusetionQuery, [req.body.id])
    .then((queData) => {
      console.log(queData.rows);
      res.render(
        'addQue',
        {
          queData: queData.rows,
        },
        function (err, result) {
          res.send(result); // send rendered HTML back to client
        }
      );
    })
    .catch((err) => console.log(err));
}

function addNewQ(req, res) {
  user_Id = req.body.id;
  let addNewQueQuery =
    'INSERT INTO questions (user_id,title,description,tags,code,rank) VALUES ($1,$2,$3,$4,$5,$6);';
  DB.client
    .query(addNewQueQuery, [
      user_Id,
      req.body.title,
      req.body.description,
      req.body.tags,
      req.body.code,
      req.body.rank,
    ])
    .then((data) => {
      return res.send({ redirect: 'hi' });
    })
    .catch((err) => console.log(err));
}

function addAns(req, res) {
  let addNewQueQuery =
    'INSERT INTO answers (user_id,question_id,answer,description,code,rank,approved) VALUES ($1,$2,$3,$4,$5,$6,$7);';
  DB.client
    .query(addNewQueQuery, [
      req.body.id,
      req.params.id,
      req.body.answer,
      req.body.description,
      req.body.code,
      0,
      false,
    ])
    .then((data) => {
      return res.send({ redirect: 'hi' });
    });
}

function addRep(req, res) {
  let addNewRepQuery =
    'INSERT INTO replies (user_id,answer_id,reply,description,code) VALUES ($1,$2,$3,$4,$5);';
  DB.client
    .query(addNewRepQuery, [
      req.body.id,
      req.params.id,
      req.body.reply,
      req.body.description,
      req.body.code,
    ])
    .then((data) => {
      return res.send({ redirect: 'hi' });
    });
}

function rankAns(req, res) {
  let rank = Number(req.body.ansRank) + Number(req.body.value);
  let ansRank = 'UPDATE answers SET rank = $1 where answers.id = $2;';
  DB.client
    .query(ansRank, [rank, req.body.ansId])
    .then(() => {
      let user = 'SELECT * FROM USERS where USERS.id = $1;';
      DB.client
        .query(user, [req.body.ansUserId])
        .then((data) => {
          let userRank = Number(data.rows[0].rank) + Number(req.body.value);
          let userRankQue = 'UPDATE USERS SET rank = $1 where USERS.id = $2;';
          DB.client
            .query(userRankQue, [userRank, req.body.ansUserId])
            .then(() => {
              return res.send({ redirect: 'hi' });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function ans_approved(req, res) {
  console.log(
    req.body.id,
    req.body.q_user_id,
    req.body.is_approved,
    req.body.ans_id
  );
  if (req.body.id == req.body.q_user_id) {
    let ansApproved = 'UPDATE answers SET approved = $1 where answers.id = $2;';
    DB.client
      .query(ansApproved, [req.body.ans_id, req.body.is_approved])
      .then(() => {
        return res.send({ finaly: 'finaly' });
      })
      .catch((err) => console.log(err));
  } else {
    return res.status(500).send("You can't approved the answer");
  }
}

queFunctions.ans_approved = ans_approved;
queFunctions.rankAns = rankAns;
queFunctions.getQue = getQue;
queFunctions.getAllQue = getAllQue;
queFunctions.myQue = myQue;
queFunctions.addNewQ = addNewQ;
queFunctions.addAns = addAns;
queFunctions.addRep = addRep;
module.exports = queFunctions;
