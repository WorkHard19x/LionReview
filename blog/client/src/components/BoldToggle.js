import React, { useState } from 'react';
import '../styles/News.css';

function BoldToggle({ textareaRef, type }) {
  const [isActive, setIsActive] = useState(false);

  const handleToggleClick = () => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    let newText = '';
    let startTag = '';
    let endTag = '';

    switch (type) {
      case 'b':
        startTag = isActive ? '' : '<strong>';
        endTag = isActive ? '' : '</strong>';
        break;
      case 'i':
        startTag = isActive ? '' : '<em>';
        endTag = isActive ? '' : '</em>';
        break;
      case 'color':
        startTag = isActive ? '' : '<span style="color:red">';
        endTag = isActive ? '' : '</span>';
        break;
      case 'link':
        if (!isActive) {
          const url = prompt('Enter the URL:');
          if (url) {
            startTag = `<a href="${url}" target="_blank">`;
            endTag = '</a>';
          }
        }
        break;
      case 'img':
        if (!isActive) {
          const imgUrl = prompt('Enter the image URL:');
          if (imgUrl) {
            newText = `<img src="${imgUrl}" alt="Image" />`;
            insertTextAtPosition(textarea, newText);
          }
        }
        break;
      default:
        break;
    }

    setIsActive(!isActive);
  };

  const insertTextAtPosition = (textarea, newText) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    textarea.value = before + newText + after;
    textarea.selectionStart = textarea.selectionEnd = start + newText.length;
  };

  return (
    <span className='bold-italic'
      style={{
        cursor: 'pointer',
        padding: '3px 0px',
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
