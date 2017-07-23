import Store from '../../store.js';
import Controls from './controls.jsx';

module.exports = Store.createSmartComponent(Controls,
	(props) => { return {
        analyser: Store.getAnalyser().analyzer,
        frequencyData: Store.getAnalyser().frequencyData,
        canvas: Store.getCanvas().canvas,
        ctx: Store.getCanvas().ctx,
        
    }; }
);
