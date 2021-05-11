import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Parse from "html-react-parser";
import NavBar from "../Nav/Navbar";
import "./blog_write.css";

function Blog_writing() {
  const [text, setText] = useState("");
  return (
    <div>
      <NavBar></NavBar>
      <form className="container mt-5">
        <div className="row ">
          <div className="col-sm-12 col-lg-12 mb-4 ">
            <h2>Please Enter Your Name</h2>
            <input type="text" placeholder="Name(Not required)"></input>
          </div>
          <div className="col-sm-12 col-lg-12 mb-4 ">
            <h2>Please Enter The Title</h2>
            <input type="text" placeholder="Title(required)" required>
            </input>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mb-4 ">
            <h2>Please Enter A Short Description</h2>
            <textarea
              type="text"
              placeholder="Desicription(required)"
              required></textarea>
          </div>
          </div>
          <div className="row">
          <div class="form-group col-md-4">
          <h2>Topics</h2>
      <select id="inputState" class="form-control" required>
        {/* <option selected>Choose...</option> */}
        <option>Corona</option>
        <option>Movies</option>
        <option>B to B</option>
      </select>
    </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mb-4 editor">
            <h2>Write Your Blog</h2>
            <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            ></CKEditor>
          </div>

          {/* <div className="col-sm-12 col-lg-6">
            <h2>Content</h2>
            <p>{Parse(text)}</p>
          </div> */}
        </div>
        <button type="submit" class="btn btn-dark btn-lg buttons">
          Post
        </button>
      </form>
    </div>
  );
}

export default Blog_writing;
