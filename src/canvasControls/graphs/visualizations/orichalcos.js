import Utils from '../graphs.utils.js';

const GL = (gl) => {
	gl.clearColor(1.0, 1.0, 1.0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	let vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, [
		`
			attribute vec2 position; 
			void main() {
				gl_Position = vec4(position, 0.0, 1.0);
			}
		`
	]);
	gl.compileShader(vertexShader);

	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, [
		`
			precision highp float;
			uniform vec4 color;
			void main() {
				gl_FragColor = color;
			}
		`
	]);
	gl.compileShader(fragmentShader);

	let program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	const vertices = new Float32Array([
		-0.1, 0.5, 0.1, 0.5, 0.1,-0.5, // Triangle 1
		-0.1, 0.5, 0.1,-0.5, -0.1,-0.5 // Triangle 2
	]);

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	gl.useProgram(program);
	program.color = gl.getUniformLocation(program, 'color');
	gl.uniform4fv(program.color, [0.8, 0.5, 0.2, 0.6]);
	program.position = gl.getAttribLocation(program, 'position');
	gl.enableVertexAttribArray(program.position);
	gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
};

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;
	
	GL(ctx);
}


module.exports = animate;



























