const app = require("./app");
const db = require("./db");

const start = async() => {
    const controller = await db.initializeDatabase()
    // app.get('/', (req, res) => res.send("ok"));

    //user post
    app.get('/', async (req, res, next) => {
        
        try {
            const userposts = await controller.postsUser();
            res.json({ success: true, result: userposts });
        } catch (e) {
            next(e);
        }
    })

    //admin post
    app.get('/dashboard', async (req, res, next) => {
        
        try {
            const adminposts = await controller.postsAdmin();
            res.json({ success: true, result: adminposts });
        } catch (e) {
            next(e);
        }
    })
    app.get('/dashboard/pending', async (req, res, next) => {
        
        try {
            const adminposts = await controller.pendingPosts();
            res.json({ success: true, result: adminposts });
        } catch (e) {
            next(e);
        }
    })


    //get messages
    app.get('/dashboard/messages', async (req, res, next) => {
        
        try {
            const messages = await controller.messages();
            res.json({success : true, result: messages});
        } catch (e) {
            next(e);
        }
    })


    // READ BY CATEGORY
    app.get('/posts/category/:category', async (req, res, next) => {
        const { category } = req.params
        try {
            const posts = await controller.getPostCategory(category);
            res.json({ success: true, result: posts });
        } catch (e) {
            next(e);
        }
    })


      // READ BY ID
      app.get('/posts/:id', async (req, res, next) => {
        const { id } = req.params
        try {
            const post = await controller.postsID(id);
            res.json({ success: true, result: post });
        } catch (e) {
            next(e);
        }
    })
    

    
      // CREATE POST
  app.get('/post/add/create', async (req, res, next) => {
    const { name, email, category, title,  content,  picture } = req.query;
    try {
        const result = await controller.createPost({ name, email, category, title,  content, picture });
        res.json({ success: true, result });
    } catch (e) {
        next(e);
    }
})
      // CREATE MESSAGE
  app.get('/message/create', async (req, res, next) => {
    const { username, email, message } = req.query;
    try {
        const messages = await controller.createMessage({ username, email, message });
        res.json({ success: true, messages });
    } catch (e) {
        next(e);
    }
})

    // DELETE
    app.get('/dashboard/delete/:id', async (req, res, next) => {
        const { id } = req.params
        try {
            const result = await controller.deletePosts(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    })

    //ACCEPT
    app.get('/dashboard/accept/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await controller.acceptPost(id);
            res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    })



}



start();
 



app.listen( 8000, () => console.log('server listening on port 8000') );
