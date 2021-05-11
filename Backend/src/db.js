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
            throw new Error(`couldn't retrieve contacts: ` + e.message);
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
        let statement = `SELECT name, category, title,  content, created_at, picture FROM post_tbl`
       
        try {
            const rows = await db.all(statement);
            if (!rows.length) throw new Error(`no rows found`);
            return rows;
        } catch (e) {
            throw new Error(`couldn't retrieve contacts: ` + e.message);
        }
    }


    const getPostCategory = async (category) => {
        let statement = `SELECT name, email, category, title,  content, created_at, picture FROM post_tbl WHERE category = ${category}`
        const posts = await db.get(statement);
        if (!posts) throw new Error(`contact ${category} not found`);
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
            if (result.changes === 0) throw new Error(`contact "${id}" does not exist`);
            return true;
        } catch (e) {
            throw new Error(`couldn't delete the contact "${id}": ` + e.message);
        }
    }


    // const getContact = async (id) => {
    //     let statement = `SELECT contact_id AS id, name, email FROM contacts WHERE contact_id = ${id}`
    //     const contact = await db.get(statement);
    //     if (!contact) throw new Error(`contact ${id} not found`);
    //     return contact;
    // }

    // const createContact = async (props) => {
    //     if (!props || !props.name || !props.email) {
    //         throw new Error(`you must provide a name and an email`);
    //     }
    //     const { name, email } = props;
    //     try {
    //         const result = await db.run(`INSERT INTO contacts (name,email) VALUES (?, ?)`, [name, email]);
    //         const id = result.lastID;
    //         return id;
    //     } catch (e) {
    //         throw new Error(`couldn't insert this combination: ` + e.message);
    //     }
    // }

    // const deleteContact = async (id) => {
    //     try {
    //         const result = await db.run(`DELETE FROM contacts WHERE contact_id = ?`, id);
    //         if (result.changes === 0) throw new Error(`contact "${id}" does not exist`);
    //         return true;
    //     } catch (e) {
    //         throw new Error(`couldn't delete the contact "${id}": ` + e.message);
    //     }
    // }

    // const updateContact = async (id, props) => {
    //     if (!props && !(props.name && props.email)) {
    //         throw new Error(`you must provide a name or an email`);
    //     }
    //     const { name, email } = props;
    //     let stmt, params = [];

    //     if (name && email) {
    //         stmt = `UPDATE contacts SET email = ?, name = ? WHERE contact_id = ?`;
    //         params = [name, email, id];
    //     }
    //     else if (name && !email) {
    //         stmt = `UPDATE contacts SET name = ? WHERE contact_id = ?`;
    //         params = [name, id];
    //     }
    //     else if (email && !name) {
    //         stmt = `UPDATE contacts SET email = ? WHERE contact_id = ?`;
    //         params = [email, id];
    //     }

    //     try {
    //         const result = await db.run(stmt, params);
    //         if (result.changes === 0) throw new Error(`no changes were made`);
    //         return true;
    //     } catch (e) {
    //         throw new Error(`couldn't update the contact ${id}: ` + e.message);
    //     }
    // }

    const controller = {
        postsAdmin,
        postsUser,
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