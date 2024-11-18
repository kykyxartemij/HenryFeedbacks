let currentSubjectFeedback = [1, 1, 1, 1, 1, 1]; // Default feedback for all subjects
const subjects = ['Andmebaasid', 'Hajusrakenduste alused', 'Matemaatika', 'Eesti keel', 'Tarkvaraarenduse meetodid', 'Hajusrakenduste alused 2'];

// Function to switch between tabs
function showTab(tabName) {
  const feedbackTab = document.getElementById('feedback');
  const databaseTab = document.getElementById('database');

  if (tabName === 'feedback') {
    feedbackTab.style.display = 'block';
    databaseTab.style.display = 'none';
  } else if (tabName === 'database') {
    feedbackTab.style.display = 'none';
    databaseTab.style.display = 'block';
  }
}

// Function to load subjects and display feedback options
function loadSubjects() {
  const feedbackContainer = document.getElementById('feedback-container');
  feedbackContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой

  subjects.forEach((subject, index) => {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';

    const label = document.createElement('label');
    label.innerText = subject;

    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-container';

    for (let i = 1; i <= 5; i++) {
      const emoji = document.createElement('img');
      emoji.src = `emoji/unclicked/image${i}.png`;  // uncliked
      emoji.className = 'emoji';
      emoji.dataset.value = i;
      emoji.dataset.subjectIndex = index;

      emoji.addEventListener('click', function () {
        setFeedback(index, i);
        updateEmojis(index, i);  // Updating emoji on click
      });

      emojiContainer.appendChild(emoji);
    }

    subjectDiv.appendChild(label);
    subjectDiv.appendChild(emojiContainer);
    feedbackContainer.appendChild(subjectDiv);
  });
}

// Set feedback 
function setFeedback(subjectIndex, value) {
  currentSubjectFeedback[subjectIndex] = value;
  updateEmojis(subjectIndex, value);
}

// Function to update emojis when feedback is selected
function updateEmojis(subjectIndex, value) {
  const emojiContainers = document.getElementsByClassName('emoji-container')[subjectIndex];
  for (let i = 0; i < emojiContainers.children.length; i++) {
    const emoji = emojiContainers.children[i];
    if (parseInt(emoji.dataset.value) === value) {
      emoji.src = `emoji/clicked/image${value}.png`; // clicked 
    } else {
      emoji.src = `emoji/unclicked/image${emoji.dataset.value}.png`; // unclicked 
    }
  }
}

async function submitFeedback() {
    const name = document.getElementById('name-input').value;
    if (!name) {
      alert('Please enter your name');
      return;
    }
  
    const feedbackData = {
      name: name,
      feedback: currentSubjectFeedback
    };
  
    try {
      const response = await fetch('/save-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON
        },
        body: JSON.stringify(feedbackData)  // JSON
      });
  
      if (response.ok) {
        alert('Feedback saved successfully.');
      } else {
        alert('Error saving feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback.');
    }
  }

document.addEventListener('DOMContentLoaded', loadSubjects);
