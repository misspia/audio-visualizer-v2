import Store from '../store.js';
import Playlist from './Playlist.jsx';

module.exports = Store.createSmartComponent(Playlist, 
	(props) => { return {files: Store.getFiles(), playlist: Store.getPlaylistSettings()} }
);
