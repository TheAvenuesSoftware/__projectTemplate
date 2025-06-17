const consoleLog = true;

console.log("LOADED:- projectMenu_Client.mjs is loaded",new Date().toLocaleString());
export function projectMenuClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { setCSSvariable, getCSSvariable, getTextWidth, showDimensions } from "./global_Client_Dimensions.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// set up draggable "M"enu button START 🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇
    // function showMenu(){
    //     const menu = document.getElementById("menu");
    //     console.log('🟢 showMenu() called');
    //     // document.getElementById("menu-button").focus(); // Give focus to an element
    //     // setTimeout(() => alert("d"), 100); // Slight delay avoids event conflicts
    //     alert("d");
    // }
    const menuButton = document.getElementById("m");
    let offsetX, offsetY, isDragging = false;
    // Start Dragging (Mouse & Touch)
        const startDrag = (e) => {
            isDragging = true;
            // Get initial position relative to mouse/touch point
                offsetX = e.clientX ? e.clientX - menuButton.offsetLeft : e.touches[0].clientX - menuButton.offsetLeft;
                offsetY = e.clientY ? e.clientY - menuButton.offsetTop : e.touches[0].clientY - menuButton.offsetTop;
            // Prevent default touch behavior (like scrolling) ✅ Calling e.preventDefault() stops unintended page movement
                e.preventDefault();
            document.addEventListener("mousemove", dragMove);
            document.addEventListener("mouseup", endDrag);
            document.addEventListener("touchmove", dragMove);
            document.addEventListener("touchend", endDrag);
        };
    // Move Button (Mouse & Touch)
        const dragMove = (e) => {
            if (!isDragging) return;
            // Prevent scrolling when moving touch ✅ Calling e.preventDefault() stops unintended page movement
                e.preventDefault();
            const x = e.clientX ? e.clientX - offsetX : e.touches[0].clientX - offsetX;
            const y = e.clientY ? e.clientY - offsetY : e.touches[0].clientY - offsetY;
            menuButton.style.left = `${x}px`;
            menuButton.style.top = `${y}px`;
        };
    // Stop Dragging (Mouse & Touch)
        const endDrag = () => {
            isDragging = false;
            document.removeEventListener("mousemove", dragMove);
            document.removeEventListener("mouseup", endDrag);
            document.removeEventListener("touchmove", dragMove);
            document.removeEventListener("touchend", endDrag);
        };
    menuButton.addEventListener("mousedown", startDrag);
    // Why add {passive: false}
        // - By default, browsers treat touch events as "passive", meaning they allow scrolling even if e.preventDefault() is called.
        // - Setting { passive: false } ensures that e.preventDefault() works correctly to stop unintended scrolling while dragging.
            menuButton.addEventListener("touchstart", startDrag);
            menuButton.addEventListener("touchstart", startDrag, { passive: false });
    // Show menu on double-click || long press on mobile devices
        // laptop and desktop - double click
// executes here!!!
            // menuButton.addEventListener("dblclick", showMenu);
            // menuButton.addEventListener("dblclick", toggleMenu);
        // mobile devices - long press
            // - touchstart → Starts a timer for 500ms (adjustable)
            // - touchend / touchmove / touchcancel → Cancels the timer if touch is released or moved
            // - Prevents accidental menu triggers from quick taps
            // - Works smoothly on iPhone & Android!
                let pressTimer;
                // Detect Long Press
                    menuButton.addEventListener("touchstart", (e) => {
                        pressTimer = setTimeout(() => {
// executes here!!!
                            // showMenu(); // Trigger menu display
                            // toggleMenu(); // Trigger menu display
                        }, 500); // Adjust time (500ms = half a second)
                    }, { passive: false });
                // Cancel Long Press on Touch End or Move
                menuButton.addEventListener("touchend", () => clearTimeout(pressTimer));
                menuButton.addEventListener("touchmove", () => clearTimeout(pressTimer));
                menuButton.addEventListener("touchcancel", () => clearTimeout(pressTimer));
// set up draggable "M"enu button END 🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇

// export function toggleMenu() {
//     document.getElementById("navMenu").classList.toggle("expanded");
// }
// export function toggleSubMenu(id) {
//     document.getElementById(id).classList.toggle("expanded");
// }

        // classic menu START 🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒
            document.getElementById("classic-menu-container").addEventListener("click", (event) => {
                const actions = {
                    showAddress: showAddress,
                    showNotes: showNotes
                };
                if (event.target.classList.contains("menu-item")) {
                    console.log(event.target.getAttribute("data-action"));
                    if (actions[event.target.getAttribute("data-action")]) {
                        actions[event.target.getAttribute("data-action")](event);  // Executes the function
                    } else {
                        console.warn(`No action defined for ${event.target.getAttribute("data-action")}`);
                    }
                    // // Close the menu after clicking an item
                    //     document.getElementById("navMenu").classList.remove("expanded");
                } else if (event.target.classList.contains("header-item")) {
                    console.log(event.target.textContent);
                    const parent = event.target;
                    const el = event.target.nextElementSibling;
                    parent.classList.toggle("expanded");
                    el.classList.toggle("expanded");
                } else {
                    console.warn("Clicked element is not a menu item or container.");
                }
            });
        // classic menu END 🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒

export function getRequiredMenuWidth(){
    const menuContainer = document.getElementById("classic-menu-container")
    const headerItems = document.querySelectorAll(".header-item");
    console.log(headerItems[0]);
    let maxWidth = 0;
    headerItems.forEach((item, index) => {
        const itemText = item.textContent;
        const itemFont = getComputedStyle(item).fontFamily;
        if(getTextWidth(itemText, itemFont) > maxWidth) {
            maxWidth = getTextWidth(itemText, itemFont);
        }
        console.log(item.textContent);
        const elRectangle = item.getBoundingClientRect();
        console.log(elRectangle.top);
        console.log(elRectangle.right);
        console.log(elRectangle.bottom);
        console.log(elRectangle.left);
        console.log(elRectangle.height);
        console.log(elRectangle.width);
        console.log(item.textContent.length);
        console.log(maxWidth);
    });
    const menuItems = document.querySelectorAll(".menu-item");
    console.log(menuItems[0]);
    menuItems.forEach((item, index) => {
        const itemText = item.textContent;
        const itemFont = getComputedStyle(item).fontFamily;
        if(getTextWidth(itemText, itemFont) > maxWidth) {
            maxWidth = getTextWidth(itemText, itemFont);
        }
        console.log(item.textContent);
        const elRectangle = item.getBoundingClientRect();
        console.log(elRectangle.top);
        console.log(elRectangle.right);
        console.log(elRectangle.bottom);
        console.log(elRectangle.left);
        console.log(elRectangle.height);
        console.log(elRectangle.width);
        console.log(item.textContent.length);
        console.log(maxWidth);
    });
    console.log(maxWidth);
    const varName = "--menuItemsMaxWidth"; 
    setCSSvariable(varName,`${maxWidth.toFixed(0)}px`);
    const x = getCSSvariable(varName);
    console.log(getCSSvariable(varName));
}
getRequiredMenuWidth();

const el = document.getElementById("mobile-device-footer-menu");
console.log(el);
showDimensions(el);

export function saveToDB() {
    alert("Saving to the database...");
}

export function showAddress(event) {
    event.preventDefault();
    console.log("Address function executed!",event);
    // Implement the logic to show address
    document.getElementById("googlePlacesAPIautocomplete").focus();
}

export function showNotes(event) {
    event.preventDefault();
    console.log("Notes function executed!",event);
    // Implement the logic to show notes
    document.getElementById("notesTextArea").focus();
}