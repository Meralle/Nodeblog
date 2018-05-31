var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/post');
var methodOverride = require('method-override');



var  app = express();

// Define the home page route
router.get('/', (req, res) => {
	debugger
	 Post.find((err,posts) => {
			// console.log(posts)
			res.render('posts', {
				posts:posts,
				
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
	res.redirect("/posts/" + '?alert=create');
	});
});

//id
router.get('/:id', (req, res) => {
	Post.find((err, posts) => {
		posts.forEach(post => {
				if (post._id == req.params.id) {
					let matchedPost = post;
					// console.log(matchedPost)
					res.render('post', { post: matchedPost });
			} 

		});

	});
	
});

//edit post
router.get('/editPost/:id', (req, res) => {
	Post.findById(req.params.id, (err, post) => {
		let match = post;
		// console.log(match)
		res.render('editPost' , { post:match, message: res.locals.message });

	});
});


//delete post
router.put('/:id',(req,res) => {
Post.findById(req.params.id, (err, post) => {
	// console.log(post)
	if (err)
			res.send(err);
		post.name = req.body.name;  // update the posts info
		post.content = req.body.content;  // update the posts info
		post.order = req.body.order;  // update the posts info
		// const {name, content, order} = req.body
		// save the post
		post.save(function(err) {
			if (err)
				res.send(err);

		console.log("Post updated:", post);

	res.redirect("/posts/editPost/" + req.params.id + '?alert=done');

		});

	});
});
//delete the post with this id (accessed at DELETE http://localhost:8080/api/posts/:post_id)
router.delete ('/delete/:id',(req, res) => {
	// console.log(req.params.id)
		Post.remove({
				_id: req.params.id
		},(err, post) => {
				if (err)
						res.send(err);
				console.log("Post deleted")
				res.redirect("/posts/?alert=delete")
		});
});




module.exports = router;