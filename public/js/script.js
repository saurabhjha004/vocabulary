document.getElementById('addFlashcard').addEventListener('click', addFlashcard);

function addFlashcard() {
    const word = document.getElementById('word').value;
    const translation = document.getElementById('translation').value;

    if (word && translation) {
        // Send the data to the server
        fetch('/api/flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word, translation })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadFlashcards(); // Reload flashcards after adding
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter both word and translation');
    }
}

// Function to load and display flashcards
function loadFlashcards() {
    fetch('/api/flashcards')
    .then(response => response.json())
    .then(flashcards => {
        const flashcardList = document.getElementById('flashcardList');
        flashcardList.innerHTML = ''; // Clear the list

        flashcards.forEach(card => {
            const li = document.createElement('li');
            li.innerHTML = `${card.word} - ${card.translation}`;
            flashcardList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Load flashcards when the page loads
window.onload = loadFlashcards;
