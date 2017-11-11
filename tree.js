var nodeDetails = {}; //holds the details for each individual node

console.log('herll');
getLineData('lines2.txt');

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
    var data = [];

    //split text up line by line
    var lines = allText.split('\n');

    var splitLines = [];
    
    //split each line array up into individual ids
    lines.forEach(function (line) {
        splitLines.push(line.split(' '));
    });
    
    //loop through every line and link the lineages
    splitLines.forEach(function (line, i) {

        if (line.length > 1) {

            //loop through every id in the line and link
            line.forEach(function (id, i) {
                var newNode = new DetailedNode();

                newNode.id = parseInt(line[i]);

                //if this is not the last node in a line
                if (i < line.length - 1)
                    newNode.parent = parseInt(line[i + 1]);

                if (!nodeDetails.hasOwnProperty(id))
                    nodeDetails[id] = newNode;
            })
        }
    })
    print(nodeDetails);
    
    //    //    //loop through every person's line to compile graph format
    //    for (var lineIndex in lines) {
    //
    //        //isolate each id number
    //        var line = lines[lineIndex].split(' ');
    //
    //        //if line length is less than 2 skip it
    //        if (line.length < 2)
    //            continue;
    //
    //        //for every id in the line
    //        for (var i = 0; i < line.length; i++) {
    //            var id = '';
    //
    //            //append all the children
    //            for (var j = 0; j <= i; j++) {
    //
    //                //add . between each node
    //                if (j !== 0)
    //                    id += '.';
    //
    //                id += line[j];
    //            }
    //            data.push(new graphNode(id));
    //        }
    //    }
    //    print(data);
    //    constructTree(data);
}

function constructTree(data) {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")");

    var stratify = d3.stratify()
        .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf("."));
        });

    var tree = d3.cluster()
        .size([360, 390])
        .separation(function (a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

    var root = tree(stratify(data)
        .sort(function (a, b) {
            return (a.height - b.height) || a.id.localeCompare(b.id);
        }));

    var link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d) {
            return "M" + project(d.x, d.y) +
                "C" + project(d.x, (d.y + d.parent.y) / 2) +
                " " + project(d.parent.x, (d.y + d.parent.y) / 2) +
                " " + project(d.parent.x, d.parent.y);
        });

    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + project(d.x, d.y) + ")";
        });

    node.append("circle")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", ".31em")
        .attr("x", function (d) {
            return d.x < 180 === !d.children ? 6 : -6;
        })
        .style("text-anchor", function (d) {
            return d.x < 180 === !d.children ? "start" : "end";
        })
        .attr("transform", function (d) {
            return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        })
        .text(function (d) {
            return d.id.substring(d.id.lastIndexOf(".") + 1);
        });
}

function lineGenerator(line) {
    var data = [];

    function Node(id = 0) {
        this.id = id;
    };

    //for every id in the line
    for (var i = 0; i < line.length; i++) {
        var id = '';

        //prepend all the children
        for (var j = 0; j <= i; j++) {

            //add . between each node
            if (j !== 0)
                id += '.';

            id += line[j];
        }
        data.push(new Node(id));
    }

    return data;
}

function project(x, y) {
    var angle = (x - 90) / 180 * Math.PI,
        radius = y;
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

function DetailedNode(parent = 0, id = null, name = null) {
    this.parent = parent;
    this.id = id;
    this.name = name;
};

function graphNode(id = 0) {
    this.id = id;
};

function print(stuff) {
    console.log(stuff);
}
