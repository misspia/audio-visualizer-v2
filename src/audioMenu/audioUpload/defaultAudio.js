import Actions from '../../actions.js';

const DefaultAudio = () => {
	const xhr = new XMLHttpRequest();

	xhr.addEventListener('load', (blob) => {
		if (xhr.status === 200) {
			const theBlob = xhr.response;
			theBlob.lastModifiedDate = new Date();
			theBlob.name = "Warpaint";
			const files = [theBlob];
			Actions.addFile(files)
		}
	});

	xhr.open('GET', './assets/Warpaint.mp3');
	xhr.responseType = 'blob';
	xhr.send(null);
};

export default DefaultAudio;