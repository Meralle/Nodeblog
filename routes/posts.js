var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/post');



var  app = express();

// Define the home page route
router.get('/', (req, res) => {
	debugger
	 Post.find((err,posts) => {
	  	console.log(posts)
	  	res.render('posts', {
	  		posts:posts
	  	})
	});
});

router.post('/',(req,res) => {
	var post = new Post();
	post.name = req.body.name;
	post.content = req.body.content;
	post.order = req.body.order;

	post.save( err => {
	if(err)
		res.send(err);
	console.log("Post created:" , post);
	res.redirect("/posts")
	});
});

router.get('/:id', (req, res) => {
  Post.find((err, posts) => {
    posts.forEach(post => {
      if (post._id == req.params.id) {
        let matchedPost = post;
        // console.log(matchedPost)
        res.render('post', {post: matchedPost});
    } else {

     
    }

    });

  });

});


module.exports = router;