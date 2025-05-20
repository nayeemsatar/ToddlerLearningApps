class ColorPicker {
    constructor(container, { playSuccessSound, playClickSound }) {
        this.container = container;
        this.playSuccessSound = playSuccessSound;
        this.playClickSound = playClickSound;
        this.colors = [
            { name: 'Red', value: '#ff6b6b' },
            { name: 'Green', value: '#51cf66' },
            { name: 'Blue', value: '#339af0' },
            { name: 'Yellow', value: '#fcc419' }
        ];
        this.currentTarget = null;
        this.isRunning = false;
        this.timers = [];
    }
    
    start() {
        this.isRunning = true;
        
        // Create game instructions
        const instructions = document.createElement('div');
        instructions.className = 'game-start-message';
        instructions.innerHTML = '<h2>Click on the color when asked!</h2>';
        this.container.appendChild(instructions);
        
        // Remove instructions after 2 seconds
        setTimeout(() => {
            if (instructions.parentNode === this.container) {
                this.container.removeChild(instructions);
            }
            this.createColorGrid();
        }, 2000);
    }
    
    stop() {
        this.isRunning = false;
        this.timers.forEach(timer => clearTimeout(timer));
        this.container.innerHTML = '';
    }
    
    createColorGrid() {
        if (!this.isRunning) return;
        
        // Create color grid
        const colorGrid = document.createElement('div');
        colorGrid.className = 'color-grid';
        
        // Create color boxes
        this.colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color.value;
            colorBox.dataset.color = color.name;
            
            colorBox.addEventListener('click', () => this.handleColorClick(colorBox));
            
            colorGrid.appendChild(colorBox);
        });
        
        this.container.appendChild(colorGrid);
        
        // Set a random target color
        this.setRandomTarget();
    }
    
    setRandomTarget() {
        if (!this.isRunning) return;
        
        // Remove any existing instruction
        const existingInstruction = this.container.querySelector('.target-color-instruction');
        if (existingInstruction) {
            this.container.removeChild(existingInstruction);
        }
        
        // Select a random color as target
        this.currentTarget = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        // Create instruction element
        const instruction = document.createElement('div');
        instruction.className = 'target-color-instruction';
        instruction.textContent = `Click on ${this.currentTarget.name}!`;
        instruction.style.color = this.currentTarget.value;
        
        this.container.appendChild(instruction);
    }
    
    handleColorClick(colorBox) {
        if (!this.isRunning || !this.currentTarget) return;
        
        this.playClickSound();
        
        const clickedColor = colorBox.dataset.color;
        
        if (clickedColor === this.currentTarget.name) {
            // Correct color!
            this.playSuccessSound();
            
            // Add celebration animation
            colorBox.classList.add('celebrate');
            
            // Set a new target after a delay
            setTimeout(() => {
                colorBox.classList.remove('celebrate');
                if (this.isRunning) {
                    this.setRandomTarget();
                }
            }, 1500);
        } else {
            // Wrong color - provide subtle feedback
            colorBox.classList.add('pop');
            setTimeout(() => {
                colorBox.classList.remove('pop');
            }, 300);
        }
    }
}