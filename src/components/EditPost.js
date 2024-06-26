import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost } from '../redux/actions';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Button, Container, TextField } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.css';

const EditPost = () => {
  const { postId } = useParams();
  console.log("postId:", postId); // Debug log
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(state => state.posts);
  console.log("posts:", posts); // Debug log
  const post = posts.find(post => post.id === Number(postId));
  console.log("post:", post); // Debug log

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const currentTheme = useSelector(state => state.theme);
  useEffect(() => {
    if (post) {
      const contentBlock = htmlToDraft(post.content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      }
      setTitle(post.title);
      setDescription(post.description);
    }
  }, [post]);

  const handleEditorChange = state => {
    setEditorState(state);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleUpdate = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = draftToHtml(convertToRaw(contentState));
    const updatedPost = {
      id: post.id,
      title,
      description,
      content: rawContentState,
    };
    dispatch(editPost(updatedPost));
    navigate('/');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={`editor-container ${currentTheme === 'dark' ? 'dark-theme' : ''}`}>
      <h2>Edit Post</h2>
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
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'link',
            'embedded',
            'emoji',
            'history',
          ],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          blockType: {
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
          },
          fontFamily: {
            options: [
              'Arial',
              'Georgia',
              'Impact',
              'Tahoma',
              'Times New Roman',
              'Verdana',
            ],
          },
          link: {
            popupClassName: 'link-popup',
          },
        }}
      />
      <div  className='buttons'>
      <Button variant="contained" color="primary" onClick={handleUpdate} >
        Update Post
      </Button>
      </div>
    </Container>
  );
};

export default EditPost;
