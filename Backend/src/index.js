const app = require("./app");
const db = require("./db");

const start = async() => {
    const controller = await db.initializeDatabase()
    app.get('/', (req, res) => res.send("ok"));

    //user post
    app.get('/posts', async (req, res, next) => {
        
        try {
            const userposts = await controller.postsUser();
            res.json({  result: userposts });
        } catch (e) {
            next(e);
        }
    })

    //admin post
    app.get('/dashboard', async (req, res, next) => {
        
        try {
            const adminposts = await controller.postsAdmin();
            res.json({  result: adminposts });
        } catch (e) {
            next(e);
        }
    })


    //get messages
    app.get('/dashboard/messages', async (req, res, next) => {
        
        try {
            const messages = await controller.messages();
            res.json(messages);
        } catch (e) {
            next(e);
        }
    })


    // READ BY CATEGORY
    app.get('/posts/:category', async (req, res, next) => {
        const { category } = req.params
        try {
            const posts = await controller.getPostCategory(category);
            res.json({  result: posts });
        } catch (e) {
            next(e);
        }
    })

    
      // CREATE POST
  app.get('/posts/add/create', async (req, res, next) => {
    const { name, email, category, title,  content,  picture } = req.query;
    try {
        const result = await controller.createPost({ name, email, category, title,  content, picture });
        res.json({  result });
    } catch (e) {
        next(e);
    }
})
      // CREATE MESSAGE
  app.get('/message/create', async (req, res, next) => {
    const { username, email, message } = req.query;
    try {
        const messages = await controller.createMessage({ username, email, message });
        res.json({  messages });
    } catch (e) {
        next(e);
    }
})

    // DELETE
    app.get('/dashboard/delete/:id', async (req, res, next) => {
        const { id } = req.params
        try {
            const result = await controller.deletePosts(id);
            res.json({  result });
        } catch (e) {
            next(e);
        }
    })


}



start();
 



app.listen( 8000, () => console.log('server listening on port 8000') );
