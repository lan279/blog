const User = require('../models/user')
const Post = require('../models/post')

const index = (req, res, next) => {


    // 尋找所有文章
    Post.findAll().then(posts=>{
    
      res.render('index/index',{
        // 傳到前端
        'posts':posts,
      })
    })
}

module.exports = {
    index,
}