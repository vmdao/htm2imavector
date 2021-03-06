var wkhtmltoimage = require('../libs/wkhtmltoimage');
var wkhtmltopdf = require('../libs/wkhtmltopdf');
var mupdf = require('../libs/mupdf');

const fs = require('fs');
const html = `<html><head><link href=\"https://test0990.s3.amazonaws.com/font/Anglee.css\" rel=\"stylesheet\"></head><body><div class=\"previewer\" style=\" display: inline-block;\"><div class=\"element group-element\" style=\"position: absolute; top: 88.0003px; left: 148.484px; width: 334.031px; height: 93.9994px;\"><div class=\"element shape\" style=\"position: absolute; top: 0px; left: 0px; width: 94px; height: 93.9994px;\"><!--?xml version=\"1.0\" encoding=\"utf-8\"?--><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --><svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"94.00000000000001\" height=\"93.99937333751109\" viewBox=\"0 0 150.001 150\" enable-background=\"new 0 0 150.001 150\" xml:space=\"preserve\"><g class=\"color1\"><path d=\"M77.482,124.683c0,0,36.144-47.549,26.786-93.271C94.913-14.307,58.77-2.337,57.145,18.523C55.523,39.385,92.619,78.748,77.482,124.683z\" class=\"color1\"></path><path d=\"M72.845,128.929c0,0,7.041-42.499-10.225-67.976c-19.854-29.297-42.615-1.21-34.382,13.317C35.042,86.276,73.65,102.817,72.845,128.929z\" class=\"color1\"></path><path d=\"M38.269,97.855c0,0-12.198,15.966-7.143,39.301c0.572,2.639,2.143,8.992-0.104,12.844c3.85-4.281,12.513,0.626,24.073-6.217c6.703-3.966,12.92-8.531,15.176-12.204C70.875,123.175,47.756,99.468,38.269,97.855z\" class=\"color1\"></path><circle cx=\"112.938\" cy=\"92.486\" r=\"10.555\" class=\"color1\"></circle></g></svg></div><div class=\"element text\" style=\"position: absolute; top: 25px; left: 95px; width: 239.031px; height: 50px; color: rgb(0, 0, 0); text-align: left; line-height: 1.4; letter-spacing: 0px; text-transform: none; font-size: 27px; font-family: Anglee;\"><div class=\"inner\" style=\"display: block; width: 239.031px;\">Butterfly</div></div></div></div></body></html>`;

// wkhtmltopdf(html)
//   .pipe(fs.createWriteStream('out2.pdf'));
// const html2 = 'http://uplevo.com'
console.log('-------------------------+++++++ ')
wkhtmltoimage(html, {}, function (err, stream) {
  console.log('done pdf')
});
//.pipe(fs.createWriteStream('out.png'));

mupdf('./out2.pdf', { c: 'rgb', r: 800, output: './hayhay.jpg' }, function (err, stream) {
  console.log('done png')
})