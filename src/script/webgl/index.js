// Vendor
import gsap from 'gsap';
import { WebGLRenderer } from 'three';
import { GPUStatsPanel } from 'three/examples/jsm/utils/GPUStatsPanel.js';
import Stats from 'stats-js';
import bidello from 'webgl/vendor/bidello';

// Utils
import WindowResizeObserver from 'utils/WindowResizeObserver';

// Scenes
import scenes from 'webgl/scenes';

export default class WebGLApplication {
    constructor(options = {}) {
        // Props
        this._canvas = options.canvas;
        this._debugger = options.debugger;

        // Setup
        this._renderer = this._createRenderer();

        this._registerBidelloGlobals();

        this._stats = this._createStats();
        this._statsGpuPanel = this._createStatsGpuPanel();

        this._bindAll();
        this._setupEventListeners();

        WindowResizeObserver.triggerResize();
    }

    /**
     * Public
     */
    start() {
        this._scene = this._createScene();
    }

    destroy() {
        this._removeEventListeners();
        this._removeStats();
    }

    /**
     * Private
     */
    _createRenderer() {
        const renderer = new WebGLRenderer({
            canvas: this._canvas,
            powerPreference: 'high-performance',
            antialias: false,
            transparent: false,
        });
        return renderer;
    }

    _createScene() {
        const urlParams = new URLSearchParams(location.search);
        const sceneName = urlParams.get('scene');
        const scene = scenes[sceneName] ? new scenes[sceneName]() : new scenes.main();
        return scene;
    }

    /**
     * Stats
     */
    _createStats() {
        const stats = new Stats();
        document.body.appendChild(stats.dom);
        return stats;
    }

    _createStatsGpuPanel() {
        const panel = new GPUStatsPanel(this._renderer.getContext());
        this._stats.addPanel(panel);
        this._stats.showPanel(0);
        return panel;
    }

    _removeStats() {
        if (!this._stats) return;
        document.body.removeChild(this._stats.dom);
        this._stats = null;
    }

    _registerBidelloGlobals() {
        bidello.registerGlobal('root', this);
        bidello.registerGlobal('renderer', this._renderer);
        bidello.registerGlobal('debugger', this._debugger);
    }

    /**
     * Resize
     */
    _resize(dimensions) {
        this._resizeRenderer(dimensions);
        this._triggerBidelloResize(dimensions);
    }

    _resizeRenderer(dimensions) {
        this._renderer.setPixelRatio(dimensions.dpr);
        this._renderer.setSize(dimensions.innerWidth, dimensions.innerHeight, true);
    }

    _triggerBidelloResize(dimensions) {
        bidello.trigger({ name: 'windowResize', fireAtStart: true }, dimensions);
    }

    /**
     * On Tick
     */
    _tick({ time, deltaTime, frame }) {
        this._stats.begin();

        this._update({ time, deltaTime, frame });
        this._render({ time, deltaTime, frame });

        this._stats.end();
    }

    _update({ time, deltaTime, frame }) {
        this._triggerBidelloUpdate({ time, deltaTime, frame });
    }

    _triggerBidelloUpdate({ time, deltaTime, frame }) {
        bidello.trigger(
            { name: 'update', fireAtStart: false },
            { time, deltaTime, frame },
        );
    }

    _render() {
        this._statsGpuPanel.startQuery();

        if (this._scene) this._renderer.render(this._scene, this._scene.camera);

        this._statsGpuPanel.endQuery();
    }

    /**
     * Bind All
     */
    _bindAll() {
        this._tickHandler = this._tickHandler.bind(this);
        this._resizeHandler = this._resizeHandler.bind(this);
    }

    /**
     * Events
     */
    _setupEventListeners() {
        WindowResizeObserver.addEventListener('resize', this._resizeHandler);
        gsap.ticker.add(this._tickHandler);
    }

    _removeEventListeners() {
        WindowResizeObserver.removeEventListener('resize', this._resizeHandler);
        gsap.ticker.remove(this._tickHandler);
    }

    /**
     * Handlers
     */
    _tickHandler(time, deltaTime, frame) {
        this._tick({ time, deltaTime, frame });
    }

    _resizeHandler(dimensions) {
        this._resize(dimensions);
    }
}
