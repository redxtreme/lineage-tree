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

        //if line length is less than 2 skip it
        if (line.length < 2)
            continue;
        
        //loop through every id in a line
        for (var i = 0; i < line.length; i++) {
            
            var newNode = new Node();

            newNode.id = parseInt(line[i]);

            //if this is not the last node in a line
            if (i < line.length - 1) {
                newNode.parent = parseInt(line[i + 1]);
            }

            nodes.push(newNode);
        }
    }
    constructTree(nodes);
}

function constructTree(nodes) {

    var nodeLinks = [];
    nodeLinks.push({source: 0, target: 0})
    //loop through all of the nodes
    for (var i=0; i < nodes.length; i++) {
        var node = nodes[i];
        print(node);
        nodeLinks.push({
            source: node.id,
            target: node.parent
        });
        
    }
    print(nodeLinks);
    //example at https://bl.ocks.org/mbostock/3311124
    var graph = {
        nodes: d3.range(nodeLinks.length).map(Object),
        links: nodeLinks
    };
print(graph.links);
    var width = 960,
        height = 500;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
        .nodes(graph.nodes)
        .links(graph.links)
        .size([width, height])
        .charge(-200)
        .on("tick", tick)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 4.5);

    function tick() {
        link.attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    }

}

function print(stuff) {
    console.log(stuff);
}
