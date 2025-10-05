(function () {
    // Browser detection
        function isSafari() {
            const ua = navigator.userAgent;
            return ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Edg");
        }

        function isEdge() {
            return navigator.userAgent.includes("Edg");
        }

        function isiOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) || (
                navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
            );
        }

    // Layout adjustment
        function updateFooterLayout() {
            const footer = document.getElementById("the-footer-element");
            const body = document.getElementById("the-body-element");
            const buffer = document.getElementById("scroll-buffer");
            buffer.style.height= "0px";
            if (!footer) return;
            const footerHeight = footer.getBoundingClientRect().height;
            if (body) {
                body.style.paddingBottom = `${footerHeight}px`;
            }
            if (buffer && isiOS() && isSafari()) {
                buffer.style.height = "1px"; // Reliable scroll fix for Safari iOS
            }
            // Optional: log Safari UI height for diagnostics
                if (isiOS() && isSafari() && window.visualViewport) {
                    const layoutHeight = window.innerHeight;
                    const visualHeight = window.visualViewport.height;
                    const safariUIHeight = Math.max(layoutHeight - visualHeight, 0);
                    console.log("Safari UI height:", safariUIHeight.toFixed(2));
                    // alert(`Safari UI height:- ${safariUIHeight.toFixed(2)}`);
                }
        }

    // Debounce
        let timer;
        function scheduleUpdate() {
            clearTimeout(timer);
            timer = setTimeout(updateFooterLayout, 50);
        }

    // Event listeners
        window.addEventListener("load", updateFooterLayout);
        window.addEventListener("resize", scheduleUpdate);
        window.addEventListener("scroll", scheduleUpdate);

    if (window.visualViewport) {
        console.log(`visualViewport.height: ${window.visualViewport.height}`);
        // alert(`visualViewport.height: ${window.visualViewport.height}`);
        window.visualViewport.addEventListener("resize", scheduleUpdate);
        window.visualViewport.addEventListener("scroll", scheduleUpdate);
    }

    // Expose for manual triggering if needed
        window.footerLayoutManager = {
            update: updateFooterLayout,
            isSafari,
            isEdge,
            isiOS
        };
})();

// E X C E L L E N T   T O O L S   S T A R T
// // // calculate padding-bottom for body element START
//     function isIOS() {
//         // This works for:
//         // • 	iPhone
//         // • 	iPad (pre-iPadOS 13)
//         // • 	iPod Touch
//         return (
//             /iPad|iPhone|iPod/.test(navigator.userAgent) &&
//             !window.MSStream
//         );
//     }
//     function isModerniPad() {
//         // Apple changed the user agent for iPads running iPadOS 13 and later — they now report as MacIntel. To catch those:
//         return (
//             navigator.platform === 'MacIntel' &&
//             navigator.maxTouchPoints > 1
//         );
//     }
//     function isiOSDevice() {
//         return isIOS() || isModerniPad();
//     }
//     if (isiOSDevice()) {
//         console.log('Running on iOS');
//         alert('Running on iOS');
//         // Apply Safari-specific layout fixes or touch behavior
//     }
//     function isSafari() {
//         // This works for:
//         // - Safari on iPhone, iPad, and macOS
//         // - Avoids false positives from Chrome and Edge (which also include "Safari")
//         const ua = navigator.userAgent;
//         return ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Edg");
//     }
//     function isEdge() {
//         // Edge includes "Edg" (note: not "Edge" anymore) in its user agent:
//         // This works for:
//         // - Edge on Windows, macOS, iOS, and Android
//         // - Distinguishes Edge from Chrome and Safari
//         return navigator.userAgent.includes("Edg");
//     }
//     if (isSafari()) {
//         console.log("You're using Safari");
//         // Apply Safari-specific layout fixes
//     } else if (isEdge()) {
//         console.log("You're using Edge");
//         // Apply Edge-specific behavior
//     }
//     function isSafariOniOS() {
//         // If you want to be extra precise for Safari on iPhone/iPad:
//         return (
//             /iPad|iPhone|iPod/.test(navigator.userAgent) &&
//             isSafari()
//         );
//     }
//     function adjustPadding() {
//         const f = document.getElementById("the-footer-element");
//         const b = document.getElementById("the-body-element");
//         const innerHeight = window.innerHeight;
//         // const visualHeight = window.visualViewport.height;
//         const outerHeight = window.outerHeight;
//         const bufferHeight = Math.max(outerHeight - innerHeight, 0);
//         if (f && b) {
//             const fRect = f.getBoundingClientRect();
//             // b.style.paddingBottom = `${fRect.height + bufferHeight}px`;
//             b.style.paddingBottom = `${bufferHeight - fRect.height}px`;
//             console.log(outerHeight, innerHeight, bufferHeight, fRect.height);
//         }
//     }
//     window.addEventListener('load', adjustPadding);
//     window.addEventListener('resize', adjustPadding);
//     window.addEventListener('scroll', adjustPadding); // Safari quirk fix
//     window.visualViewport.addEventListener('resize', adjustPadding);
//     window.visualViewport.addEventListener('scroll', adjustPadding);
// // // calculate padding-bottom for body element END
// E X C E L L E N T   T O O L S   E N D

// // calculate padding-bottom for body element START
//     function updateLayout() {
//         const footer = document.getElementById("the-footer-element");
//         const body = document.getElementById("the-body-element");
//         const buffer = document.getElementById("scroll-buffer");
//
//         if (!footer) return;
//
//         const footerHeight = footer.getBoundingClientRect().height;
//
//         if (body) {
//             body.style.paddingBottom = `${footerHeight}px`;
//         }
//
//         if (buffer) {
//             buffer.style.height = `${footerHeight}px`;
//         }
//     }
//
//     // Optional: estimate Safari UI height if needed
//     function getSafariUIHeight() {
//         if (window.visualViewport) {
//             const layoutHeight = window.innerHeight;
//             const visualHeight = window.visualViewport.height;
//             return Math.max(layoutHeight - visualHeight, 0);
//         }
//         return 0;
//     }
//
//     // Debounce to avoid layout thrashing
//     let layoutTimer;
//     function scheduleLayoutUpdate() {
//         clearTimeout(layoutTimer);
//         layoutTimer = setTimeout(updateLayout, 50);
//     }
//
//     // Initial and reactive updates
//         window.addEventListener('load', updateLayout);
//         window.addEventListener('resize', scheduleLayoutUpdate);
//         window.addEventListener('scroll', scheduleLayoutUpdate);
//
//     if (window.visualViewport) {
//         window.visualViewport.addEventListener('resize', scheduleLayoutUpdate);
//         window.visualViewport.addEventListener('scroll', scheduleLayoutUpdate);
//     }
// // calculate padding-bottom for body element START

// 🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅
// Menu section focus and switch START 🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅
    function focusInput(sectionId) {
        const input = document.querySelector(`#section${sectionId}-focus-on-activation`);
        input?.focus();
    }
    function switchSection(index) {
        console.log(current,index);
        if (index === current) return;
        const currentSection = document.getElementById(`section${current}`);
        console.log(currentSection);
        const nextSection = document.getElementById(`section${index}`);
        currentSection.classList.remove('active');
        setTimeout(() => {
            nextSection.classList.add('active');
            console.log(nextSection);
            current = index;
            focusInput(index);
            localStorage.setItem("tas_sectionNumber",index);
        }, 250); // Matches the CSS transition duration of 0.25s
    }
    document.getElementById("footer-controls-container").addEventListener("click",(ev) => {
        const sectionNumber = ev.target.getAttribute("data-section-number");
        switchSection(sectionNumber);
    });
    // set current section = last active section START
        let current = localStorage.getItem("tas_sectionNumber")? localStorage.getItem("tas_sectionNumber") : 0; // start-up at last active section
        const el = document.getElementById(`section${current}`);
        el.classList.add("active");
        switchSection(current); // ensure last active section is viewable
        focusInput(current); // set focus to active section
    // set current section = last active section END
    // set last session values START
        const address = localStorage.getItem("tas_address_0")? localStorage.getItem("tas_address_0") : "";
        document.getElementById("googlePlacesAPIautocomplete_0").value = address;
        console.log(address);
// Menu section focus and switch END   🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅
// 🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅🍇🍈🍉🍊🍌🍍🍑🍒🍓🥝🍅
        // // re-load START
        //     // // if (!window.location.search.includes("reload=true")) {
        //     // //     window.location.href = window.location.pathname + "?reload=true";
        //     // // }
        //     // if (!window.location.search.includes("reload=true")) {
        //     //     const separator = window.location.search ? '&' : '?';
        //     //     const newUrl = window.location.pathname + window.location.search + separator + "reload=true";
        //     //     window.location.replace(newUrl); // prevents back button loop
        //     //     console.log("11111111111111111111111111111 Page reloaded with ?reload=true");
        //     // }
        //     // // Page loads normally
        //     // // Browser sees reload=true is missing
        //     // // Redirects to the same page with ?reload=true
        //     // // IMPORTANT BIT... Server sees it and clears the session
        //     // // // Only run if the page was loaded with ?reload=true START
        //     // //     // Clears "reload=true" from the URL
        //     // //     setTimeout(() => {                    
        //     // //         if (window.location.search.includes('reload=true')) {
        //     // //             // Replace the current URL with the same path but without the query string
        //     // //             const newUrl = window.location.pathname;
        //     // //             window.history.replaceState({}, '', newUrl);
        //     // //             console.log("22222222222222222222222222 Page reloaded and URL cleaned up");
        //     // //         }
        //     // //     }, 2000);
        //     // // // Only run if the page was loaded with ?reload=true END
        //     // Only clear session once
        //     const cleared = sessionStorage.getItem('sessionCleared');            
        //     if (!cleared) {
        //         console.log('✅ Session reset commenced');
        //         fetch('/session-reset?reload=true', {
        //             method: 'GET',
        //             // credentials: 'same-origin' // Send credentials only if the request URL is on the same origin (same scheme, host, and port) as the calling script.
        //             credentials: 'include'// Always send credentials, even for cross-origin requests (if CORS allows it).
        //         })
        //         .then(res => res.json())
        //         .then(data => {
        //             if (data.success) {
        //                 console.log('✅ Session reset successful');
        //                 sessionStorage.setItem('sessionCleared', 'true');
        //                 // optionally redirect or update UI
        //             } else {
        //                 console.warn('⚠️ Session reset failed:', data.message);
        //             }
        //         })
        //         .catch(err => {
        //             console.error('🚨 Session reset request failed:', err);
        //         });
        //     }
        // // re-load END

// ⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕
// progress-circle-svg START   ⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕
    export function showProgressCircle(stepsTotal=0,stepsCompleted=0){
        document.getElementById("progress-circle-svg").display = "block";
        // // Total number of records (simulated)
        //     const stepsTotal = 100;
        //     let stepsDone = 0;
        // Get DOM elements
            const circle = document.getElementById('progress');
            const label = document.getElementById('progress-value');
        // Circle circumference = 2 * π * r
            const radius = 90;
            const circumference = 2 * Math.PI * radius;
            circle.style.strokeDasharray = circumference;
        // Function to set progress (0 to 100)
            function setProgress(percent) {
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = offset;
                label.textContent = `${Math.round(percent)}%`;
            }
        // Simulated processing function
            function startProcessing() {
                stepsDone = 0;
                const interval = setInterval(() => {
                    if (stepsDone < stepsTotal) {
                        stepsDone++;
                        const percent = (stepsDone / stepsTotal) * 100;
                        setProgress(percent);
                    } else {
                        clearInterval(interval);
                    }
                }, 50); // simulate record processing delay
            }
        // You can also call setProgress(percent) externally
        // for example: setProgress(75); to manually update to 75%
    }
// progress-circle-svg END   ⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕
// ⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕