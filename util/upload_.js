const multer = require('multer')


const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'public/image')
    },
    filename:function (req,file,cb){
        const uniquePrefix = Date.now()
        cb(null,uniquePrefix+'_'+file.originalname)
    }
  })
  const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
  }

  const upload = multer({storage,fileFilter})
  module.exports = upload
