import './App.css';
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export function Home() {
  return(
    <>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/">Friend Memories</Link>
        </li>
        <li>
          <Link to="/form">Submit Memories</Link>
        </li>
      </ul>
    </>
  )
};

export function About() {
  return(
    <>
      <h1>About My Friend Memories</h1>
      <Link to="/home">Go back to Homepage</Link>
      <Outlet />
    </>
  )
};

export function History() {
  return (
    <>
      <h1>Our History</h1>
    </>
  )
};

export function Contact() {
  return(
    <>
      <h1>Contact Us Here</h1>
      <Link to="/home">Go back to Homepage</Link>
    </>
  )
};

const handleSubmit = (e, submittedId, submittedText) => {
  e.preventDefault();

  const newMemory = {
    id: submittedId,
    text: submittedText
  }

  // make a request to the server
  axios.post("https://jpe56jsr54.execute-api.us-west-2.amazonaws.com/dev/friendMomentFunction3/", newMemory)
    .then(res => {
      console.log("success:", res.data);
    })
    .catch(err => {
      console.log("Error")
    })
}

export function SubmitForm() {
  const [id, setId] = useState("");
  const [text, setText] = useState("");

  return (
    <>
      <h1>Submission Form</h1>
      <Form onSubmit={(e) => handleSubmit(e, id, text)}>
        <Form.Control 
          type="text" 
          placeholder="ID"
          onChange={(e) => setId(e.target.value)} 
        />
        <br />
        <Form.Control 
          type="text" 
          placeholder="Text"
          onChange={(e) => setText(e.target.value)} 
        />
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
      <br />
      <Link to="/home">Go back to Homepage</Link>
    </>
  )
};

export function MemoryDetail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://jpe56jsr54.execute-api.us-west-2.amazonaws.com/dev/friendMomentFunction3/${id}`
    ).then((response) => response.json())
    .then(setData)
    .catch(setError)
  }, [id]);

  const handleUpdate = () => {
    navigate(`/updatedetail/${id}`);
  };

  const handleDelete = () => {
    axios.delete(`https://jpe56jsr54.execute-api.us-west-2.amazonaws.com/dev/friendMomentFunction3/${id}`)
        .then(res => {
            console.log(res);
        }).then(navigate('/'))
        .catch(err => {
            console.log("error");
        })
  }

  if (error) return <pre>{JSON.stringify(error)}</pre>

  return(
    <>
      <h1>Memory: {id}</h1>
      <h2>Text: {data ? data.text: ""}</h2>
      <Button variant="success" onClick={handleUpdate}>Update</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
      <br />
      <Link to="/">Back to Memories</Link>
    </>
  )
}

export function MemoryUpdate() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    fetch(
      `https://jpe56jsr54.execute-api.us-west-2.amazonaws.com/dev/friendMomentFunction3/${id}`
    ).then((response) => response.json())
    .then(setData)
    .catch(setError)
  }, [id]);

  const handleUpdate = async () => {
    fetch(`https://jpe56jsr54.execute-api.us-west-2.amazonaws.com/dev/friendMomentFunction3/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          text: updatedText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
      .then(navigate(`/memorydetail/${id}`))
      .catch(setError)
  }

  const handleCancel = () => {
    navigate(`/memorydetail/${id}`)
  }

  if (error) <pre>{JSON.stringify(error)}</pre>

  return(
    <>
      <h1>Update Form for Memory: {id}</h1>
      <Form onSubmit={(e) => handleUpdate(e, updatedText)}>
        <Form.Control 
          type="text" 
          placeholder={data ? data.text : ""}
          onChange={(e) => setUpdatedText(e.target.value)} 
        />
        <Button type="submit" variant="primary">Submit</Button>
        <Button onClick={handleCancel} variant="warning">Cancel</Button>
      </Form>
      <br />
    </>
  )
}

export function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://jpe56jsr54.execute-api.us-west-2.amazonaws.com/dev/friendMomentFunction3`
    ).then((response) => response.json())
    .then(setData)
    .then(setLoading(false))
    .catch(setError)
  }, []);

  function List({displayData, renderItem, renderEmpty}) {
    return !data.length ? (
      renderEmpty
    ) : (
      <ul>{displayData.map((item) => (
        <li key={item.id}>
          {renderItem(item)}
        </li>
      ))}</ul>
    )
  };

  if (loading) {
    console.log('loading...');
    return <h1>Loading...</h1>
  };

  if (error) return <pre>{JSON.stringify(error)}</pre>
  if(data) return (
    <>
      <h1>
        Friend Memories
      </h1>
      <List 
        displayData={data}
        renderEmpty={<p>This list is empty</p>} 
        renderItem={(item) => (
          <Link to={`/memorydetail/${item.id}`}>
            {item.id}
          </Link>
        )}
      />
      <Link to="/home">Back to Homepage</Link>
    </>
  )
}
