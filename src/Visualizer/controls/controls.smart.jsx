import Store from '../../store.js';
import Controls from './controls.jsx';

module.exports = Store.createSmartComponent(Controls,
	(props) => { return {
        analyser: Store.getAnalyser(),
        canvas: Store.getCanvas()        
    }; }
);
