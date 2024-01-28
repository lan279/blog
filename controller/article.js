const User = require('../models/user')
const Post = require('../models/post')


const post = (req,res,next)=>{
    res.render('article/post')
}

// 接收 image
const post_ = (req,res,next)=>{
    const title = req.body['title']
    const image_original = req.file.path
    const content = req.body['content']

    const image = image_original.split('/')[1]+"/"+image_original.split('/')[2]
    // image/1705210161439_person-2.jpg

    Post.create({title,image,content}).then(()=>{
      res.redirect('/')
    })
}


const detail = (req,res,next)=>{
    const id = req.params["id"]
    Post.findByPk(id).then(post=>{
      res.render('article/detail',{
        "post":post
      })
    })
  }


 const edit =  (req,res,next)=>{
    const id = req.params['id']
    Post.findByPk(id).then(post=>{
      res.render('article/edit',{
        "post":post
      })
    })
}

// if a === null && a === none && a === undefined

// 接收 編輯的資訊
const post_edit =  (req,res,next)=>{
    const id = req.params['id']
    const title = req.body['title']
    const content = req.body['content']
    if(req.file === undefined){
      // 不傳
      Post.findByPk(id).then(post=>{
        post.title = title
        post.content = content
        return post.save()
      }).then(()=>{
        res.redirect(`/detail/${id}`)
      })
    }else{
      // 傳
      Post.findByPk(id).then(post=>{
        post.title = title
        post.content = content

        // let path
        const path = req.file.path
        // 得到 /public/image/1705817128394_login-bg.jpg

        path_list = path.split('/')  // 利用 ‘/’ 去分割路由 
        // 分割完會變成一個 array 
        // ['public','image','1705817128394_login-bg.jpg']

        const path_ = `${path_list[1]}/${path_list[2]}`

        post.image = path_

        return post.save()
      }).then(()=>{
        res.redirect(`/detail/${id}`)
      })
    }


    // const title = req.body['title']
    // const image = req.body['image']
    // const content = req.body['content']
    // const id = req.params['id']
    // Post.findByPk(id).then(post=>{
    //   post.title = title
    //   post.image = image
    //   post.content = content
    //   return post.save()
    // }).then(()=>{
    //   res.redirect(`/detail/${id}`)
    // })
  }


const delete_post = (req,res,next)=>{
  const id = req.params['id']
  Post.findByPk(id).then(post=>{
    return post.destroy()

  }).then(()=>{
    res.redirect('/')

  })
}  

module.exports = {
    post,
    post_,
    detail,
    edit,
    post_edit,
    delete_post
}