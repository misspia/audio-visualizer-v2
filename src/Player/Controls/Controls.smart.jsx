import Store from '../../store.js';
import Controls from './Controls.jsx';

module.exports = Store.createSmartComponent(Controls, 
	(props) => { return {
		track: Store.getPlaylist().current,
		shuffle: Store.getPlaylist().shuffle
		}
	}
);
