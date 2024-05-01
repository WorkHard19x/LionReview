import React, { useState, useEffect } from 'react';
import '../styles/testing.css';
import { renderToString } from 'react-dom/server';

function Test() {
    const [selectedFormat, setSelectedFormat] = useState(null);
  const [text, setText] = useState('');

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleInput = (e) => {
    setText(e.target.innerText);
  };

  const applyFormat = (text) => {
    if (!selectedFormat) return text;
  
    let formattedText = text;
    const newContent = text.substr(text.length - 1);
  
    switch (selectedFormat) {
      case 'header':
        formattedText = text.length === 1 ? `<h1>${newContent}</h1>` : newContent;
        break;
      case 'bold':
        formattedText = text.length === 1 ? `<strong>${newContent}</strong>` : newContent;
        break;
      case 'italic':
        formattedText = text.length === 1 ? `<em>${newContent}</em>` : newContent;
        break;
      case 'color':
        formattedText = text.length === 1 ? `<span style="color: red;">${newContent}</span>` : newContent;
        break;
      case 'link':
        formattedText = linkifyText(newContent);
        break;
      default:
        formattedText = text;
    }
  
    return formattedText;
  };

  const linkifyText = (text) => {
    const words = text.split(' ');

    return words.map((word, index) => {
      if (word.toLowerCase() === 'love') {
        return (
          <a key={index} href="https://example.com" target="_blank" rel="noopener noreferrer">
            {word}
          </a>
        );
      } else {
        return word + ' ';
      }
    });
  };

  return (
    <div className="app-container">
      <div className="editor-toolbar">
        <button onClick={() => handleFormatChange("header")}>Header</button>
        <button onClick={() => handleFormatChange("bold")}>Bold</button>
        <button onClick={() => handleFormatChange("italic")}>Italic</button>
        <button onClick={() => handleFormatChange("color")}>Change Color</button>
        <button onClick={() => handleFormatChange("link")}>Hyperlink</button>
      </div>
      <div
        className="editor-content"
        contentEditable
        onInput={handleInput}
      >
        {applyFormat(text)}
      </div>
    </div>
  );
}

export default Test
