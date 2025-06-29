# 🖥️ SYSTEM_TODO.EXE

A cyberpunk-themed task management application built with React, designed to help you organize your directives in a futuristic, glitchy interface. It's an operational system built for the digital realm, ensuring your tasks are logged, tracked, and completed with a unique aesthetic and auditory feedback.

---

## ✨ Features

- 💻 **Cyberpunk Aesthetic**: Neon glows, monospace fonts, dark interface.
- ⚡ **Glitch Effects**: Visual glitches during task interactions.
- 🔊 **Audio Feedback**: Sound effects for actions like add, delete, complete, uncheck.
- 💾 **Persistent Storage**: Tasks are stored in browser's localStorage.
- ✅ **Task Management**:
  - Add, edit, complete, and delete tasks.
- 📊 **Real-time Task Stats**: Tracks total, active, and completed tasks.
- 📱 **Responsive Design**: Works across desktops and mobile devices.

---

## 🚀 Technologies Used

- **React.js** – UI framework
- **JavaScript (ES6+)** – Core logic
- **HTML5** – Markup
- **CSS3** – Styling and effects (glitch, flicker, scanlines)
- **Google Fonts** – Uses 'Share Tech Mono'

---

## ⚙️ Setup and Installation

### 1. Create a React App

```bash
npx create-react-app system-todo-exe
cd system-todo-exe
```

### 2. Place the Files

- Put `App.jsx`, `Todo.jsx`, and `TodoItems.jsx` into `src/Components/`
- Put `Todo.css` and `TodoItems.css` into `src/CSS/`
- Add sound files (`add.mp3`, `delete.mp3`, `check.mp3`, `uncheck.mp3`) into `src/sounds/`

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Run the Application

```bash
npm start
# or
yarn start
```

Open in your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🎮 Usage

- **Add a Task**: Type in the input field and press Enter or click [EXECUTE]
- **Complete a Task**: Click the checkbox
- **Edit a Task**: Double-click or click [EDIT], then save or cancel
- **Delete a Task**: Click [DELETE]
- **System Status**: See total, active, and completed stats in the header

---

## 💡 Future Enhancements

- 🏷️ Categorization/Tags
- ⚠️ Priority Levels
- 📅 Due Dates
- 🔐 User Accounts (via Firebase/Firestore)
- 🎞️ Advanced Animations
- 🎵 Sound Customization
