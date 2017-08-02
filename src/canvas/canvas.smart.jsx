import Store from '../store.js';
import Visualizer from './canvas.jsx';

module.exports = Store.createSmartComponent(Visualizer,
	(props) => { return {
        analyser: Store.getAnalyser(),
    }; }
);
