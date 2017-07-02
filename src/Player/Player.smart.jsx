import Store from '../store.js';
import Player from './Player.jsx';

module.exports = Store.createSmartComponent(Player,
	(props) => { return {files: Store.getTracks(), playlist: Store.getPlaylist()} }
);
