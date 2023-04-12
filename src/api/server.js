const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    id: 1,
    username: 'majd',
    password: '$2b$10$6WEbwYpq0ija.dHTNAYyZOPFwOD3JVd88odTYeCp1foTyBnExfOzC', // password is "test"
    role: 'viewer',
  },
  {
    id: 2,
    username: 'websight',
    password: '$2b$10$6WEbwYpq0ija.dHTNAYyZOPFwOD3JVd88odTYeCp1foTyBnExfOzC', // password is "test"
    role: 'editor',
  },
]; 


app.post('/api/login', (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
const pass = 'test'
const saltRounds = 10;

bcrypt.hash(pass, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);
  }
});
console.log(pass)
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'secret',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization header missing or invalid' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secret');
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/api/data', validateToken, (req, res) => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 4, name: 'Alice Jones', email: 'alice@example.com' },
  ];

  // Sort the data based on the query parameters
  const sortBy = req.query.sortBy || 'id';
  const sortOrder = req.query.sortOrder || 'asc';
  data.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return sortOrder === 'asc' ? -1 : 1;
    } else if (a[sortBy] > b[sortBy]) {
      return sortOrder === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  // Filter the
  // data based on the search query parameter
  const searchQuery = req.query.searchQuery || '';
  const filteredData = data.filter((item) => {
    return (
      item.id.toString().includes(searchQuery) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  res.json({ data: filteredData });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {});
