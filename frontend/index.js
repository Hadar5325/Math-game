import pg from "pg"
import dotenv from "dotenv";
import express from "express"
import bodyParser from "body-parser"

dotenv.config();

const app = express()
const port = 3000

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Math",
    password: process.env.SECRET,
    port: 5432

})
db.connect()

app.use(bodyParser.urlencoded({ extended: true }))


let questions = []
let seenQuestions = []
let isFirstTime = true

async function getDataFromDB() {
    try {
        const result = await db.query("SELECT * FROM add")
        questions = result.rows
        isFirstTime = false
    } catch (err) {
        console.log(err)
    }
}

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
    } else{
        questions = seenQuestions
        seenQuestions = []
        randQuestion = orders()
    }
    return randQuestion
}

app.get("/", async (req, res) => {
    if (isFirstTime) {
        await getDataFromDB()
    }
    const randQuestion = getRandQuestion()
    console.log(randQuestion)
    res.send(randQuestion)
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})



