getLineData('lines.txt');

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
                handleText(allText);
            }
        }
    }
    rawFile.send(null);
}

function handleText(allText) {
    var lines = allText.split('\n');
    
    for (var lineIndex in lines) {
        var line = lines[lineIndex];
        console.log(line.split(' '));
    }
}