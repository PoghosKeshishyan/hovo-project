const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET admin page. */
router.get('/admin', async function(req, res) {
  const persons = await prisma.person.findMany();
  res.render('admin', { title: "Admin Page", persons })
});

/* GET random persosns api. */
router.get('/random-person', async function(req, res) {
  const persons = await prisma.person.findMany();
  if (persons.length === 0) {
      return res.json(null);
  }
  const randomPerson = persons[Math.floor(Math.random() * persons.length)];
  res.json(randomPerson);
});

/* GET all data in DATABASE with JSON format */
router.get('/all', async function(req, res) {
  const persons = await prisma.person.findMany();
  res.status(200).json(persons);
})

/* GET remove all persons in DATABASE */
router.get('/remove/all', async function(req, res) {
  try {
    await prisma.person.deleteMany();
    res.status(200).json({ message: "Persons deleted successfully" });
  } catch (error) {
    console.error("Error deleting persons:", error);
    res.status(500).json({ message: "Error deleting persons", error: error.message });
  }
});

/* POST add in database person data */
router.post('/', async function(req, res) {
  const data = req.body;

  try {
    await prisma.person.create({
      data,
    });

    res.status(200).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Failed to add data' });
  }
});

module.exports = router;