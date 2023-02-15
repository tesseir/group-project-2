const router = require('express').Router();
const { User, Team, Project } = require('../../models');
//---------------User----------------
//login

router.post('/login', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        username: req.body.username,
      }
    });
//if email doesn't exist in db
    if(!dbUser) {
      res
        .status(400)
        .json({message: 'incorrect username'})
      return;
    }
//compare password
//will add bcrypt compare
const validPassword = dbUser.checkPassword(req.body.password);

    if(!validPassword){
      res
        .status(400)
        .json({message: 'invalid password'})
      return;
      }
//if password matches, then user data is saved in session store
    req.session.save(() => {
      req.session.loggedIn = true
    });

    res
      .status(200)
      .json({user: dbUser, message: 'you are now logged in'})

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(error)
  }
})


//logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({message: 'logged out'}).end();
    });
  } else {
    res.status(404).end();
  }
});
//signup


router.post('/signup', async (req, res) => {
  try {
    const newUser = User.create({
      username: req.body.username,
      password: req.body.password
    })
    req.session.save(() =>{
      req.session.loggedIn = true,


      res.status(200).json("it worked!");
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error})
  }

})

//update user


//-------------Team-------------------
//create team
router.post('/team', async (req, res) => {
  try {
    const newTeam = await Team.create({
      name: req.body.name
    });
    res
      .status(200)
      .json({team: newTeam, message: 'team created'})
  } catch (error) {
    
  }

  // res.json({message: 'Post team'})
})
//update team
router.put('/team/:id', (req, res) => {
  res.json({message: 'Put team'})
})
//delete team
router.delete('/team/:id', (req, res) => {
  res.json({message: 'delete team'})
})


//------------Project----------------
//create project
router.post('/project', (req, res) => {
  res.json({message: 'Post project'})
})
//update project
router.put('/project/:id', (req, res) => {
  res.json({message: 'Put project'})
})
//delete project
router.delete('/project/:id', (req, res) => {
  res.json({message: 'delete project'})
})

module.exports = router;