var express = require('express');
var router = express.Router();
const articleCotroller = require('../controller/article')
const upload = require('../util/upload_')

//get
router.get('/post',articleCotroller.post)
router.get('/detail/:id',articleCotroller.detail)
router.get('/edit/:id',articleCotroller.edit)

//post

router.post('/post',upload.single('image'),articleCotroller.post_)
router.post('/edit/:id',upload.single('image'),articleCotroller.post_edit)
router.post('/delete_post/:id',articleCotroller.delete_post)

module.exports = router;
