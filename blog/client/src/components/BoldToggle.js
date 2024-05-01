import React, { useState } from 'react';
import '../styles/News.css';

function BoldToggle({ textareaRef, type }) {
  const [isActive, setIsActive] = useState(false);

  const handleToggleClick = () => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    let newText = ''; // Declare newText here
  
    switch (type) {
      case 'b':
        insertTextAtPosition(textarea, '<strong>', '</strong>');
        break;
      case 'i':
        insertTextAtPosition(textarea, '<em>', '</em>');
        break;
      case 'br':
          insertTextAtPosition(textarea, '<br/>');
          break;
      case 'color':
        const color = prompt('Enter color:');
        if (color) {
          insertTextAtPosition(textarea, `<span style="color:${color}">`, '</span>');
        }
        break;
      case 'link':
        const url = prompt('Enter the URL:');
        if (url) {
          insertTextAtPosition(textarea, `<a href="${url}" target="_blank">`, '</a>');
        }
        break;
      case 'img':
        if (!isActive) {
          const imgUrl = prompt('Enter the image URL:');
          if (imgUrl) {
            newText = `<img src="${imgUrl}" alt="Image" />`;
            insertTextAtPosition(textarea, newText, '');
          }
        }
        break;
      default:
        break;
    }
  
    setIsActive(!isActive);
  };
  

  const insertTextAtPosition = (textarea, newText, endText = '') => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
  
    textarea.value = before + newText + endText + after;
    textarea.selectionStart = textarea.selectionEnd = start + newText.length + endText.length;
  };
  
  

  return (
    <span className='bold-italic'
      style={{
        cursor: 'pointer',
        padding: '1px 0px',
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '5px',
        fontWeight: type === 'b' && isActive ? 'bold' : 'normal',
        fontStyle: type === 'i' && isActive ? 'italic' : 'normal',
        color: type === 'color' && isActive ? 'red' : 'white',
        textDecoration: type === 'link' ? 'underline' : 'none',
      }}
      onClick={handleToggleClick}
    >
      {type.toUpperCase()}
    </span>
  );
}

export default BoldToggle;