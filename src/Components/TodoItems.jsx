import { useState, useEffect, useRef } from 'react'; // Added useRef
import './CSS/TodoItems.css';

const TodoItems = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const inputRef = useRef(null); // Ref for the input element

  // Effect to focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Optionally, move cursor to the end
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [isEditing]);

  const handleEditSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (editedText.trim() !== '' && editedText !== task.text) { // Only update if text has changed
      onEdit(task.id, editedText);
    }
    setIsEditing(false); // Exit editing mode whether saved or not
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedText(task.text); // Revert to original text if escape is pressed
    }
  };

  // Double-click to edit, ensuring it doesn't conflict with checkbox click
  const handleTextDoubleClick = () => {
    if (!task.completed) { // Only allow editing if the task is not completed
      setIsEditing(true);
    }
  };

  return (
    <li className={`cyber-item ${task.completed ? 'completed' : ''}`}> {/* Changed div to li for semantic correctness */}
      <div className="task-controls">
        <div
          className={`checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          role="checkbox" // Accessibility
          aria-checked={task.completed} // Accessibility
          tabIndex="0" // Make it focusable
          onKeyPress={(e) => { // Allow toggling with space/enter keys
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault(); // Prevent scrolling with spacebar
              onToggleComplete(task.id);
            }
          }}
          aria-label={task.completed ? `Uncheck task: ${task.text}` : `Check task: ${task.text}`} // Accessibility
        >
          {task.completed && '✓'}
        </div>

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef} // Assign ref to input
              className="edit-input"
              aria-label={`Edit task: ${task.text}`} // Accessibility
            />
            <button type="submit" className="confirm-edit-btn" aria-label="Save edited task">[SAVE]</button>
          </form>
        ) : (
          <span
            className="task-text"
            onDoubleClick={handleTextDoubleClick}
            tabIndex="0" // Make text focusable for keyboard users
            onKeyPress={(e) => { // Allow editing with Enter key on the text
              if (e.key === 'Enter' && !task.completed) {
                setIsEditing(true);
              }
            }}
            aria-label={`Task: ${task.text}. Double-click to edit.`} // Accessibility
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="item-actions">
        {/* Only show edit button if not completed and not currently editing */}
        {!task.completed && !isEditing && (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)} // Toggle to true
            aria-label={`Edit task: ${task.text}`} // Accessibility
          >
            [EDIT]
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.text}`} // Accessibility
        >
          [DELETE]
        </button>
      </div>

      <div className="task-status">
        <span className="status-light"></span>
        <span className="status-text">
          {task.completed ? 'COMPLETED' : 'PENDING'}
        </span>
      </div>
    </li>
  );
};

export default TodoItems;