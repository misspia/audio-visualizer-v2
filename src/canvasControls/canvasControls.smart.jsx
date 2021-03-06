import Store from '../store.js';
import Controls from './canvasControls.jsx';

module.exports = Store.createSmartComponent(Controls,
	(props) => { return {
        analyser: Store.getAnalyser(),
        canvas: Store.getVisualizer().canvas,
        graph: Store.getVisualizer().graph,
        color: Store.getVisualizer().color,
    }; }
);
