import axios from "axios";
import React, {useEffect, useState} from "react";

function App(){
    const [randQuestion, setRandQuestion] = useState("")

    async function getData(){
        try{
            const response = await axios.get("http://localhost:3000/")
            console.log(response.data)
            setRandQuestion(response.data)
        }catch(err){
            console.log("try3")
            console.log(err)
        }
    }
    useEffect(() => {
        getData()
        console.log("wow")

      }, []);

    //   useEffect(() => {
    //     console.log("wow")
    //   }, [randQuestion]);

    function handleClick(event){
        console.log(event.target)
    }


    return <div>
        <div className="question">
            {randQuestion.question}
        </div>
        <div className="container">
            <button onClick={handleClick} className="option">
                {randQuestion.option1}
            </button>
            <button onClick={handleClick} className="option">
                {randQuestion.option2}
            </button>
            <button onClick={handleClick} className="option">
                {randQuestion.option3}
            </button>
            <button onClick={handleClick} className="option">
                {randQuestion.option4}
            </button>
        </div>
    </div>
}

export default App




// app.get("/", async (req, res) => {
//     try {
//       const response = await axios.get("https://bored-api.appbrewery.com/random")
//       const result = response.data
//       res.render("index.ejs", {
//         data: result
//       })
//       console.log(result)
  
//     } catch (err) {
//       console.log(err.message)
//       res.render("index.ejs", {
//         err: err.message
//       })
//     }
//   })
  