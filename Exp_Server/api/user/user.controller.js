//GET /users 전체
//app.get('/users',(req,res)=>res.json(users));
exports.index = (req, res) => {
  // ...GET/users

  const id=parseInt(req.params.id,10);
  if(!id){
    return res.status(400).json({error:'Incorrect id'});
    // function chaining 함수 체이닝 status 호출후 바로 json 감
  }
  let user=users.filter(user=>user.id===id)[0]
  if(!user){
    return res.status(404).json({error:'Unknown user'});
  }
  return res.json(user);
  //console.log(req,params.id);
};
//GET /users/1 2 ... //id 구분법 
exports.show = (req, res) => {
    // ...GET /users/:id
  const id=parseInt(req.params.id,10);
  if(!id){
    return res.status(400).json({error:'Incorrect id'});
    // function chaining 함수 체이닝 status 호출후 바로 json 감
  }
  let user=users.filter(user=>user.id===id)[0]
  if(!user){
    return res.status(404).json({error:'Unknown user'});
  }
  return res.json(user);
  //console.log(req,params.id);
};
//DELETE. /users/1 2...
exports.destroy = (req, res) => {
    // ... DELETE /users/:id
  const id=parseInt(req.params.id,10);
  if(!id){
    return res.status(400).json({error: 'Incorrect id'});
  }
  const userIdx=users.findIndex(user=>user.id===id);
  if(userIdx===-1){
    return res.status(404).json({error:'Unknown user'});
  }

  users.splice(userIdx,1);
  res.status(204).send();
};

//POST /users
// curl -X POST '127.0.0.1:3000/users' -d "name=daniel" -v
exports.create = (req, res) => {
  // ... POST /users
  console.log(req.body.query);
  console.log(req.body.name);
  console.log(req.body.title_1);
  console.log(req.body.title_2);
  console.log(req.body.inputdataall);

  const np = new User();
  np.query=req.body.query;
  np.name=req.body.name;
  np.title_1=req.body.title_1;
  np.title_2=req.body.title_2;
  np.inputdataall=req.body.inputdataall;

  np.save(function (err, user1) { 
    if (err) // TODO handle the error
      console.log("error");
    user1.speak();
  });

  //users.push(newUser);
  //return res.status(201).json(newUser);
  return res.status(201).json(np);
};