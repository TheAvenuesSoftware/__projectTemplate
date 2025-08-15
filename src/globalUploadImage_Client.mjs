import { showCustomMessage } from "./globalUIpopups_Client.mjs";

	// Select image to upload START
		export async function selectImageToUpload(){
			console.log("selectImageToUpload() called");
			const input = document.getElementById('imageInput');
			input.value = ""; // Clear previous selection
			input.addEventListener('change', handleFileSelect,{once: true});
			input.click(); // Trigger file selection dialog
		}
		async function handleFileSelect(event) {
			console.log("selectImageToUpload() called & file selected");
			const file = event.target.files[0];
			const fileNameSpan = document.getElementById('fileName');
			if (!file) {
				console.log("No file selected.");
				fileNameSpan.textContent = "No file chosen";
				return;
			}
			console.log("Selected file:", file);
			fileNameSpan.textContent = file.name;
		}
	// Select image to upload END

	// upload image to canvas START
		const canvasContainer = document.getElementById('canvas-container');
		const canvasContainerII = document.getElementById('canvas-container-II');
		const ctx = canvas.getContext('2d');
		const ctxII = canvasII.getContext('2d'); // in section-save
		export function uploadImageToCanvas(){
			console.log("uploadImageToCanvas() called");
			const input = document.getElementById('imageInput');
			const file = input.files[0];
			if (!file) {
				showCustomMessage("Please select an image.");
				return;
			}
			// Create a blob URL and load the image
			const blobUrl = URL.createObjectURL(file);
			const img = new Image();
			img.onload = function() {
				// Resize canvas to window
						resizeCanvasToWindow(); // optional, or just once at page load
					// // Resize canvas to match image
					// 	canvas.width = img.width;
					// 	canvas.height = img.height;
				// Draw image on canvas
					ctx.drawImage(img, 0, 0);
						drawImageScaled(img, ctx); // in section-save
					ctxII.drawImage(img, 0, 0); // in section-save
						drawImageScaled(img, ctxII); // in section-save
				// Revoke blob URL (cleanup)
					URL.revokeObjectURL(blobUrl);
			};
			img.src = blobUrl;
		}
	// upload image to canvas END

	function resizeCanvasToWindow() {
    	canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
		const container = document.getElementById('video-container'); // contains video element plus zoom control input element
		const rect = container.getBoundingClientRect();
		const containerX0 = rect.left;
		const containerX1 = rect.right;
		const containerY0 = rect.bottom;
		const containerY1 = rect.top;
		canvas.width = containerX1 - containerX0;
		// canvas.height = containerY0 - containerY1;
	}
	function drawImageScaled(img, ctx) {
		const canvas = ctx.canvas;
		const hRatio = canvas.width  / img.width;
		const vRatio = canvas.height / img.height;
		const ratio  = Math.min(hRatio, vRatio);
		const centerShift_x = (canvas.width - img.width * ratio) / 2;
		const centerShift_y = (canvas.height - img.height * ratio) / 2;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, img.width, img.height,
						centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
	}


// add this to index.html START
    // <script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
// add this to index.html END

// // HTML metadata reader: START
// <!DOCTYPE html>
// <html>
// <head>
//   <title>EXIF Viewer</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
// </head>
// <body>
//   <h2>Select Image to View EXIF Metadata</h2>
//   <input type="file" id="imageInput" accept="image/*" />
//   <pre id="exifOutput">Waiting for image...</pre>
// 
//   <script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
//   <script>
//     const input = document.getElementById("imageInput");
//     const output = document.getElementById("exifOutput");
// 
//     input.addEventListener("change", function () {
//       const file = this.files[0];
//       if (!file) return;
// 
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const arrayBuffer = e.target.result;
// 
//         const view = new DataView(arrayBuffer);
//         try {
//           EXIF.getData({ buffer: arrayBuffer }, function () {
//             const allTags = EXIF.getAllTags(this);
//             output.textContent = JSON.stringify(allTags, null, 2);
//           });
//         } catch (err) {
//           output.textContent = "Error reading EXIF: " + err.message;
//         }
//       };
// 
//       reader.readAsArrayBuffer(file);
//     });
//   </script>
// </body>
// </html>
// // HTML metadata reader: END