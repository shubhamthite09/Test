require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); 

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});  
const openai = new OpenAIApi(configuration);

app.post("/converter",async(req,res)=>{
    try{
            let prompt = `Convert this code ${req.body.code} in to ${req.body.language} language`;
            let result = await checkTheAns(prompt);
            res.status(200).send({isError:false,mag:result});
    }catch(err){
        console.log(err.message);
        res.status(500).send({isError:true,mag:err.message});
    }
});

app.post("/debugger",async(req,res)=>{
    try{
            let prompt = `can you debugge this ${req.body.code} code`;
            let result = await checkTheAns(prompt);
            res.status(200).send({isError:false,mag:result});
    }catch(err){
        console.log(err.message);
        res.status(500).send({isError:true,mag:err.message});
    }
});

app.post("/quality",async(req,res)=>{
    try{
            let prompt = `can you check the quality of this ${req.body.code} code`;
            let result = await checkTheAns(prompt);
            res.status(200).send({isError:false,mag:result});
    }catch(err){
        console.log(err.message);
        res.status(500).send({isError:true,mag:err.message});
    }
});


async function checkTheAns(que){
    console.log(que);
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content:`${que}` }],
        });
        console.log(chatCompletion.data.choices[0].message);
        responce = chatCompletion.data.choices[0].message.content

        return responce;
}


app.listen(7890);
