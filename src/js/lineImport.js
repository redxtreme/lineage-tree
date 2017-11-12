var nodeDetails = {}; //holds the details for each individual node

getLineData('./src/data/lines.txt');

//reference vid https://www.youtube.com/watch?v=ZZncFax8yNY
//also here https://www.html5rocks.com/en/tutorials/file/dndfiles/

// Gets the line data from the given file
function getLineData(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                handleText(allText);
                var data = constructGraphFormat();
                constructTree(data);
                //constructCluster(data);
            }
        }
    }
    rawFile.send(null);
}

//imports and formats the text file
function handleText(allText) {
    var data = [];

    //split text up line by line
    var lines = allText.split('\n');

    var splitLines = [];

    //split each line array up into individual ids
    lines.forEach(function (line) {
        splitLines.push(line.split(' '));
    });

    constructNodeDetails(splitLines);
}

//loop through every line and store the lineages links
function constructNodeDetails(splitLines) {

    splitLines.forEach(function (line, i) {
        if (line.length > 1) {

            //loop through every id in the line and link
            line.forEach(function (id, i) {
                var newNode = new DetailedNode();

                newNode.id = parseInt(line[i]);

                //if this is not the last node in a line
                if (i < line.length - 1)
                    newNode.parent = parseInt(line[i + 1]);

                //if the node isn't in the details, add it
                if (!nodeDetails.hasOwnProperty(id))
                    nodeDetails[id] = newNode;
                else if (newNode.parent !== 0) {
                    var storedParent = nodeDetails[id].parent;

                    //if the parent already stored is 0, fix it
                    if (storedParent === 0)
                        nodeDetails[id] = newNode;
                    else {

                        //if the parents dont match, throw alert
                        if (storedParent !== newNode.parent)
                            alert(id + ' has conflicting parents: ' + newNode.parent + ', and ' + storedParent);
                    }
                }
            })
        }
    })
}

//gathers and formats the entire lineage for a line for graph usage
function formatLineage(node) {

    //if this is the oldest ancestor
    if (node.parent === 0) {

        //link it to 0 for now
        var newNode = new GraphNode('0.' + node.id);
        return [newNode];
    } else {

        //get the ancestor string up to this point
        lineageData = formatLineage(nodeDetails[node.parent]);
        var lineage = lineageData[lineageData.length - 1].id;

        //add the current id to the lineage
        var formattedLineage = lineage + '.' + node.id;
        var newNode = new GraphNode(formattedLineage);
        lineageData.push(newNode);

        return lineageData;
    }
}

//formats the lineage so the graph can display it
function constructGraphFormat() {
    var graphData = {};
    var keys = d3.keys(nodeDetails);

    //add the root node
    graphData['0'] = new GraphNode('0');

    for (i = keys.length - 1; i >= 0; i--) {
        var curKey = keys[i];
        var node = nodeDetails[curKey];
        formatLineage(node).forEach(function (data) {
            if (!graphData.hasOwnProperty(data.id))
                graphData[data.id] = data;
        });
    }

    //turn object into array
    var toReturn = [];
    for (var graphNodeKey in graphData) {
        toReturn.push(graphData[graphNodeKey]);
    }

    return toReturn;
}

//Stores the details of a node
function DetailedNode(parent = 0, id = null, name = null) {
    this.parent = parent;
    this.id = id;
    this.name = name;
}

//Stores the lineage in a graph format
function GraphNode(lineageString = 0) {
    this.id = lineageString;
}
