var wkhtmltoimage = require('./libs/wkhtmlimage');
var wkhtmltopdf = require('./libs/wkhtmltopdf');
var mupdf = require('./libs/mupdf');

module.exports = { html2pdf: wkhtmltopdf, html2image, wkhtmltoimage, pdf2image: mupdf }