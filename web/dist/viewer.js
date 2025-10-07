class EdgeDetectionViewer {
    constructor() {
        this.modes = ['Canny Edge', 'Sobel', 'Grayscale', 'Raw'];
        this.currentMode = 0;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stats = {
            fps: 15,
            resolution: '640×480',
            processingTime: 33,
            mode: this.modes[0]
        };
        this.initialize();
    }
    initialize() {
        this.drawPlaceholder();
        this.startFPSCounter();
    }
    drawPlaceholder() {
        const { width, height } = this.canvas;
        // Black background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, width, height);
        // Draw simulated edge detection pattern
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 1;
        // Random edges
        for (let i = 0; i < 100; i++) {
            this.ctx.beginPath();
            const x1 = Math.random() * width;
            const y1 = Math.random() * height;
            const x2 = x1 + (Math.random() - 0.5) * 100;
            const y2 = y1 + (Math.random() - 0.5) * 100;
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
        // Add text
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '20px monospace';
        this.ctx.fillText('EDGE DETECTION DEMO', 20, 40);
        this.ctx.font = '14px monospace';
        this.ctx.fillText('Simulated output - Ready for Android integration', 20, 70);
    }
    simulate() {
        // Simulate processing a new frame
        this.stats.processingTime = Math.floor(Math.random() * 20 + 25);
        this.stats.fps = Math.floor(1000 / this.stats.processingTime);
        this.updateStats();
        this.drawRandomEdges();
    }
    drawRandomEdges() {
        const { width, height } = this.canvas;
        // Fade previous frame
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(0, 0, width, height);
        // Draw new edges
        this.ctx.strokeStyle = `hsl(${Math.random() * 60 + 100}, 100%, 50%)`;
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 30; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * width, Math.random() * height);
            this.ctx.lineTo(Math.random() * width, Math.random() * height);
            this.ctx.stroke();
        }
    }
    toggleMode() {
        this.currentMode = (this.currentMode + 1) % this.modes.length;
        this.stats.mode = this.modes[this.currentMode];
        this.updateStats();
        // Change visualization based on mode
        switch (this.currentMode) {
            case 0: // Canny
                this.ctx.strokeStyle = '#00ff00';
                break;
            case 1: // Sobel
                this.ctx.strokeStyle = '#00ffff';
                break;
            case 2: // Grayscale
                this.ctx.strokeStyle = '#ffffff';
                break;
            case 3: // Raw
                this.ctx.strokeStyle = '#ff00ff';
                break;
        }
    }
    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    updateStats() {
        document.getElementById('fps').textContent = this.stats.fps.toString();
        document.getElementById('procTime').textContent = `${this.stats.processingTime}ms`;
        document.getElementById('mode').textContent = this.stats.mode;
    }
    startFPSCounter() {
        setInterval(() => {
            this.stats.fps = Math.floor(Math.random() * 5 + 13);
            this.stats.processingTime = Math.floor(1000 / this.stats.fps);
            this.updateStats();
        }, 2000);
    }
    // Method to receive base64 encoded frames from Android
    displayFrame(base64Data) {
        const img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
        img.src = `data:image/png;base64,${base64Data}`;
    }
    // Method to receive raw pixel data
    displayPixelData(pixelData, width, height) {
        const imageData = this.ctx.createImageData(width, height);
        imageData.data.set(pixelData);
        this.ctx.putImageData(imageData, 0, 0);
    }
}
// Initialize viewer
const viewer = new EdgeDetectionViewer();
// Make it globally accessible for buttons
window.viewer = viewer;
// Export for module usage
export { EdgeDetectionViewer };
