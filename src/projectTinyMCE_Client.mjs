    // Initialize TinyMCE START
        const tinymceConfig = {
            license_key: 'gpl',
            // selector START
                // 💡selector: '#note-editor', // use target: dynamically instead
                    // - If you use selector, TinyMCE handles element detection internally.
                    // - If you use target (see function initTinyMCE), you're saying: “I already have the element—attach the editor to this one.” 💡
            // selector END
            branding: false,
            // menubar: false,
            menubar: `format`,
            // height: 300,
            plugins: 'autoresize lists link code',
            // toolbar: 'undo redo | bold italic underline strikethrough | bullist numlist',
            toolbar: 'undo redo bold italic underline strikethrough bullist numlist',
            content_css: './styles/globalTinyMCE.css',
            statusbar: true,
            elementpath: false,
            setup: function (editor) {
                // - editor.on('init', ...): Mimics your focus handler by pre-loading saved content when the editor is ready.
                // - Uses TinyMCE’s getContent() and setContent() instead of accessing .value, since it’s not a basic textarea anymore.
                    editor.on('init', function () {
                        // 📝Load from localStorage on init START
                            // console.log(editor.id);
                            if(editor.id==="tinymce_0"){
                                const savedNote = localStorage.getItem('tas_note_0');
                                if (savedNote) {
                                    editor.setContent(savedNote);
                                }
                            }else{
                                const editedNote = localStorage.getItem('tas_note_toEdit');
                                if (editedNote) {
                                    editor.setContent(editedNote);
                                }
                            }
                        // Load from localStorage on init END📝
                    });
                // - editor.on('blur', ...): Works just like your blur listener, saving the HTML content when the editor loses focus.
                    editor.on('blur', function () {
                        // 📝Save to localStorage when focus is lost START
                            const currentContent = editor.getContent();
                            // console.log(editor.id);
                            if(editor.id==="tinymce_0"){
                                localStorage.setItem('tas_note_0', currentContent);
                                document.getElementById("save_note_0").innerHTML = currentContent;
                            }else{
                                localStorage.setItem('tas_note_edited', currentContent);
                            }
                        // Save to localStorage when focus is lost END📝
                    });
                // - editor.on(`keydown`,...):
                    editor.on('keydown', function (event) {
                        // 📝Tab key behaviour START
                            // approach 1
                                // if (event.keyCode === 9) { // Tab key
                                //   if (event.shiftKey) {
                                //     editor.execCommand('Outdent');
                                //   } else {
                                //     editor.execCommand('Indent');
                                //   }
                                //   event.preventDefault();
                                // }
                            // approach 2
                                // if (event.keyCode === 9) { // Tab key
                                //   event.preventDefault();
                                //   const content = editor.selection.getContent({ format: 'html' });
                                //   if (event.shiftKey) {
                                //     // Only remove if content starts with exactly 4 &emsp;
                                //     const emspPattern = /^(&emsp;){4}/;
                                //     if (emspPattern.test(content)) {
                                //       const updated = content.replace(emspPattern, '');
                                //       editor.selection.setContent(updated);
                                //     }
                                //   } else {
                                //     // Add 4 &emsp; for indent
                                //     editor.selection.setContent(`&emsp;&emsp;&emsp;&emsp;${content}`);
                                //   }
                                // }
                            // approach 3
                                // - \u00A0 is a non-breaking space character (aka &nbsp;)—it renders reliably in HTML environments.
                                // - It avoids using entities like &emsp; which are wider and don’t behave like plain space characters.
                                // - The caret repositions after the inserted spaces so the user can keep typing seamlessly.
                                if (event.key === 'Tab' || event.keyCode === 9) {
                                    event.preventDefault();
                                    // Exit if Shft+Tab is pressed
                                        if (event.shiftKey) {
                                            return;
                                        }
                                    // Insert four actual spaces
                                        editor.selection.setContent('\u00A0\u00A0\u00A0\u00A0'); // Non-breaking spaces
                                    // Move cursor right after inserted spaces
                                        const rng = editor.selection.getRng();
                                        rng.setStart(rng.endContainer, rng.endOffset);
                                        rng.setEnd(rng.endContainer, rng.endOffset);
                                        editor.selection.setRng(rng);
                                }
                        // Tab key behaviour END📝
                    });
            },
        }
    // Initialize TinyMCE END

// export function initTinyMCE(id="tinymce_0") {
//     // Initialize TinyMCE for all elements with class 'tinymce-editor'
//         document.querySelectorAll('.tinymce-editor').forEach(el => {
//             console.log(`Initialising TinyMCE editor for:- ${el.id}`)
//             tinymce.init({
//                 ...tinymceConfig,
//                 target: el
//             });
//         });
// }
export function removeTinyMCE(){
    document.querySelectorAll('.tinymce-editor').forEach(el => {
        console.log(`Removing TinyMCE editor from:- ${el.id}`)
        tinymce.remove(el);
    });
}
export async function initTinyMCE(el) {
    await removeTinyMCE();
    console.log(`Initialising TinyMCE editor for:- ${el.id}`)
    const textareaHTML = document.getElementById(`${el.id}`).textContent;
    console.log(textareaHTML);
    localStorage.setItem("tas_note_0",textareaHTML);
    tinymce.init({
        ...tinymceConfig,
        target: el
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const tinymceElement = document.getElementById('tinymce_0');
    initTinyMCE(tinymceElement); // Call this to initialize TinyMCE on page load

});