const flux = require('pico-flux');
const Store = require('../store.js');
const AudioUpload = require('./AudioUpload.jsx');

module.exports = Store.createSmartComponent(AudioUpload, 
	(props) => { return {files: Store.getFiles()} }
);