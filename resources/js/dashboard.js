const textarea = document.getElementById('autoResize');
textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';  // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`;  // Set to the scroll height
});
