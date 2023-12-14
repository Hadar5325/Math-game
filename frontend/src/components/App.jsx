import axios from "axios";
import React, { useRef ,useEffect, useState} from "react";
// import winSound from "../../public/win.mp3"
// import errorSound from "../../public/error.wav"

function App(){
    const [randQuestion, setRandQuestion] = useState("")
    const inputRef = useRef(false);
    const [isShaking, setIsShaking] = useState(false)


    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current.classList.remove('div-container')
        }, 1000);
        setIsShaking(false)
        return () => clearTimeout(timer);
      }, [isShaking]);


    async function getData(){
        try{
            const response = await axios.get("http://localhost:3000/")
            console.log(response.data)
            setRandQuestion(response.data)
        }catch(err){
            // console.log("try3")
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
        const userAnswer = parseInt(event.target.innerHTML) 
        const realAnswer = randQuestion.answer
        if(userAnswer === realAnswer){
            var audio = new Audio('win.mp3');
            audio.play();
        }else{
            setIsShaking(true)
            inputRef.current.classList.add('div-container')
            const audio = new Audio("error.wav")
            audio.play()
            console.log("error")
            
        }
    }

    return (
    <div ref={inputRef}>
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
    )
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
  