const consoleLog = false

if(consoleLog===true){console.log("LOADED:- globalUIpopups.mjs is loaded",new Date().toLocaleString());}
export function globalUIpopupsJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// Function to create and showCustomAlert() alert
    export function showCustomMessage(message,type="plain",nSeconds=0) {

        // Create overlay
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.classList.add("overlay");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
    
        // Create dialog
        const dialog = document.createElement("div");
        dialog.id = "custom-alert-dialog";
        dialog.style.background = "rgba(255,255,255,1)";
        dialog.style.padding = "20px";
        dialog.style.borderRadius = "8px";
        dialog.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        dialog.style.textAlign = "center";
    
        // Create title paragraph
        const messageParagraph1 = document.createElement("p");
        messageParagraph1.textContent = "Alert";
    
        // Create message paragraph
        const messageParagraph2 = document.createElement("p");
        messageParagraph2.textContent = message;
    
        // Create OK button
        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        okButton.style.marginTop = "10px";
        okButton.style.padding = "8px 16px";
        okButton.style.border = "none";
        okButton.style.borderRadius = "4px";
        okButton.style.backgroundColor = "#007bff";
        okButton.style.color = "white";
        okButton.style.cursor = "pointer";    
        okButton.addEventListener("mouseover", () => {
        okButton.style.backgroundColor = "#0056b3";
        });    
        okButton.addEventListener("mouseout", () => {
        okButton.style.backgroundColor = "#007bff";
        });    
        okButton.addEventListener("click", () => {
            document.body.removeChild(overlay); // Remove the dialog from the DOM
        });
    
        // Append elements together
        dialog.appendChild(messageParagraph1);
        dialog.appendChild(messageParagraph2);
        dialog.appendChild(okButton);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay); // Add the dialog to the document
    }

function showTransientMessage(message,type="plain",nSeconds=5) {

    // Create Overlay
        const overlay= document.createElement("div");
        overlay.id = "overlay";
        overlay.classList.add("overlay");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
    
    // Create transientMessageDialog
        const transientMessageDialog = document.createElement("div");
        transientMessageDialog.id = "transientMessageDialog";
        if(type==="warning"){
            transientMessageDialog.style.color = "rgba(225, 225, 225, 1)";
            transientMessageDialog.style.background = "rgba(255, 0, 0, 0.75)";
        }else{
            transientMessageDialog.style.background = "rgba(255, 255, 255, 1)";
        }
        transientMessageDialog.style.padding = "20px";
        transientMessageDialog.style.borderRadius = "8px";
        transientMessageDialog.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        transientMessageDialog.style.textAlign = "center";
    
    // Create title paragraph
        const messageParagraph1 = document.createElement("p");
        // messageParagraph1.textContent = "Message will dissappear automatically...";
    
    // Create message paragraph
        const messageParagraph2 = document.createElement("p");
        messageParagraph2.textContent = message;
        
    // Append elements together
        transientMessageDialog.appendChild(messageParagraph1);
        transientMessageDialog.appendChild(messageParagraph2);
    // transientMessageDialog.appendChild(okButton);
        overlay.appendChild(transientMessageDialog);
        document.body.appendChild(overlay); // Add the transientMessageDialog to the document

    // 
        // setTimeout(()=>{
        //     document.body.removeChild(overlay);
        // },nSeconds * 1000)
}

// popup busy animation
    function popupBusyAnimation(){

        const overlay= document.createElement("div");
        const animation = document.createElement("div");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const span3 = document.createElement("span");

        overlay.id = "overlay";
        overlay.classList.add("overlay");
        overlay.classList.add("busy-animation");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.25)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";

        // animation.id = "busy-animation-container";
        animation.classList.add("container");
        animation.style.background = "rgba(255, 255, 255, 1)";
        animation.style.padding = "20px";
        animation.style.borderRadius = "8px";
        animation.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        animation.style.textAlign = "center";

        span1.classList.add("dot");
        span2.classList.add("dot");
        span3.classList.add("dot");

        overlay.appendChild(animation);
        animation.appendChild(span1);
        animation.appendChild(span2);
        animation.appendChild(span3);
        // animation.appendChild(overlay);
        document.body.appendChild(overlay);

    }
