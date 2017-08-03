import Store from '../../store.js';
import Graphs from './graphs.jsx';

module.exports = Store.createSmartComponent(Graphs,
	(props) => { return {
        analyser: Store.getAnalyser(),
        canvas: Store.getVisualizer().canvas,
        graph: Store.getVisualizer().graph,
        color: Store.getVisualizer().color,
    }; }
);
