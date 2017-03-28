const fs = require('fs');

const Convert = require('html2imavertor');

// HTML 2 IMAGE
const html2image = Convert.html2image;

const html = '<div><h2>Hello</h2></div>'

html2image(html)
	.pipe(fs.createWriteStream('image-out.png'));

const url = 'http://google.com';

html2image.generate(url)
	.pipe(fs.createWriteStream('image-out.png'));

// HTML 2 IMAGE
const html2pdf = Convert.html2pdf;

const html = '<div><h2>Hello</h2></div>'

html2pdf(html)
	.pipe(fs.createWriteStream('image-out.png'));

const url = 'http://google.com';

html2pdf.generate(url)
	.pipe(fs.createWriteStream('image-out.png'));

// PDF 2 IMAGE
const html2pdf = Convert.html2pdf;

const file = './pdf-in.pdf';
const options = {
	c: 'rbg', // 'rbga', 'cmyk'
	r: 144,
	output: './image-out.jpg'
}

html2pdf(file, options, function () {
	// done();
})
