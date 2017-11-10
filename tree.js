getLineData('lines.txt')
var lineText = '';
//reference vid https://www.youtube.com/watch?v=ZZncFax8yNY

/* Gets the line data from the file */
function getLineData(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                lineText = allText;
                handleText();
                console.log('here');
            }
        }
    }
    rawFile.send(null);
}

function errorHandler(event) {
    if (evt.target.error.name == 'NotReadableError')
 {
     alert('Cannot read file!');
 }
}

function handleText() {
    console.log(lineText.split('\n'));
}

function getAsText(fileToRead) {
    var reader = new FileReader();
    
    reader.readAsText(fileToRead);
    
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}

function processData(csv) {
    var allTextLines = csv.split('/\r\n|\n');
}

function handleFiles(files) {
    if (window.FileReader) {
        getAsText(file);
        fileLoaded = true;
    } else  {
        alert('File reader not supported in browser');
    }
}