import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Container, TextField } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import './rich-text-editor.css';

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector(state => state.theme); // Fetching the current theme from Redux state

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    const postId = Date.now();
    const post = {
      id: postId,
      title,
      description,
      content: htmlContent,
    };
    dispatch(createPost(post));
    setEditorState(EditorState.createEmpty());
    setTitle('');
    setDescription('');
    navigate('/');
  };

  return (
    <Container className={`editor-container ${currentTheme === 'dark' ? 'dark-theme' : ''}`}>
      <h2 className='heading'>Create a New Post</h2>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={handleDescriptionChange}
        margin="normal"
      />
      <Editor
        editorState={editorState}
        toolbarClassName={`toolbar-class ${currentTheme === 'dark' ? 'dark-theme' : ''}`}
        wrapperClassName="wrapper-class"
        editorClassName={`editor-class ${currentTheme === 'dark' ? 'editor-class-dark' : 'editor-class-light'}`}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          blockType: {
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
          },
          fontFamily: {
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
          },
          link: {
            popupClassName: `link-popup ${currentTheme === 'dark' ? 'dark-theme' : ''}`,
          },
        }}
      />
      <div  className='buttons'>
      <Button variant="contained" color="primary" onClick={handleSave} >
        Save Post
      </Button>
      </div>
    </Container>
  );
};

export default BlogEditor;
