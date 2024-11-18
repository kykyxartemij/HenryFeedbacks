const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const app = express();
const port = 3000;

// Middleware для обработки JSON запросов
app.use(express.json()); // Это важно для работы с JSON

// Static files
app.use(express.static(path.join(__dirname)));

// Saving feedbacks
app.post('/save-feedback', async (req, res) => {
  const { name, feedback } = req.body;
  const [andmebaasid, hajusrakenduste_alused, matemaatika, eesti_keel, tarkvaraarenduse_meetodid, hajusrakenduste_alused_2] = feedback;

  try {
    await prisma.feedback.create({
      data: {
        name,
        andmebaasid,
        hajusrakenduste_alused,
        matemaatika,
        eesti_keel,
        tarkvaraarenduse_meetodid,
        hajusrakenduste_alused_2
      }
    });
    res.status(200).send('Фидбек успешно сохранён.');
  } catch (err) {
    console.error('Ошибка сохранения фидбека:', err);
    res.status(500).send('Ошибка при сохранении.');
  }
});

// Showing feedbacks (error writen on russian)
app.get('/database', async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.json(feedbacks);
  } catch (err) {
    console.error('Ошибка получения данных из базы:', err);
    res.status(500).send('Ошибка при получении данных.');
  }
});

// After server running
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  
  // Example feedback
  const sampleFeedback = {
    name: 'Artemiy Vorozhun TA-22V',
    andmebaasid: 3,
    hajusrakenduste_alused: 3,
    matemaatika: 5,
    eesti_keel: 1,
    tarkvaraarenduse_meetodid: 3,
    hajusrakenduste_alused_2: 2
  };

  // Adding feedback to database (error writen on russian)
  try {
    await prisma.feedback.create({
      data: sampleFeedback
    });
    console.log('Тестовый фидбек добавлен в базу данных');
  } catch (error) {
    console.error('Ошибка при добавлении тестового фидбека:', error);
  }
});

// Average feedback
app.get('/average-feedback', async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();

    // ours subjects:
    const subjects = ['andmebaasid', 'hajusrakenduste_alused', 'matemaatika', 'eesti_keel', 'tarkvaraarenduse_meetodid', 'hajusrakenduste_alused_2'];

    const averages = {};

    subjects.forEach(subject => {
      const totalScore = feedbacks.reduce((acc, feedback) => acc + (feedback[subject] || 0), 0);
      const count = feedbacks.filter(feedback => feedback[subject] !== null).length;
      averages[subject] = count ? totalScore / count : 0; // Checking
    });

    res.json(averages);
  } catch (err) {
    console.error('Error getting Averade score:', err);
    res.status(500).send('Error getting Averade score');
  }
});