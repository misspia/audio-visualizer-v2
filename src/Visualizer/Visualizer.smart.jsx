import Store from '../store.js';
import Visualizer from './Visualizer.jsx';

module.exports = Store.createSmartComponent(Visualizer,
	(props) => { return {
        analyser: Store.getAnalyser(),
        frequencyData: Store.getAnalyser().frequencyData,
        canvas: Store.getCanvas().canvas,
        ctx: Store.getCanvas().ctx,
    }; }
);
