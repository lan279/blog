
const User = require('../models/user')
const Post = require('../models/post')

const login = (req, res, next) => {
    res.render('user/login')
}

const register = (req, res, next) => {
    res.render('user/register')
}

const post_register = (req, res, next)=>{
    const username = req.body['username']
    const password = req.body['password']
  
    User.create({username,password}).then(()=>{ ///create 是 static method (靜態方法)
      res.redirect('/login')
    })
  }


const user =  (req,res,next)=>{

    // 異步
    User.findAll().then(users=>{
  
      // 才做完
      // 傳送到前端
      return res.render('user/users',{
        'users':users
      })  
    })
}



const delete_user = (req,res,next)=>{
    const id=  req.body['id']
    User.findByPk(id).then(user=>{  // find by primary key
      // 一般函示
      user.destroy().then(()=>{
        res.redirect('/user')
      })
    })
}

const profile = (req,res,next) =>{

  const id = req.params['id']
  User.findByPk(id).then(user=>{
    res.render('user/profile',{
      'user':user  // 傳送到前端
    })
  })
}


// 接收 前端的帳號密碼
const post_login = (req,res,next) => {
  const username = req.body['username']
  const password = req.body['password']

  // 權限認證
  User.findOne({
      where:{"username":username}
    }).then(user=>{
    if(user){
      
      if(user.password === password){
        req.session.isAuthenticated = true
        req.session.user = user
        req.session.save()
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    }else{
      res.redirect('/login')
    }
  })
}

const logout = (req,res,next)=>{
  req.session.destroy()
  res.redirect('/login')
}

const editProfile = (req,res,next)=>{
  const  id = req.params['id'] // 所在介面的id

  if(req.session.user.id === Number(id)){
    res.render('user/editProfile')
  }else{
    res.redirect('/')
  }

   
  
}

const post_editProfile = (req,res,next)=>{

  const id = req.params['id']
  console.log("id",id)
  const files =  req.files

  const avatar = files['avatar'][0]['path']
  const bg_image =  files['bg-image'][0]['path']

  const avatar_list = avatar.split('/')
  const bg_image_list = bg_image.split('/')

  const avatar_path = `${avatar_list[1]}/${avatar_list[2]}`
  const bg_image_path = `${bg_image_list[1]}/${bg_image_list[2]}`

  User.findByPk(req.params['id']).then(user=>{
    user.avatar = avatar_path
    user.bg = bg_image_path
    user.save().then(()=>{
      res.redirect(`/profile/${req.params['id']}`)
    })
  })
}

module.exports = {
    login,
    register,
    post_register,
    user,
    delete_user,
    profile,
    post_login,
    logout,
    editProfile,
    post_editProfile
}