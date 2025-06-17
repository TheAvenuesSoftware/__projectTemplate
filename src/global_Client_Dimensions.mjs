// CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS
    // Get the root element
        var r = document.querySelector(':root');
    // Create a function for GETting a variable value START
        function myFunction_get() {
            // Get the styles (properties and values) for the root
                var rs = getComputedStyle(r);
            // Alert the value of the --blue variable
                alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
        }
    // Create a function for GETting a variable value END
    // Create a function for SETting a variable value START
        function setCSSvariables(){
            // Set the value of variable --blue to another value (in this case "lightblue")
                // r.style.setProperty('--blue', 'lightblue');
                r.style.setProperty('--screen_innerWidth_095', ( window.innerWidth * .95 ) + "px");
                r.style.setProperty('--screen_innerHeight_095', ( window.innerHeight * .95 ) + "px");
                r.style.setProperty('--screen_innerWidth_0975', ( window.innerWidth * .975 ) + "px");
                r.style.setProperty('--screen_innerHeight_0975', ( window.innerHeight * .975 ) + "px");
                r.style.setProperty('--screen_innerWidth_100', ( window.innerWidth * 1.0 ) + "px");
                r.style.setProperty('--screen_innerHeight_100', ( window.innerHeight * 1.0 ) + "px");
        }
        setCSSvariables();
    // Create a function for SETting a variable value END

export function setCSSvariable(varName, varValue){
    var r = document.querySelector(':root');
    // r.style.setProperty('--blue', 'lightblue');
    r.style.setProperty(varName, varValue);
}
export function getCSSvariable(varName){
    const r = document.querySelector(':root');
    const rs = getComputedStyle(r);
    const varValue = rs.getPropertyValue(varName);
    return varValue;
}
// CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS

export function getTextWidth(text, font = '16px monospace') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
}

// CHECK SCREEN SIZE start
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var iw = (iOS) ? screen.width : window.innerWidth;
    var ih = (iOS) ? screen.height : window.innerHeight; 
    // console.log (ih,iw);
// CHECK SCREEN SIZE end

export function getDims(el){
    console.log(el.innerWidth,el.innerHeight);
}

export function showDimensions(el="") {
    console.log(el);

    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;

    const bodyRect = document.body.getBoundingClientRect();

    const elRect = el.getBoundingClientRect();
    // const someElementRect = document.getElementById("someElement").getBoundingClientRect();

    console.log(`Window inner: ${winWidth}px × ${winHeight}px`);
    console.log(`Body: ${bodyRect.width}px × ${bodyRect.height}px`);
    console.log(`${el}: ${elRect.width}px × ${elRect.height}px`);
    // console.log(`Element Position: Top - ${someElementRect.top}px, Left - ${someElementRect.left}px`);
    // console.log(`Element Size: ${someElementRect.width}px × ${someElementRect.height}px`);
}

// window.onload = showDimensions;

export function isVisible(){
    // If you want to check whether an element is fully visible in the viewport:
    const elem = document.getElementById("someElement");
    const rect = elem.getBoundingClientRect();

    if (rect.bottom <= window.innerHeight && rect.top >= 0) {
        console.log("Element is fully visible!");
    } else {
        console.log("Element is partially or fully outside the viewport.");
    }
    // This helps in scroll-based animations or lazy loading. Let me know if you need refinements! 
}