const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const {getCursos, getAlunos, getMatricula} = require('./modulo/alunos.js')

const app = express()
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

//EndPoint dos cursos
app.get('/cursos', cors(), async function(request, response, next){
    let cursos = getCursos();
    let cursosJSON = {};
    if (cursos) {
        cursosJSON.cursos = cursos
        response.status(200);
        response.json(cursosJSON)
    } else {
        response.status(404)
        response.json('{message : "Nenhum item encontrado!"}')
    }
})

//EndPoint dos alunos
app.get('/alunos/curso/:sigla', cors(), async function(request, response, next){
    let curso = request.params.sigla
    let alunos = getAlunos(curso)
    if (alunos) {
        response.status(200)
        response.json(alunos)
    } else {
        response.status(404)
    }
})

//EndPoint do aluno selecionado pela matrícula
app.get('/aluno/:matricula', cors(), async function(request, response, next){
    let numeroMatricula = request.params.matricula
    let dadosAluno = getMatricula(numeroMatricula)
    if (dadosAluno) {
        response.status(200)
        response.json(dadosAluno)
    } else {
        response.status(404)
    }
})



app.listen(8080, function(){
    console.log('Servidor aguardando requisições.')
})