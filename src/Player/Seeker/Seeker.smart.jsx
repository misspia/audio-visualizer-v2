import Store from '../../store.js';
import Player from './Seeker.jsx';

module.exports = Store.createSmartComponent(Player,
	(props) => { return { 
		progress: Store.getPlaylist().current.progress,
		duration: Store.getPlaylist().current.duration
		} }
);
