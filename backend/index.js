import 'dotenv/config'
import pg from "pg"
import express from 'express'
import bodyParser from 'body-parser'

const port = 3000
const app = express()

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Math",
    password: process.env.SECRET,
    port: 5432

})
db.connect()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

let questions = []
let seenQuestions = []
let isFirstTime = true

async function getData() {
    try {
        const result = await db.query("SELECT * FROM add")
        questions = result.rows
        isFirstTime = false
    } catch (err) {
        console.log(err)
    }
}

app.get("/", async (req, res) => {
    if (isFirstTime) {
        await getData()
    }
    const randQuestion = getRandQuestion()
    console.log(randQuestion)
    res.send(randQuestion)
})



function orders() {
    const randNumberIdx = Math.floor(Math.random() * questions.length)
    const randQuestion = questions[randNumberIdx]
    seenQuestions.push(randQuestion)
    questions.splice(randNumberIdx, 1);
    return randQuestion
}

function getRandQuestion() {
    let randQuestion

    if (questions.length > 0) {
        randQuestion = orders()
    } else {
        questions = seenQuestions
        seenQuestions = []
        randQuestion = orders()
    }
    return randQuestion
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
