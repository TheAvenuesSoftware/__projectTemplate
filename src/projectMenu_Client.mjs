const consoleLog = true;

console.log("LOADED:- projectMenu_Client.mjs is loaded",new Date().toLocaleString());
export function projectMenuClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { setCSSvariable, getCSSvariable, getTextWidth, getDims } from "./global_Client_Dimensions.mjs";
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
            // menuButton.addEventListener("dblclick", showMenu); // 🖱️
            // menuButton.addEventListener("dblclick", toggleMenu); // 🖱️
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
                            // showMenu(); // Trigger menu display // ☝️
                            // toggleMenu(); // Trigger menu display // ☝️
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
        
        // document.getElementById("classic-menu-icon-container").addEventListener("click", (event) => {
        //     document.getElementById("menu-section").classList.toggle("in-view");
        //     document.getElementById("menu-section").classList.toggle("out-of-view");
        // });
            // document.getElementById("classic-menu-container").addEventListener("click", (event) => {
            document.getElementById("menu-section").addEventListener("click", (event) => {
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
            // document.getElementById("classic-menu-container").addEventListener("mouseleave", (event) => {
            document.getElementById("menu-section").addEventListener("mouseleave", (event) => {
                document.getElementById("menu-section").classList.toggle("in-view");
                document.getElementById("menu-section").classList.toggle("out-of-view");
            });
            // 
                // HOVER FOR TOUCHSCREENS start
                    let tappedOnce = false;
                    document.querySelectorAll(".tooltip").forEach(button => {
                        button.addEventListener("touchstart", (e) => {
                            if (!tappedOnce) {
                                tappedOnce = true;
                                // Show tooltip here (e.g., add a class)
                                e.preventDefault();
                                setTimeout(() => tappedOnce = false, 1000); // reset after 1s
                            } else {
                                // Proceed with actual click action
                                tappedOnce = false;
                            }
                        });
                    });
                // HOVER FOR TOUCHSCREENS end
            // 
        // classic menu END 🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒

        // footer menu START 🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶
            document.addEventListener("DOMContentLoaded",async () => {
                //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
                    if(consoleLog===true){console.log('projectClient DOMContentLoaded successsful.',Date.now());}

                    window.addEventListener("load",async () => {
                    // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
                        if(consoleLog===true){console.log('projectClient window load successsful.',Date.now());}

                        function displayUiPage(displaySection){
                            const uiPages = document.querySelectorAll(".ui-page");
                            // console.log(uiPages);
                            uiPages.forEach((pageItem, index) => {
                                let removeClass = false;
                                const itemClassList = document.getElementById(pageItem.id).classList;
                                // console.log(itemClassList)
                                itemClassList.forEach((classItem, index) => {
                                    if(classItem==="ui-page-in-view"){
                                        // console.log(itemClassList);
                                        if(pageItem.id===displaySection.id){
                                        }else{
                                            removeClass = true;
                                        }
                                    }
                                });
                                if(removeClass===true){
                                    document.getElementById(pageItem.id).classList.remove("ui-page-in-view");
                                }
                            });
                            uiPages.forEach((item, index) => {
                                // console.log(item.id,displaySection.id);
                                // console.log(item.id,document.getElementById(item.id).classList);
                                if(item.id===displaySection.id){
                                    document.getElementById(item.id).classList.toggle("ui-page-in-view");
                                }
                            });
                        }

                        document.getElementById("footer-menu-menu").addEventListener("click",(ev) => {
                            console.log(ev.target.id);
                            displayUiPage(document.getElementById("menu-section"));
                        });
                        document.getElementById("footer-camera").addEventListener("click",(ev) => {
                            console.log(ev.target.id);
                            displayUiPage(document.getElementById("camera-section"));
                        });
                        document.getElementById("footer-address").addEventListener("click",(ev) => {
                            console.log(ev.target.id);
                            displayUiPage(document.getElementById("address-section"));
                        });
                        document.getElementById("footer-notes").addEventListener("click",(ev) => {
                            console.log(ev.target.id);
                            displayUiPage(document.getElementById("notes-section"));
                        });
                        document.getElementById("footer-save").addEventListener("click",(ev) => {
                            console.log(ev.target.id);
                            displayUiPage(document.getElementById("save-section"));
                        });
                        document.getElementById("footer-search").addEventListener("click",(ev) => {
                            console.log(ev.target.id);
                            displayUiPage(document.getElementById("search-section"));
                        });

                    });
            });
            // footer menu END 🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶🦶

export function setRequiredMenuWidth(){
    // const menuContainer = document.getElementById("classic-menu-container")
    const menuContainer = document.getElementById("menu-section")
    const headerItems = document.querySelectorAll(".header-item");
    let itemMargin = 16 + 16; // px
    let itemLeftMarginOffset = 16; // px
    let itemPadding = 0; // px
    let itemBuffer = 16; // px, an extra buffer width
    let maxWidth = 0;
    headerItems.forEach((item, index) => {
        const itemText = item.textContent;
        // const itemFont = getComputedStyle(item).fontFamily;
            const style = getComputedStyle(item);
            const itemFont = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        let itemWidth = getTextWidth(itemText, itemFont);
        itemWidth = itemWidth + itemMargin + itemLeftMarginOffset + itemPadding + itemBuffer;
        console.log(itemWidth,maxWidth);
        if((itemWidth * 1) > (maxWidth * 1)) {
            maxWidth = itemWidth;
        }
        // console.log(item.textContent);
        const elRectangle = item.getBoundingClientRect();
        // console.log(maxWidth);
    });
    const menuItems = document.querySelectorAll(".menu-item");
    itemMargin = 40; // px
    itemLeftMarginOffset = 16; // px
    itemPadding = 5 + 5; // px
    itemBuffer = 16; // px, an extra buffer width
    console.log(menuItems[0]);
    menuItems.forEach((item, index) => {
        const itemText = item.textContent;
        // const itemFont = getComputedStyle(item).fontFamily;
            const style = getComputedStyle(item);
            const itemFont = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        let itemWidth = getTextWidth(itemText, itemFont);
        itemWidth = itemWidth + itemMargin + itemLeftMarginOffset  + itemPadding + itemBuffer;
        console.log(itemWidth,maxWidth);
        if((itemWidth * 1) > (maxWidth * 1)) {
            maxWidth = itemWidth;
        }
        // console.log(item.textContent);
        const elRectangle = item.getBoundingClientRect();
        // console.log(maxWidth);
    });
    console.log(maxWidth);
    const varName = "--menuItemsMaxWidth"; 
    maxWidth += 15;
    setCSSvariable(varName,`${maxWidth.toFixed(0)}px`);
    const x = getCSSvariable(varName);
    console.log(`${varName} = ${x}`);
    menuContainer.style.width = x;
}
setRequiredMenuWidth();
export function setRequiredMenuHeight(){
    const requiredMenuHeight = window.innerHeight;
    console.log(requiredMenuHeight);
    document.getElementById("classic-menu-container").style.maxHeight = requiredMenuHeight + "px";
}
const el = document.getElementById("mobile-device-footer-menu");
console.log(el);
const dims = getDims(el);
console.log(dims);

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