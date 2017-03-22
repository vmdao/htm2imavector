var wkhtmltoimage = require('./src/wkhtmlimage');
var wkhtmltopdf = require('./src/wkhtmltopdf');
var mupdf = require('./src/mupdf');

module.exports = { html2pdf: wkhtmltopdf, html2image, wkhtmltoimage, pdf2image: mupdf }