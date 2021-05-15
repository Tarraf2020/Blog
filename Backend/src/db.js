// back/src/db.js
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const SQL = require("sql-template-strings");

//creation of db
// const test = async () => {
//   try {
//     const db = await sqlite.open({
//       filename: "db.sqlite",
//       driver: sqlite3.Database,
//     });
//     /**
//      * Create the table
//      **/
//     await db.run(`CREATE TABLE post_tbl
//           (id INTEGER PRIMARY KEY AUTOINCREMENT, 
//             name text ,
//             email text ,
//               category varchar(25) , 
//               title varchar(25) , 
//               content text  ,
//               description text  ,
//               created_at DATE ,
//               picture TEXT ,
//               status varchar(25) not null DEFAULT 'I'
//               );
//         `);

//         await db.run(`CREATE TABLE admin
//           (id INTEGER PRIMARY KEY AUTOINCREMENT, 
//             user text not null,
//             password varchar(25) not null
//               );
//         `);


//         await db.run(`CREATE TABLE message
//           (id INTEGER PRIMARY KEY AUTOINCREMENT, 
//             username text ,
//             email text ,
//             message text 
//               );
//         `);

//         const stmt = await db.prepare(SQL`INSERT INTO admin (user, password) VALUES (?, ?)`);
//         await stmt.run(`Bassel`,`Root`);
//         /** finally, we close the statement **/
//         await stmt.finalize();

        

   
//   } catch (e) {
//     console.log(e);
//   }
// };
// module.exports = { test };

// back/src/db.js


const initializeDatabase = async () => {

    const db = await sqlite.open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })

    const postsAdmin = async () => {
        let statement = `SELECT * FROM post_tbl`
       
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve posts: ` + e.message);
        }
    }
    const pendingPosts = async () => {
        let statement = `SELECT * FROM post_tbl WHERE status= 'I'`
       
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve posts: ` + e.message);
        }
    }
    const messages = async () => {
        let statement = `SELECT * FROM message`
       
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`no messages found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve messages: ` + e.message);
        }
    }

    const postsUser = async () => {
        let statement = `SELECT id, name, category, title,  content, created_at, picture FROM post_tbl where status = 'A'`
       
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve posts: ` + e.message);
        }
    }

    const postsID = async (id) => {
        let statement = `SELECT id, name, category, title,  content, created_at, picture FROM post_tbl WHERE id= ${id}`
       
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve posts: ` + e.message);
        }
    }

    const getPostCategory = async (category) => {
        let statement = `SELECT id, name, email, category, title,  content, created_at, picture FROM post_tbl WHERE category = ${category}`
        const posts = await db.get(statement);
        if (!posts) throw new Error(`post ${category} not found`);
        return posts;
    }


    const createPost = async (props) => {
        if (!props || !props.name || !props.email || !props.category || !props.title || !props.content    ) {
            throw new Error(`you must provide all needed DATA`);
        }
        const { name, email, category, title,  content,  picture} = props;
        try {
            const result = await db.run(`INSERT INTO post_tbl (name, email, category, title,  content, picture) VALUES (?, ?, ?, ?, ?, ?)`, [name, email, category, title,  content, picture]);
            const id = result.lastID;
            return id;
        } catch (e) {
            throw new Error(`couldn't insert this combination: ` + e.message);
        }
    }
    
    const createMessage = async (props) => {
        if (!props || !props.username || !props.email || !props.message  ) {
            throw new Error(`you must provide all needed DATA`);
        }
        const { username, email, message} = props;
        try {
            const result = await db.run(`INSERT INTO message (username, email, message) VALUES (?, ?, ?)`, [username, email, message]);
            const id = result.lastID;
            return id;
        } catch (e) {
            throw new Error(`couldn't insert this combination: ` + e.message);
        }
    }

    const deletePosts = async (id) => {
        try {
            const result = await db.run(`DELETE FROM post_tbl WHERE id = ?`, id);
            if (result.changes === 0) throw new Error(`post "${id}" does not exist`);
            return true;
        } catch (e) {
            throw new Error(`couldn't delete the post "${id}": ` + e.message);
        }
    }

    const acceptPost = async (id) => {
        
        let stmt, params = [];
            stmt = `UPDATE post_tbl SET  status = 'A' WHERE id = ?`;
            params = [id];
        try {
            const result = await db.run(stmt, params);
            if (result.changes === 0) throw new Error(`no changes were made`);
            return true;
        } catch (e) {
            throw new Error(`couldn't accept this post ${id}: ` + e.message);
        }
    }


  

    const controller = {
        postsAdmin,
        pendingPosts,
        acceptPost,
        postsUser,
        postsID,
        createPost,
        getPostCategory,
        deletePosts,
        createMessage,
        messages
    }

    return controller;
}

const db = { initializeDatabase }

module.exports = db;