document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const letterDisplay = document.getElementById('currentLetter');
    const imageContainer = document.getElementById('imageContainer');
    const wordContainer = document.getElementById('wordContainer');
    const instruction = document.getElementById('instruction');
    const progressIndicator = document.getElementById('progressIndicator');
    const imageSetButtons = document.querySelectorAll('.image-set-btn');
    
    // Variables
    const colors = ['red', 'green', 'blue', 'purple', 'yellow', 'orange'];
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const letterSounds = {};
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    let currentImageSet = 'animals'; // Default image set
    let currentLetterIndex = 0;
    let currentLetter = alphabet[currentLetterIndex];
    let imageSetData = null;
    let waitingForKeyPress = false;
    
    // Preload letter sounds (in a real app, you would have actual audio files)
    function preloadLetterSounds() {
        const baseFrequency = 261.63; // Middle C
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i);
            letterSounds[letter] = baseFrequency * Math.pow(2, i/12);
        }
    }
    
    // Play a sound for a letter
    function playLetterSound(letter) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = letterSounds[letter] || 440;
        
        gainNode.gain.value = 0.5;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
    }
    
    // Play a success sound
    function playSuccessSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'triangle';
        oscillator.frequency.value = 523.25; // C5
        
        gainNode.gain.value = 0.5;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Play a second note after a short delay
        setTimeout(() => {
            const oscillator2 = audioContext.createOscillator();
            const gainNode2 = audioContext.createGain();
            
            oscillator2.type = 'triangle';
            oscillator2.frequency.value = 783.99; // G5
            
            gainNode2.gain.value = 0.5;
            gainNode2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            
            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext.destination);
            
            oscillator2.start();
            oscillator2.stop(audioContext.currentTime + 0.5);
        }, 200);
    }
    
    // Play an error sound
    function playErrorSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 196.00; // G3
        
        gainNode.gain.value = 0.3;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    // Load image set data
    async function loadImageSetData() {
        try {
            const response = await fetch('assets/image-sets.json');
            imageSetData = await response.json();
            displayCurrentLetter();
        } catch (error) {
            console.error('Error loading image set data:', error);
            instruction.textContent = 'Error loading images. Please try again.';
        }
    }
    
    // Display the current letter and image
    function displayCurrentLetter() {
        if (!imageSetData) return;
        
        // Get the current letter data
        const letter = alphabet[currentLetterIndex];
        const letterData = imageSetData[currentImageSet].items[letter];
        
        if (!letterData) {
            console.error(`No data found for letter ${letter} in set ${currentImageSet}`);
            return;
        }
        
        // Update the letter display
        letterDisplay.className = 'letter';
        letterDisplay.textContent = letter;
        
        // Add a random color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        letterDisplay.classList.add(randomColor);
        
        // Update the word display
        wordContainer.textContent = letterData.name;
        
        // Update the image
        imageContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = `assets/images/${letterData.image.replace('.png', '.svg')}`;
        img.alt = letterData.name;
        img.classList.add('appear');
        imageContainer.appendChild(img);
        
        // Update instruction
        instruction.textContent = `Press the letter ${letter} on your keyboard!`;
        
        // Update progress bar
        const progress = ((currentLetterIndex) / alphabet.length) * 100;
        progressIndicator.style.width = `${progress}%`;
        
        // Set waiting for key press
        waitingForKeyPress = true;
        
        // Play the letter sound
        playLetterSound(letter);
    }
    
    // Handle correct key press
    function handleCorrectKeyPress() {
        // Play success sound
        playSuccessSound();
        
        // Add success animation
        letterDisplay.classList.add('success-pulse');
        imageContainer.firstChild.classList.add('success-pulse');
        
        // Update instruction
        instruction.textContent = 'Great job!';
        
        // Remove animations after they complete
        setTimeout(() => {
            letterDisplay.classList.remove('success-pulse');
            if (imageContainer.firstChild) {
                imageContainer.firstChild.classList.remove('success-pulse');
            }
            
            // Move to the next letter
            currentLetterIndex = (currentLetterIndex + 1) % alphabet.length;
            
            // If we've completed the alphabet, show a celebration
            if (currentLetterIndex === 0) {
                showCelebration();
            } else {
                // Otherwise, display the next letter
                displayCurrentLetter();
            }
        }, 1000);
    }
    
    // Handle incorrect key press
    function handleIncorrectKeyPress() {
        // Play error sound
        playErrorSound();
        
        // Add error animation
        letterDisplay.classList.add('shake');
        
        // Update instruction
        instruction.textContent = `Try again! Press the letter ${currentLetter} on your keyboard.`;
        
        // Remove animation after it completes
        setTimeout(() => {
            letterDisplay.classList.remove('shake');
        }, 500);
    }
    
    // Show celebration when the alphabet is completed
    function showCelebration() {
        // Clear the display
        imageContainer.innerHTML = '';
        letterDisplay.textContent = '🎉';
        letterDisplay.className = 'letter';
        wordContainer.textContent = 'You completed the alphabet!';
        instruction.textContent = 'Great job! Click a category to start again.';
        
        // Reset progress
        progressIndicator.style.width = '100%';
        
        // Add celebration animation
        letterDisplay.classList.add('bounce');
        
        // Play success sound
        playSuccessSound();
        
        // Not waiting for key press anymore
        waitingForKeyPress = false;
    }
    
    // Handle image set button clicks
    imageSetButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            imageSetButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current image set
            currentImageSet = this.dataset.set;
            
            // Reset to first letter
            currentLetterIndex = 0;
            
            // Display the current letter
            displayCurrentLetter();
        });
    });
    
    // Handle keyboard input
    document.addEventListener('keydown', function(event) {
        if (!waitingForKeyPress) return;
        
        // Get the current expected letter
        currentLetter = alphabet[currentLetterIndex];
        
        // Check if the key pressed is a letter
        const key = event.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
            if (key === currentLetter) {
                // Correct key press
                handleCorrectKeyPress();
            } else {
                // Incorrect key press
                handleIncorrectKeyPress();
            }
        }
    });
    
    // Initialize
    preloadLetterSounds();
    loadImageSetData();
});