# Toddler Learning App Suite

A set of simple, engaging, and offline-first educational web applications for toddlers (ages 1-3) designed to introduce basic keyboard and mouse skills. These applications are intended to run on a dedicated learning station for young children.

## 🌟 Features

- **Offline-First**: All applications run entirely without internet dependency
- **Toddler-Friendly UI**: Large elements, bright colors, and simple interactions
- **Educational Focus**: Teaches basic computer skills through play
- **No Data Collection**: Privacy-focused with no user data storage
- **Customizable**: Multiple themes and image sets

## 📱 Applications

### 1. Phonetic Keyboard Explorer

![Phonetic Keyboard Explorer](screenshots/keyboard-explorer.png)

- **Guided Learning**: Displays a letter and corresponding image, requiring the child to press the matching key
- **Multiple Image Sets**: Animals, vehicles, and musical instruments
- **Progress Tracking**: Visual progress bar shows advancement through the alphabet
- **Positive Reinforcement**: Animations and sounds provide feedback for correct answers
- **Phonetic Focus**: Audio feedback emphasizes letter sounds

### 2. Mouse Click Games

![Mouse Click Games](screenshots/mouse-games.png)

#### Whack-a-Shape
- Large, colorful shapes appear one at a time at random positions
- Simple click interaction with immediate visual and audio feedback
- Targets sized appropriately for developing motor skills

#### Color Picker
- Four large, distinct color patches with simple identification task
- Clear instructions guide the child to click a specific color
- Focuses on basic cause-and-effect of clicking

## 🚀 Getting Started

### Prerequisites

- Node.js (for running the server)
- Modern web browser (Chrome/Firefox/Safari/Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/openhands/toddler-learning-apps.git
   cd toddler-learning-apps
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Access the application:
   - Open your browser and navigate to `http://localhost:12000`

### Kiosk Mode Setup (Optional)

For a dedicated learning station:

1. Configure a computer to boot directly into Chrome in kiosk mode
2. Set the browser to open the application URL on startup
3. Consider using a touch screen or child-friendly input devices

## 🔧 Technical Details

- Built with HTML5, CSS3, and vanilla JavaScript
- No external dependencies or frameworks
- Responsive design works on various screen sizes
- SVG-based placeholder images (can be replaced with real images)

## 📂 Project Structure

```
toddler-learning-apps/
├── common/                  # Shared resources
│   ├── css/
│   │   └── main.css         # Common styles
│   └── assets/              # Shared assets
├── keyboard-explorer/       # Keyboard Explorer app
│   ├── index.html
│   ├── css/
│   │   └── keyboard-explorer.css
│   ├── js/
│   │   └── keyboard-explorer.js
│   └── assets/
│       ├── image-sets.json  # Configuration for image sets
│       └── images/          # Image assets for each set
│           ├── animals/
│           ├── vehicles/
│           └── instruments/
├── mouse-games/             # Mouse Click Games
│   ├── index.html
│   ├── css/
│   │   └── mouse-games.css
│   ├── js/
│   │   ├── mouse-games.js
│   │   ├── whack-a-shape.js
│   │   └── color-picker.js
│   └── assets/
├── index.html               # Main entry point
├── server.js                # Simple HTTP server
└── README.md                # Documentation
```

## 🔮 Future Enhancements

- Add real audio files for letter sounds
- Add more game variations
- Implement difficulty levels
- Add additional visual themes
- Support for touch devices
- Parent/teacher dashboard for customization
- Additional languages support
- Printable activity sheets to complement digital learning

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request