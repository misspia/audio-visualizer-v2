import Store from '../../store.js';
import Colors from './colors.jsx';

module.exports = Store.createSmartComponent(Colors,
	(props) => { return {
        color: Store.getVisualizer().color,
    }; }
);
