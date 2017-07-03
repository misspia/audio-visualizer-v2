import Store from '../store.js';
import Visualizer from './Visualizer.jsx';

module.exports = Store.createSmartComponent(Visualizer, 
	(props) => { return { audioContext: Store.getAudioContext() }; }
);
