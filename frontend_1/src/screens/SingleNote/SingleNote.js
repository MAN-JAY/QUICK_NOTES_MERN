import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import MainScreen from "../../Components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from "../../Components/ErrorMessage";
import {  deleteNoteAction, updateNotesAction } from "../../actions/notesAction";
import Loading from "../../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleNote = ({match,history}) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setcategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;
  const {id} = useParams();;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/notes/${id}`
      );
      setTitle(data.title);
      setContent(data.content);
      setcategory(data.category);
      setDate(data.updateAt);
    };
    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle(" ");
    setContent(" ");
    setcategory(" ");
  };

  const navigate = useNavigate();
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNotesAction(id,title,content,category));
    if (!title || !category || !content) return;
    resetHandler();
    navigate("/mynotes");
  };

      const noteDelete = useSelector((state) => state.noteDelete);
      const {
        loading: loadingDelete,
        error: errorDelete,

      } = noteDelete;

      const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
          dispatch(deleteNoteAction(id));
        }
        navigate("/mynotes");
      };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                title="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
              {content && (
                <Card>
                  <Card.Header>Note Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                title="category"
                value={category}
                placeholder="Enter the category"
                onChange={(e) => setcategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              onClick={() => deleteHandler(id)}
              variant="danger"
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
