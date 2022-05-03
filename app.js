const express =require('express');
const app=express();
const bodyparser=require('body-parser')
const axios=require('axios');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//task

app.get("/todos",async(req,res)=>{
   let todosList=await axios.get('http://jsonplaceholder.typicode.com/todos');
   let filteredTodoList=todosList.data.filter((list)=> delete list.userId); //remove userId
   res.status(200).send(JSON.stringify(filteredTodoList)); //send back filteredTodoList
})

app.get("/user/:id",async(req,res)=>{
  let todosList=await axios.get('http://jsonplaceholder.typicode.com/todos');
  let userList=await axios.get('http://jsonplaceholder.typicode.com/users');
 //map each user to todolist
 var mapedList= userList.data.map(user=>{ 
   user['todos']= todosList.data.filter(val=>val.userId==user.id)
   return user
  })
  //get that user have same id 
 let userData=mapedList.filter(user=>user.id==req.params.id);
 //send back mapped user data
 res.status(200).send(JSON.stringify(userData));

})




app.listen(4000)