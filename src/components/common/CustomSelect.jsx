import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.label}
        <span className={classNames('arrow', { open: isOpen })}></span>
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option.value}
              className={classNames('option', { selected: value === option.value })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
