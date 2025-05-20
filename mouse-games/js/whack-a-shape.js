class WhackAShape {
    constructor(container, { playSuccessSound, playClickSound }) {
        this.container = container;
        this.playSuccessSound = playSuccessSound;
        this.playClickSound = playClickSound;
        this.shapes = [];
        this.colors = ['#ff6b6b', '#51cf66', '#339af0', '#fcc419', '#cc5de8', '#ff922b'];
        this.shapeTypes = ['circle', 'square', 'triangle'];
        this.isRunning = false;
        this.timers = [];
    }
    
    start() {
        this.isRunning = true;
        this.container.style.cursor = 'pointer';
        
        // Create game instructions
        const instructions = document.createElement('div');
        instructions.className = 'game-start-message';
        instructions.innerHTML = '<h2>Click on the shapes!</h2>';
        this.container.appendChild(instructions);
        
        // Remove instructions after 2 seconds
        setTimeout(() => {
            if (instructions.parentNode === this.container) {
                this.container.removeChild(instructions);
            }
            this.createShape();
        }, 2000);
    }
    
    stop() {
        this.isRunning = false;
        this.timers.forEach(timer => clearTimeout(timer));
        this.shapes.forEach(shape => {
            if (shape.parentNode === this.container) {
                this.container.removeChild(shape);
            }
        });
        this.shapes = [];
    }
    
    createShape() {
        if (!this.isRunning) return;
        
        // Create a new shape element
        const shape = document.createElement('div');
        shape.className = 'shape';
        
        // Random shape type
        const shapeType = this.shapeTypes[Math.floor(Math.random() * this.shapeTypes.length)];
        shape.classList.add(shapeType);
        
        // Random color
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        shape.style.backgroundColor = color;
        
        // Random size (large for toddlers)
        const size = Math.floor(Math.random() * 50) + 100; // 100-150px
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // Random position (keeping away from edges)
        const maxX = this.container.clientWidth - size - 40;
        const maxY = this.container.clientHeight - size - 40;
        const x = Math.floor(Math.random() * maxX) + 20;
        const y = Math.floor(Math.random() * maxY) + 20;
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
        
        // Add click handler
        shape.addEventListener('click', () => this.handleShapeClick(shape));
        
        // Add to container and shapes array
        this.container.appendChild(shape);
        this.shapes.push(shape);
        
        // Remove shape after some time if not clicked
        const timeout = setTimeout(() => {
            if (shape.parentNode === this.container) {
                this.container.removeChild(shape);
                const index = this.shapes.indexOf(shape);
                if (index > -1) {
                    this.shapes.splice(index, 1);
                }
                this.createShape();
            }
        }, 5000); // 5 seconds
        
        this.timers.push(timeout);
    }
    
    handleShapeClick(shape) {
        if (!this.isRunning) return;
        
        // Play success sound
        this.playSuccessSound();
        
        // Add celebration animation
        shape.classList.add('celebrate');
        
        // Remove shape after animation
        setTimeout(() => {
            if (shape.parentNode === this.container) {
                this.container.removeChild(shape);
                const index = this.shapes.indexOf(shape);
                if (index > -1) {
                    this.shapes.splice(index, 1);
                }
            }
        }, 500);
        
        // Create a new shape after a short delay
        setTimeout(() => {
            if (this.isRunning) {
                this.createShape();
            }
        }, 800);
    }
}