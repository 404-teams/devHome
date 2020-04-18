'use strict'
const DB = require('./database');
const queFunctions = {};
function getAllQue(req,res){
    if (req.query.search || req.query.filter){
        let allQusetionQuery='SELECT * FROM questions where title Like $1 OR tags Like $2;'
        DB.client.query((allQusetionQuery),
        [`%${req.query.search}%` , `%${req.query.filter}%`]
        )
        .then((queData)=>{
             DB.client.query('SELECT * FROM tags;')
            .then((tagsdata)=>{
                res.render('questions',{'queData':queData.rows,'tagsdata':tagsdata})
                return;
            }).catch((err) =>console.log(err)
            )
        })
    }
    else{
        let allQusetionQuery='SELECT * FROM questions;'
        DB.client.query(allQusetionQuery)
        .then((queData)=>{
             DB.client.query('SELECT * FROM tags;')
            .then((tagsdata)=>{
                res.render('questions',{'queData':queData.rows,'tagsdata':tagsdata})
                return;
            }).catch((err) =>console.log(err)
            )
        })
    }
}

function getQue(req,res){
    var allQusetionQuery='select q.id as que_id, q.title as title,q.description as que_description,q.tags as tags ,q.code as que_code,q.rank as que_rank,a.id as ans_id, a.answer as answer,a.description as ans_description,a.code as ans_code,a.rank as ans_rank,a.approved as approved from questions q LEFT JOIN  answers a on a.question_id = q.id where q.id = $1;'
    DB.client.query((allQusetionQuery),[req.query.id])
    .then((queData)=>{    
        res.render('question',{'queData':queData.rows})
        console.log(queData.rows)
    }).catch((err) => console.log(err))
    
}  

function addQue(req,res){
    res.render('addQue',{})
}  

function addNewQ(req,res){
    let addNewQueQuery = 'INSERT INTO questions (user_id,title,description,tags,code,rank) VALUES ($1,$2,$3,$4,$5,$6);'
    DB.client.query(addNewQueQuery,[1,req.body.title,req.body.description,req.body.tags,req.body.code,req.body.rank])
    .then((data)=>{
        res.redirect('/questions')
        console.log(data)
    })
} 

function addAns(req,res){
    let addNewQueQuery = 'INSERT INTO answers (user_id,question_id,answer,description,code,rank,approved) VALUES ($1,$2,$3,$4,$5,$6,$7);'
    DB.client.query(addNewQueQuery,[1,req.params.id,req.body.answer,req.body.description,req.body.code,0,false])
    .then((data)=>{
        res.redirect(`/question?id=${req.params.id}`)
        console.log(data)
    })
} 

queFunctions.getQue = getQue;
queFunctions.getAllQue = getAllQue;
queFunctions.addQue = addQue;
queFunctions.addNewQ = addNewQ;
queFunctions.addAns = addAns;
module.exports=queFunctions;