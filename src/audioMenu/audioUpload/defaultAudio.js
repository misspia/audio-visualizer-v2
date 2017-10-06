import Actions from '../../actions.js';

const DefaultAudio = (track) => {
	const xhr = new XMLHttpRequest();

	xhr.addEventListener('load', (blob) => {
		if (xhr.status === 200) {
			const theBlob = xhr.response;
			theBlob.lastModifiedDate = new Date();
			theBlob.name = track.name;
			const files = [theBlob];
			Actions.addFile(files)
		}
	});

	xhr.open('GET', `./assets/${track.file}`);
	xhr.responseType = 'blob';
	xhr.send(null);
};

export default DefaultAudio;