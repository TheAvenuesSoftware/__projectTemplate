// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    export function wrapSelection(before, after) {
        const textarea = document.getElementById("notes-textarea");
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = textarea.value.substring(start, end);
        const wrapped = before + selected + after;
        if(window.consoleLog===true){console.log(wrapped,before,after);}
        
      textarea.setRangeText(wrapped, start, end, 'end');
      textarea.focus();
    }
    export function actionBoldClick(){
        // wrapSelection("{{b}}","{{/b}}");
        wrapSelection("<b>","</b>");
    }
    export function actionItalicClick(){
        // wrapSelection("{{i}}","{{/i}}");
        wrapSelection("<i>","</i>");
    }
    export function actionUnderlineClick(){
        // wrapSelection("{{u}}","{{/u}}");
        wrapSelection("<i>","</i>");
    }
    document.getElementById("btn_textSelectionBold").addEventListener("click",actionBoldClick);
    document.getElementById("btn_textSelectionItalic").addEventListener("click",actionItalicClick);
    document.getElementById("btn_textSelectionUnderline").addEventListener("click",actionUnderlineClick);
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    export function save() {
      const content = document.getElementById("editor").value;
      localStorage.setItem("customMarkupText", content);
      alert("Saved!");
    }
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 
    export function load() {
      const saved = localStorage.getItem("customMarkupText");
      document.getElementById("editor").value = saved || '';
    }
// 🛑 NOT USED 🛑 NOT USED🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 🛑 NOT USED 