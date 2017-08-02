import Store from '../../store.js';
import Playlist from './playlist.jsx';

module.exports = Store.createSmartComponent(Playlist, 
	(props) => { return {files: Store.getTracks(), playlist: Store.getPlaylist()} }
);
