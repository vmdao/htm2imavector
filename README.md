# html2imavertor -  HTML to Image[PDF, PNG, JPEG]

Base on wkhtmltopdf and Mupdf.

Use wkhtmltopdf: convert html to pdf or image.
Use mupdf: convert pdf to image(hiquality).

## Install

### Install Node Backend
    npm install --save html2imavertor

### Install Library Backend
1. Install lib wkhtmltopdf 13.02(https://wkhtmltopdf.org) 
2. Install lib Mupdf 9.7b(https://wkhtmltopdf.org)

## Usage
```
var Convert = require('htmltoimavetor');
var html2image = Convert.html2image; 
var html2pdf = Convert.html2image; 
var pdf2image = Convert.html2image;
```

### html2image(source, [options], [callback]);
```
// URL
html2image('http://google.com/', { pageSize: 'letter' })
  .pipe(fs.createWriteStream('image-out.png'));
  
// HTML
html2image('<h1>Image</h1><p>Hello world</p>')
  .pipe(res);

// Stream input and output
var stream = html2image(fs.createReadStream('html-in.html'));

// output to a file directly
html2image('http://google.com/', { output: 'image-out.png' });

// Optional callback
html2image('http://google.com/', { pageSize: 'letter' }, function (error, stream) {
 // make it
});
```

### html2pdf(source, [options], [callback]);
```
// URL
html2pdf('http://google.com/', { pageSize: 'letter' })
  .pipe(fs.createWriteStream('image-out.pdf'));
  
// HTML
html2pdf('<h1>Image</h1><p>Hello world</p>')
  .pipe(res);

// Stream input and output
var stream = html2pdf(fs.createReadStream('html-in.html'));

// output to a file directly
html2pdf('http://google.com/', { output: 'image-out.png' });

// Optional callback
html2pdf('http://google.com/', { pageSize: 'letter' }, function (error, stream) {
 // make it
});
```
### pdf2image (filePath, [options], [callback]);
```
var file = './pdf-in.pdf';
var options = {
    c: 'rbg', // color space: 'rbg', 'rgba', 'cmyk', 'gray'
    r: 72,    // resolution: by pixel.
    output: './image-out.png'
}
// output to a file directly
pdf2image(file, options, function(){
    // out file 
});
```

