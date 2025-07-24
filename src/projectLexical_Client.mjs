// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
import {
    createEditor,
    $getSelection,
    $generateHtmlFromNodes
} from './node_modules/lexical';

document.addEventListener("DOMContentLoaded", () => {
    
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    // import { createEditor, $getSelection } from 'lexical';
    const editor = createEditor({
    namespace: 'VanillaEditor',
    onError(error) {
        console.error('Lexical error:', error);
    }
    });

    const editorElement = document.getElementById('editor');
    editor.setRootElement(editorElement);
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    // Format toggle buttons
    const buttons = {
        bold: document.getElementById('boldBtn'),
        italic: document.getElementById('italicBtn'),
        underline: document.getElementById('underlineBtn'),
        strikethrough: document.getElementById('strikeBtn'),
        code: document.getElementById('codeBtn'),
        subscript: document.getElementById('subBtn'),
        superscript: document.getElementById('supBtn')
    };

    // // Optional: log state changes
    // editor.registerUpdateListener(({ editorState }) => {
    //   editorState.read(() => {
    //     const json = editorState.toJSON();
    //     console.log('Editor state:', json);
    //   });
    // });

    // document.getElementById('toggleBoldBtn').addEventListener('click', () => {
    //   editor.update(() => {
    //     const selection = $getSelection();
    //     if (selection && selection.formatText) {
    //       // Check if selection already contains bold
    //       const isBold = selection.hasFormat('bold');
    //       if (isBold) {
    //         selection.toggleFormat('bold'); // remove bold
    //       } else {
    //         selection.toggleFormat('bold'); // apply bold
    //       }
    //     }
    //   });
    // });
    // // 🧠 Track editor changes to update button state
    // editor.registerUpdateListener(({ editorState }) => {
    //   editorState.read(() => {
    //     const selection = $getSelection();
    //     const isBold = selection?.hasFormat?.('bold');
    //     boldBtn.classList.toggle('active', !!isBold);
    //   });
    // });
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    // Toggle formatting
    Object.entries(buttons).forEach(([format, btn]) => {
        btn.addEventListener('click', () => {
            console.log(document.getElementById('boldBtn')); // Should not be null
            editor.update(() => {
            const selection = $getSelection();
            if (selection?.toggleFormat) {
                selection.toggleFormat(format);
            }
            });
        });
    });
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    // Update button states
    editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
            const selection = $getSelection();
            Object.entries(buttons).forEach(([format, btn]) => {
                const isActive = selection?.hasFormat?.(format);
                btn.classList.toggle('active', !!isActive);
                console.log(document.getElementById('boldBtn')); // Should not be null
            });
        });
    });
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    // Save to backend
    document.getElementById('saveBtn').addEventListener('click', () => {
        editor.update(() => {
            const html = $generateHtmlFromNodes(editor, null);
            fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: html })
            })
            .then(res => res.json())
            .then(data => {
                alert(`Saved! Note ID: ${data.id}`);
                previewEl.innerHTML = html;
            });
        });
    });
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    // Load from backend
    document.getElementById('loadBtn').addEventListener('click', () => {
        const id = prompt('Enter note ID:');
        fetch(`/load/${id}`)
            .then(res => res.json())
            .then(data => {
            previewEl.innerHTML = data.content;
        });
    });
    
});
