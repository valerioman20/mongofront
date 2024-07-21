import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/${id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/${id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Invio del commento:", newComment);
      const response = await fetch(`http://localhost:5001/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      console.log("Risposta dal server:", data);
      setComments([...comments, data]);
      setNewComment({ name: '', email: '', content: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

const handleCommentDelete = async (commentId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/posts/${id}/comments/${commentId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log("Commento eliminato:", data);
    setComments(comments.filter(comment => comment._id !== commentId));
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};


  if (!post) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Card className="my-4">
        <Card.Img variant="top" src={post.cover} alt={post.title} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Card.Text>
            <small className="text-muted">By {post.author} | {post.readTime.value} {post.readTime.unit} read</small>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="my-4">
        <Card.Body>
          <Card.Title>Comments</Card.Title>
          {comments.map((comment) => (
            <div key={comment._id} className="mb-3">
              <h5>{comment.name}</h5>
              <p>{comment.content}</p>
              <small className="text-muted">{comment.email}</small>
              <Button variant="danger" onClick={() => handleCommentDelete(comment._id)}>Delete</Button>
            </div>
          ))}
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newComment.name} onChange={handleCommentChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={newComment.email} onChange={handleCommentChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={newComment.content} onChange={handleCommentChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

