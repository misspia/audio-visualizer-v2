const flux = require('pico-flux');

let State = {
	files: []
};

const Store = flux.createStore({
	ADD_FILE: (files) => {
		for(let key in files) { 
			if(typeof files[key] === 'object') { 
				State.files.push( { name: files[key].name, url: URL.createObjectURL(files[key])} )
			}	
		};
	}
});

Store.getFiles = () => { return State.files; };

module.exports = Store;