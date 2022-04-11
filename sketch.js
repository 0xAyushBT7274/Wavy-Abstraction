/***********************************************************************
     
 Copyright (c) 2016-2022 Ayush Mishra, www.Ayushmishra.design
 *** Ayush Mishra Designs ***
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of MSA Visuals nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***********************************************************************/
let t = [];
let num = 30;
const COLS = createCols("https://coolors.co/14342b-60935d-bab700-bbdfc5-ff579f-ffffff-fe7f2d-ef6f6c-8b1e3f");
let bg;

function setup() {
	const s = min(windowWidth, windowHeight);
		createCanvas(s,s);
	const span = width / num;
	for (let i =  0; i < num + num / 3; i++) {
		t.push(new NoiseCurve((i - 5) * span, COLS[i % COLS.length]));
	}
	
	bg = createGraphics(width, height);
	bg.background(255,20);
  bg.noStroke();
  for (let i = 0; i < 300000; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise(x*0.01, y*0.01)*2;
    bg.fill(240, 20);
    bg.rect(x, y, s, s);
  } 
}

function draw() {
	image(bg,0,0);
	for (const i of t) {
		i.display();
	}
}


class NoiseCurve {
	constructor(x, col) {
		const segNum =7;
		this.seg = [];
		for (let i = 0; i < segNum + 4; i++) {
			this.seg[i] = createVector(x, (i - 2) / segNum * height);
		}
		this.col = col;
	}

	display() {
		const ns = 0.0015;
		const nSp = 0.003;
		const offMax = width / num * 20;
		noFill();
		stroke(0);
		strokeWeight(width / num / 1.5);
		beginShape();
		for (let i = 0; i < this.seg.length; i++) {
			const p = this.seg[i];
			let offX = (noise(p.x * ns - frameCount * nSp, p.y * ns   + frameCount * nSp, frameCount * nSp) - 0.5) * offMax;
			curveVertex(p.x + offX, p.y);
		}
		endShape();
	}

}


function createCols(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}