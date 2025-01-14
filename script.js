





const brothers = [];
const backgroundImages = [
    'images/bg1.png',
    'images/bg2.jpeg','images/bg3.jpeg','images/bg4.jpeg','images/bg5.jpeg','images/bg6.jpeg','images/bg7.jpeg','images/bg8.jpeg','images/bg9.jpeg','images/bg10.jpeg',
    'images/bg11.jpeg','images/bg12.jpeg','images/bg13.jpeg',
];

let currentImageIndex = 0;

const brotherData = {
    "srinivas": {
        quote: "May your brotherly bond be as strong as iron and never break in times of trouble. Again wishing you a very Happy Raksha Bandhan!",
        image: "images/srinivas.jpeg",
        song: "songs/song1.mp3" // Replace with actual song URL
    }
};

function addBrother() {
    const nameInput = document.getElementById('brother-name');
    const name = nameInput.value.trim().toLowerCase();

    if (name && !brothers.includes(name)) {
        brothers.push(name);
        displayWishes(name);
        playBackgroundMusic(name);
        changeBackgroundImage(); // Change background image randomly
        nameInput.value = '';
        hideSuggestions();
        startRakhiAnimation(); // Start Rakhi falling animation on adding a brother
    }
}

function displayWishes(name) {
    const wishesSection = document.getElementById('wishes-section');
    wishesSection.innerHTML = '';

    const card = document.createElement('div');
    card.classList.add('brother-card');

    const img = document.createElement('img');
    const message = document.createElement('div');
    message.classList.add('message');
    const nameElem = document.createElement('p');
    nameElem.textContent = `My Dear ${capitalizeWords(name)} Bro,`;

    const quoteElem = document.createElement('p');
    quoteElem.classList.add('quote');

    if (brotherData[name]) {
        img.src = brotherData[name].image;
        quoteElem.textContent = brotherData[name].quote;
    } else {
        img.src = 'images/default.png';
        quoteElem.textContent = 'A brother shares childhood memories and grown-up dreams.';
    }

    const kavyaElem = document.createElement('p');
    kavyaElem.classList.add('secret-name');
    kavyaElem.textContent = '— Rajeswari';
    kavyaElem.style.visibility = 'hidden';

    message.appendChild(nameElem);
    message.appendChild(quoteElem);
    message.appendChild(kavyaElem);
    card.appendChild(img);
    card.appendChild(message);

    wishesSection.appendChild(card);

    setTimeout(() => {
        kavyaElem.style.visibility = 'visible';
    }, 1000);
}

function capitalizeWords(string) {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function showSuggestions() {
    const nameInput = document.getElementById('brother-name');
    const input = nameInput.value.trim().toLowerCase();
    const suggestionsList = document.getElementById('suggestions-list');

    suggestionsList.innerHTML = '';

    if (input) {
        const suggestions = Object.keys(brotherData).filter(name =>
            name.includes(input)
        );

        suggestions.forEach(name => {
            const li = document.createElement('li');
            li.textContent = capitalizeWords(name);
            li.onclick = () => selectSuggestion(name);
            suggestionsList.appendChild(li);
        });

        suggestionsList.style.display = suggestions.length ? 'block' : 'none';
    } else {
        suggestionsList.style.display = 'none';
    }
}

function selectSuggestion(name) {
    document.getElementById('brother-name').value = name;
    hideSuggestions();
}

function hideSuggestions() {
    document.getElementById('suggestions-list').style.display = 'none';
}

function playBackgroundMusic(name) {
    const existingAudio = document.getElementById('background-music');
    if (existingAudio) {
        existingAudio.pause();
        existingAudio.remove();
    }

    const audioElem = document.createElement('audio');
    audioElem.id = 'background-music';
    audioElem.controls = false;
    audioElem.loop = true;
    audioElem.autoplay = true;

    const sourceElem = document.createElement('source');
    sourceElem.src = brotherData[name].song;
    sourceElem.type = 'audio/mpeg';
    audioElem.appendChild(sourceElem);

    document.body.appendChild(audioElem);
}

function startRakhiAnimation() {
    const rakhiAnimationContainer = document.getElementById('rakhi-animation');

    // Clear any existing animations
    rakhiAnimationContainer.innerHTML = '';

    // Generate multiple Rakhi threads
    for (let i = 0; i < 20; i++) {
        const rakhi = document.createElement('div');
        rakhi.classList.add('rakhi');

        // Randomize the starting position and delay
        rakhi.style.left = `${Math.random() * 100}%`;
        rakhi.style.animationDelay = `${Math.random() * 5}s`;

        rakhiAnimationContainer.appendChild(rakhi);
    }
}

function startBackgroundAnimation() {
    const backgroundAnimationContainer = document.getElementById('background-animation');

    // Clear any existing animations
    backgroundAnimationContainer.innerHTML = '';

    // Generate multiple sparkles
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Randomize the starting position and animation delay
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 7}s`;
        sparkle.style.animationDuration = `${Math.random() * 5 + 3}s`;

        backgroundAnimationContainer.appendChild(sparkle);
    }
}

function changeBackgroundImage() {
    const backgroundElement = document.getElementById('background');

    if (backgroundElement) {
        // Pick a random image from the backgroundImages array
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        backgroundElement.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
    } else {
        console.error("Background element not found");
    }
}

// Call this function when the page loads or after adding a brother
window.onload = function() {
    startBackgroundAnimation();
};
