module.exports = {
    editorToolbar: [
        [{ 'font': [] }],
        ['bold', 'italic', 'underline'],        // toggled buttons
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'align': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        ['code-block'],
    ]
};