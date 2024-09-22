import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Card,
  Modal,
  Form,
  Alert
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaUser,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaYoutube
} from "react-icons/fa";
import postsData from "../pages/posts.json";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [articles, setArticles] = useState([]);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setPosts(postsData.posts);
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    setArticles(storedArticles);
  }, []);

  const handleAuthShow = () => setShowAuthModal(true);
  const handleAuthClose = () => {
    setShowAuthModal(false);
    setAuthData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (authMode === "register" && !authData.name)
      newErrors.name = "Name is required";
    if (!authData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(authData.email))
      newErrors.email = "Email is invalid";
    if (!authData.password) newErrors.password = "Password is required";
    else if (authData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Auth data:", authData);
      setLoggedInUser(authData.name || authData.email);
      handleAuthClose();
    }
  };

  const saveArticlesToLocalStorage = (updatedArticles) => {
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  };

  const handleArticleModalShow = () => setShowArticleModal(true);
  const handleArticleModalClose = () => {
    setShowArticleModal(false);
    setNewArticle({ title: "", content: "" });
    setEditingId(null);
  };

  const handleArticleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (newArticle.title.trim() === "" || newArticle.content.trim() === "") return;

    if (editingId !== null) {
      const updatedArticles = articles.map((article) =>
        article.id === editingId ? { ...article, ...newArticle } : article
      );
      saveArticlesToLocalStorage(updatedArticles);
    } else {
      const newArticleWithId = {
        id: Date.now(),
        ...newArticle
      };
      saveArticlesToLocalStorage([...articles, newArticleWithId]);
    }

    handleArticleModalClose();
  };

  const handleEdit = (article) => {
    setNewArticle({ title: article.title, content: article.content });
    setEditingId(article.id);
    handleArticleModalShow();
  };

  const handleDelete = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    saveArticlesToLocalStorage(updatedArticles);
  };

  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);


  const handleReadMore = (article) => {
    setSelectedArticle(article);
    setShowFullContent(true);
  };

  const handleCloseFullContent = () => {
    setShowFullContent(false);
    setSelectedArticle(null);
  };
  return (
    <div className="home-page" style={{ backgroundColor: "#FFF8F3" }}>
 <Navbar
        variant="dark"
        expand="lg"
        fixed="top"
        className="py-3 mb-5"
        style={{ backgroundColor: "#405D72" }}
      >
        <Container>
          <Navbar.Brand href="#home" className="mr-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(45deg, #00c6ff, #0072ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textShadow:
                  "0 0 10px rgba(80, 118, 135, 0.5), 0 0 20px rgba(184, 0, 31, 0.5)",
              }}
            >
              Tech Trends
            </motion.div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home" className="text-light">
                Home
              </Nav.Link>
              <Nav.Link href="#about" className="text-light">
                About
              </Nav.Link>
              <Nav.Link href="#contact" className="text-light">
                Contact
              </Nav.Link>
              <Nav.Link href="#articles" className="text-light">
                Articles
              </Nav.Link>
            </Nav>
            <Nav>
              {loggedInUser ? (
                <Navbar.Text className="text-light">
                  Welcome, {loggedInUser}
                </Navbar.Text>
              ) : (
                <Button variant="outline-light" onClick={handleAuthShow}>
                  <FaUser className="me-2" /> Login / Register
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        id="home"
        className="hero-section py-5 pt-5 mt-5  text-center"
        style={{ backgroundColor: "#507687", color: "#FCFAEE" }}
      >
        <Container>
          <Row className="align-items-center mt-5">
            <Col md={12}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="display-5rem">Welcome to Tech Trends</h1>
                <p className="lead">
                  "Dive into the dynamic world of programming! Stay ahead with
                  our vibrant blog that explores the latest technologies,
                  programming languages, frameworks, and trends. Whether you're
                  a seasoned developer or just starting your journey, we've got
                  the insights and inspiration you need to fuel your passion for
                  tech!"{" "}
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#FCFAEE", color: "#384B70" }}>
        <Container className="pt-5 last">
          <h2 className="text-center pb-4  text-dark">Latest Posts</h2>
          <Row>
            {posts.map((post) => (
              <Col md={4} lg={3} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: parseInt(post.id) * 0.1 }}
                >
                  <Card
                    className=" cardd mb-4 h-100 border-0"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Card.Img variant="top" src={post.image} alt={post.title} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <section
        id="articles"
        className="py-5 mt-5"
        style={{ backgroundColor: "#507687", color: "#FCFAEE" }}
      >
        <Container>
          <h2 className="text-center mb-4">Article Management</h2>
          <Row className="justify-content-center mb-4">
            <Col md={4}>
              <Button
                variant="outline-light"
                onClick={handleArticleModalShow}
                className="w-100"
                style={{ 
                  borderColor: "#FCFAEE", 
                  color: "#FCFAEE",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FCFAEE";
                  e.target.style.color = "#507687";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#FCFAEE";
                }}
              >
                Add New Article
              </Button>
            </Col>
          </Row>
          <Row className="g-4">
            {articles.map((article) => (
              <Col md={4} key={article.id}>
                <Card
                  className="h-100 shadow"
                  style={{ 
                    backgroundColor: "#FCFAEE", 
                    color: "#384B70",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.content.substring(0, 100)}
                      {article.content.length > 100 && "..."}
                    </Card.Text>
                    <div className="mt-auto pt-3 d-flex justify-content-between">
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEdit(article)}
                        style={{ 
                          borderColor: "#384B70", 
                          color: "#384B70",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#384B70";
                          e.target.style.color = "#FCFAEE";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#384B70";
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(article.id)}
                        style={{ 
                          borderColor: "#B8001F", 
                          color: "#B8001F",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#B8001F";
                          e.target.style.color = "#FCFAEE";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#B8001F";
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    {article.content.length > 100 && (
                     <Button
                     onClick={() => handleReadMore(article)}
                     variant="link"
                     className="mt-2 p-0 text-decoration-none text-uppercase fw-bold"
                     style={{ color: "#384B70", letterSpacing: "1px" }}
                   >
                     Read More
                   </Button>
                   
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
 {/* Full Content Modal */}
 <Modal show={showFullContent} onHide={handleCloseFullContent} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "#507687", color: "#FCFAEE" }}>
          <Modal.Title>{selectedArticle?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FCFAEE", color: "#384B70" }}>
          <p>{selectedArticle?.content}</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#507687" }}>
          <Button variant="secondary" onClick={handleCloseFullContent}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <section
        id="about"
        className="py-5 mt-5 text-center"
        style={{ backgroundColor: "#507687", color: "#FCFAEE" }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <h2 className="mb-4 ">About Tech Trends</h2>
              <p>
                Tech Trends is your go-to destination for staying ahead in the
                fast-paced world of technology and programming. We are
                passionate about bringing you the latest insights, trends, and
                innovations in the tech industry.
              </p>
              <p>
                Our team of expert writers and industry professionals curate
                high-quality content to keep you informed about:
              </p>
              <ul style={{ listStyleType: "none" }}>
                <li>Emerging technologies and their impact</li>
                <li>Programming languages and frameworks</li>
                <li>Best practices in software development</li>
                <li>Industry news and events</li>
              </ul>
              <p>
                Whether you're a seasoned developer or just starting your
                journey in tech, Tech Trends is here to inspire, educate, and
                empower you to reach new heights in your career.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        id="contact"
        className="py-5 mt-5"
        style={{ backgroundColor: "#FCFAEE", color: "#384B70" }}
      >
        <Container>
          <h2 className="text-center mb-5">Connect With Us</h2>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <p className="mb-4">
                Stay connected with Tech Trends on social media for daily
                updates, tech tips, and engaging discussions. Follow us and join
                our community of tech enthusiasts!
              </p>
              <div className="d-flex justify-content-center">
                {[
                  {
                    icon: FaInstagram,
                    color: "#B8001F",
                    link: "https://www.instagram.com/techtrends",
                  },
                  {
                    icon: FaTwitter,
                    color: "#507687",
                    link: "https://www.twitter.com/techtrends",
                  },
                  {
                    icon: FaFacebook,
                    color: "#384B70",
                    link: "https://www.facebook.com/techtrends",
                  },
                  {
                    icon: FaGithub,
                    color: "#384B70",
                    link: "https://www.github.com/techtrends",
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-3"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <item.icon size={40} style={{ color: item.color }} />
                  </motion.a>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <footer
        className="py-5 mt-5"
        style={{ backgroundColor: "#384B70", color: "#FCFAEE" }}
      >
        <Container>
          <Row>
            <Col md={4}>
              <h5 className="mb-3">About Tech Trends</h5>
              <p>
                Your premier source for cutting-edge insights in technology and programming.
                Stay ahead of the curve with our expert analysis and trend forecasts.
              </p>
            </Col>
            <Col md={4}>
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled" >
                <li><a style={{ textDecoration:'none'}} href="#home" className="text-light">Home</a></li>
                <li><a style={{ textDecoration:'none'}} href="#about" className="text-light">About</a></li>
                <li><a style={{ textDecoration:'none'}} href="#articles" className="text-light">Articles</a></li>
                <li><a style={{ textDecoration:'none'}} href="#contact" className="text-light">Contact</a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5 className="mb-3">Connect With Us</h5>
              <div className="d-flex justify-content-start">
                {[
                  { icon: FaInstagram, link: "https://www.instagram.com/techtrends" },
                  { icon: FaTwitter, link: "https://www.twitter.com/techtrends" },
                  { icon: FaFacebook, link: "https://www.facebook.com/techtrends" },
                  { icon: FaGithub, link: "https://www.github.com/techtrends" },
                  { icon: FaLinkedin, link: "https://www.linkedin.com/company/techtrends" },
                  { icon: FaYoutube, link: "https://www.youtube.com/techtrends" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <item.icon size={24} style={{ color: "#FCFAEE" }} />
                  </motion.a>
                ))}
              </div>
              <p className="mt-3">
                Email: info@techtrends.com<br />
                Phone: (123) 456-7890
              </p>
            </Col>
          </Row>
          <hr className="my-4" style={{ backgroundColor: "#FCFAEE" }} />
          <Row>
            <Col className="text-center">
              <p className="mb-0">&copy; 2024 Tech Trends. All rights reserved.</p>
              <small>Empowering developers and tech enthusiasts since 2020</small>
            </Col>
          </Row>
        </Container>
      </footer>

      <Modal
        show={showAuthModal}
        onHide={handleAuthClose}
        centered
        backdrop="static"
        className="auth-modal"
      >
        <Modal.Header
          closeButton
          className="bg-dark text-light border-secondary"
        >
          <Modal.Title>
            {authMode === "login" ? "Login" : "Register"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form onSubmit={handleAuthSubmit}>
            {(authMode === "register" || authMode === "login") && (
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={authData.name}
                  onChange={handleAuthChange}
                  isInvalid={!!errors.name}
                  className="bg-secondary text-light"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={authData.email}
                onChange={handleAuthChange}
                isInvalid={!!errors.email}
                className="bg-secondary text-light"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={authData.password}
                onChange={handleAuthChange}
                isInvalid={!!errors.password}
                className="bg-secondary text-light"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {authMode === "login" ? "Login" : "Register"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-secondary">
          <p className="w-100 text-center">
            {authMode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Button
              variant="link"
              onClick={() =>
                setAuthMode(authMode === "login" ? "register" : "login")
              }
              className="text-primary"
            >
              {authMode === "login" ? "Register" : "Login"}
            </Button>
          </p>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showArticleModal}
        onHide={handleArticleModalClose}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#507687", color: "#FCFAEE" }}>
          <Modal.Title>{editingId !== null ? "Edit Article" : "Add New Article"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FCFAEE", color: "#384B70" }}>
          <Form onSubmit={handleArticleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newArticle.title}
                onChange={handleArticleChange}
                placeholder="Enter article title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={newArticle.content}
                onChange={handleArticleChange}
                placeholder="Enter article content"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editingId !== null ? "Update Article" : "Add Article"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;