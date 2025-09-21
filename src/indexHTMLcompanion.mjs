        console.log('Secure script running');
        // section focus and switch START
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
                const address = localStorage.getItem("tas_address")? localStorage.getItem("tas_address") : "";
                document.getElementById("googlePlacesAPIautocomplete_0").value = address;
                console.log(address);
        // section focus and switch END
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
