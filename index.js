var wkhtmltoimage = require('./libs/wkhtmltoimage');
var wkhtmltopdf = require('./libs/wkhtmltopdf');
var mupdf = require('./libs/mupdf');

module.exports = { html2pdf: wkhtmltopdf, html2image: wkhtmltoimage, pdf2image: mupdf }