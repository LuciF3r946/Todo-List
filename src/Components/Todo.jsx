import { useState, useEffect, useCallback } from 'react'; // Added useCallback
import './CSS/Todo.css';

// Sound effects imports
import addSound from './sounds/add.mp3';
import deleteSound from './sounds/delete.mp3';
import checkSound from './sounds/check.mp3';
import uncheckSound from './sounds/uncheck.mp3';

// Import the TodoItems component
import TodoItems from './TodoItems'; // Assuming TodoItems.jsx is in the same Components folder, adjust path if needed

const Todo = () => {
  // Initialize state from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to local storage:", error);
      // Potentially notify the user or handle the error gracefully
    }
  }, [tasks]);

  // Consolidated audio function with improved error handling and memoization
  const playSound = useCallback((type) => {
    const soundMap = {
      add: addSound,
      check: checkSound,
      uncheck: uncheckSound,
      delete: deleteSound
    };

    const soundFile = soundMap[type];

    if (!soundFile) {
      console.warn(`No sound file found for type: ${type}`);
      return;
    }

    try {
      const sound = new Audio(soundFile);
      sound.volume = 0.2; // Adjusted volume to 20% for consistency, can be tuned
      sound.play().catch(e => {
        // Catch and log autoplay policy errors without breaking the app
        if (e.name === "NotAllowedError" || e.name === "AbortError") {
          console.warn(`Sound playback prevented by browser: ${e.message}`);
        } else {
          console.error('Error playing sound:', e);
        }
      });
    } catch (e) {
      console.error('Failed to create Audio object:', e);
    }
  }, []); // Empty dependency array means this function is created once

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 500); // Glitch effect duration
      playSound('add');

      setTasks([
        ...tasks,
        {
          text: newTask.trim(), // Trim new task text
          completed: false,
          id: Date.now(), // Unique ID for each task
        }
      ]);
      setNewTask(''); // Clear input after adding
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const toggleTaskCompletion = useCallback((id) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === id) {
        playSound(task.completed ? 'uncheck' : 'check'); // Play sound based on *current* completion status before toggling
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  }, [playSound]);

  const deleteTask = useCallback((id) => {
    playSound('delete');
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [playSound]);

  // New function to handle editing tasks
  const editTask = useCallback((id, newText) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    ));
  }, []);

  return (
    <div className={`cyber-container ${glitchEffect ? 'glitch' : ''}`}>
      <div className="cyber-header">
        <h1 className="cyber-title">SYSTEM_TODO.EXE</h1>
        <div className="cyber-stats">
          <span className="stat">TASKS: {tasks.length}</span>
          <span className="stat">ACTIVE: {tasks.filter((t) => !t.completed).length}</span>
          <span className="stat">COMPLETE: {tasks.filter((t) => t.completed).length}</span>
        </div>
      </div>

      <div className="cyber-input-container">
        <input
          type="text"
          placeholder="> ENTER NEW DIRECTIVE..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="cyber-input"
          aria-label="Enter new task" // Accessibility improvement
        />
        <button
          className="cyber-add-btn"
          onClick={handleAddTask}
          aria-label="Execute: Add task" // Accessibility improvement
        >
          [EXECUTE]
        </button>
      </div>

      <div className="cyber-list">
        {tasks.length === 0 ? (
          <div className="cyber-empty">
            <p>NO DIRECTIVES FOUND</p>
            <p>SYSTEM AWAITING INPUT...</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <TodoItems
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskCompletion}
                onDelete={deleteTask}
                onEdit={editTask} // Pass the editTask function
              />
            ))}
          </ul>
        )}
      </div>

      <div className="cyber-footer">
        <div className="saline"></div> {/* Keep for your CSS effects */}
        <p>SYSTEM STATUS: OPERATIONAL</p>
      </div>
    </div>
  );
};

export default Todo;