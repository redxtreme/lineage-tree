getLineData('lines.txt')
var lineText = '';
//reference vid https://www.youtube.com/watch?v=ZZncFax8yNY
// also here https://www.html5rocks.com/en/tutorials/file/dndfiles/

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

function handleText() {
    console.log(lineText.split('\n'));
}