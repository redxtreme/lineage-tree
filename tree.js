getLineData('lines.txt');

//reference vid https://www.youtube.com/watch?v=ZZncFax8yNY
// also here https://www.html5rocks.com/en/tutorials/file/dndfiles/

// Gets the line data from the file
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

//imports and formats the text file
function handleText(allText) {
    function Node(parent = 0, id = null, name = null) {
        this.parent = parent;
        this.id = id;
        this.name = name;
    };
    var nodes = [];

    //break text up line by line
    var lines = allText.split('\n');

    //loop through every person's line
    for (var lineIndex in lines) {

        //isolate each id number
        var line = lines[lineIndex].split(' ');

        //loop through every id in a line
        for (var i=0; i < line.length; i++) {
            var newNode = new Node();

            newNode.id = parseInt(line[i]);
            
            //if this is not the last node in a line
            if (i < line.length - 1) {
                newNode.parent = parseInt(line[i + 1]);
            }

            nodes.push(newNode);
        }
    }
    print(nodes);
}

function print(stuff) {
    console.log(stuff);
}
