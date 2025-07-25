  const video = document.getElementById('camera-stream');
  const zoomInput = document.getElementById('zoom');
  const canvas = document.getElementById('canvas');
  const canvasII = document.getElementById('canvasII');
  const ctx = canvas.getContext('2d');
  const ctxII = canvasII.getContext('2d');
  const container = document.getElementById('video-container');
  const canvasContainer = document.getElementById('canvas-container');
  const canvasContainerII = document.getElementById('canvas-container-II');

  let zoom = 1;
  let minZoom = 1;
  let offsetX = 0, offsetY = 0;
  let lastTouches = [];
  let isDragging = false;
  let lastMouseX = 0, lastMouseY = 0;

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        }
      });
      video.srcObject = stream;

      video.addEventListener("loadedmetadata", () => {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        const cw = container.clientWidth;
        const ch = container.clientHeight;

        minZoom = Math.min(cw / vw, ch / vh);
        zoom = minZoom;

        zoomInput.min = minZoom.toFixed(2);
        zoomInput.max = 4;
        zoomInput.value = zoom.toFixed(2);

        offsetX = 0;
        offsetY = 0;

        updateVideoStyle();
      });
    } catch (err) {
      alert("Camera error: " + err.message);
    }
  }

  function updateVideoStyle() {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    video.style.width = `${vw * zoom}px`;
    video.style.height = `${vh * zoom}px`;
    video.style.left = `${-offsetX * zoom}px`;
    video.style.top = `${-offsetY * zoom}px`;
  }

  function clampOffsets() {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const cropWidth = cw / zoom;
    const cropHeight = ch / zoom;

    offsetX = Math.max(0, Math.min(offsetX, vw - cropWidth));
    offsetY = Math.max(0, Math.min(offsetY, vh - cropHeight));
  }

  zoomInput.addEventListener('input', () => {
    zoom = Math.max(parseFloat(zoomInput.value), minZoom);
    clampOffsets();
    updateVideoStyle();
  });

  document.getElementById('capture-still').addEventListener('click', () => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const cropWidth = cw / zoom;
    const cropHeight = ch / zoom;

    canvas.width = cw;
    canvas.height = ch;

    canvasII.width = cw;
    canvasII.height = ch;

    ctx.drawImage(
      video,
      offsetX, offsetY,
      cropWidth, cropHeight,
      0, 0,
      cw, ch
    );

    ctxII.drawImage(
      video,
      offsetX, offsetY,
      cropWidth, cropHeight,
      0, 0,
      cw, ch
    );

    canvasContainer.style.display = 'flex';
    canvasContainer.scrollIntoView({ behavior: 'smooth' });

    canvasContainerII.style.display = 'flex';
    canvasContainerII.scrollIntoView({ behavior: 'smooth' });
  });

  container.addEventListener("touchstart", e => {
    lastTouches = [...e.touches];
  }, { passive: false });

  container.addEventListener("touchmove", e => {
    if (e.touches.length === 1 && lastTouches.length === 1) {
      const dx = e.touches[0].clientX - lastTouches[0].clientX;
      const dy = e.touches[0].clientY - lastTouches[0].clientY;
      offsetX -= dx / zoom;
      offsetY -= dy / zoom;
      clampOffsets();
    } else if (e.touches.length === 2 && lastTouches.length === 2) {
      const d = getDistance(e.touches[0], e.touches[1]);
      const ld = getDistance(lastTouches[0], lastTouches[1]);
      if (ld !== 0) {
        const factor = d / ld;
        const newZoom = Math.max(minZoom, Math.min(4, zoom * factor));
        const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const rect = container.getBoundingClientRect();
        const relX = mx - rect.left;
        const relY = my - rect.top;
        const videoX = offsetX + relX / zoom;
        const videoY = offsetY + relY / zoom;

        zoom = newZoom;
        zoomInput.value = zoom.toFixed(2);
        offsetX = videoX - relX / zoom;
        offsetY = videoY - relY / zoom;
        clampOffsets();
      }
    }
    lastTouches = [...e.touches];
    updateVideoStyle();
    e.preventDefault();
  }, { passive: false });

  container.addEventListener("touchend", e => {
    lastTouches = [...e.touches];
  });

  function getDistance(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  }

  container.addEventListener('mousedown', e => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  container.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    offsetX -= dx / zoom;
    offsetY -= dy / zoom;
    clampOffsets();
    updateVideoStyle();
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  container.addEventListener('mouseup', () => { isDragging = false; });
  container.addEventListener('mouseleave', () => { isDragging = false; });

  window.addEventListener('resize', () => {
    if (video.videoWidth) {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      minZoom = Math.min(container.clientWidth / vw, container.clientHeight / vh);
      zoom = Math.max(zoom, minZoom);
      zoomInput.min = minZoom.toFixed(2);
      zoomInput.value = zoom.toFixed(2);
      clampOffsets();
      updateVideoStyle();
    }
  });

  document.getElementById('save-png').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `capture_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  startCamera();

  function stopCamera() {
    // - getTracks() returns all media tracks (like audio and video).
    // - Calling .stop() on each track halts the hardware capture (i.e. stops the webcam).
    // - stream = null helps you clear the reference.
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
      console.log("Camera stopped.");
    }
  }
  // stopCamera();
