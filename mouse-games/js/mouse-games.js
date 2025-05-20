document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');
    const whackShapeBtn = document.getElementById('whackShapeBtn');
    const colorPickerBtn = document.getElementById('colorPickerBtn');
    
    let currentGame = null;
    
    // Audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Play a simple sound effect
    function playSound(frequency, duration, type = 'sine') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        
        gainNode.gain.value = 0.3;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Play a success sound
    function playSuccessSound() {
        playSound(523.25, 0.1); // C5
        setTimeout(() => playSound(659.25, 0.1), 100); // E5
        setTimeout(() => playSound(783.99, 0.2), 200); // G5
    }
    
    // Play a click sound
    function playClickSound() {
        playSound(440, 0.1, 'triangle'); // A4
    }
    
    // Clear the game area
    function clearGameArea() {
        gameArea.innerHTML = '';
        if (currentGame && currentGame.stop) {
            currentGame.stop();
        }
    }
    
    // Set active button
    function setActiveButton(button) {
        whackShapeBtn.classList.remove('active');
        colorPickerBtn.classList.remove('active');
        button.classList.add('active');
    }
    
    // Start Whack-a-Shape game
    whackShapeBtn.addEventListener('click', function() {
        clearGameArea();
        setActiveButton(whackShapeBtn);
        currentGame = new WhackAShape(gameArea, { 
            playSuccessSound, 
            playClickSound 
        });
        currentGame.start();
    });
    
    // Start Color Picker game
    colorPickerBtn.addEventListener('click', function() {
        clearGameArea();
        setActiveButton(colorPickerBtn);
        currentGame = new ColorPicker(gameArea, { 
            playSuccessSound, 
            playClickSound 
        });
        currentGame.start();
    });
});