import './Card.css';
import { useRef } from 'react';
import { useAutoFocus } from './useAutoFocus';
 
export const Card = ({
  id,
  title,
  onTitleChange,
  done,
  onToggle,
  onDelete,
}) => {

  const inputRef = useAutoFocus();

  const handleTitleChange = (event) => {
    onTitleChange(id, event.target.value);
  };

  const handleCheckboxChange = () => {
    onToggle(id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onToggle(id);
  };

  const handleTitleBlur = () => {
    if (title === ''){
      onDelete(id)
    }   
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <input
        className="card__done"
        type="checkbox"
        checked={done}
        onChange={handleCheckboxChange}
        tabIndex={-1}
      />

      <input
        ref = {inputRef}
        className="card__title"
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
      />
    </form>
  );
};
