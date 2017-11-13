//for reference https://bl.ocks.org/mbostock/4339184

/*
 * Creates a tree app with the provided data.
 * @param data <jsonObject>: Graph formatted data.
 */
function constructTree(data) {
    var appContainer = createAppContainer('Lineage Tree');
    var svg = d3.select('body').append('svg')
        .attr('height', 800)
        .attr('width', 1000);
    var width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(40,0)");

    var tree = d3.tree()
        .size([height - 50, width - 80])
        .separation(function (a, b) {
            return (a.parent == b.parent ? 1 : 1);
        });

    var stratify = d3.stratify()
        .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf("."));
        });

    var root = stratify(data)
        .sort(function (a, b) {
            return (b.height - a.height) || a.id.localeCompare(b.id);
        });

    var link = g.selectAll(".link")
        .data(tree(root).links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(function (d) {
                return d.y;
            })
            .y(function (d) {
                return d.x;
            }));

    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        })

    node.append("circle")
        .attr("r", 3);

    node.append("text")
        .attr("dy", 3)
        .attr("x", function (d) {
            return d.children ? 8 : 8;
        })
        .style("text-anchor", function (d) {
            return d.children ? "start" : "start";
        })
        .attr("transform", function (d) {
            return "rotate(90)";
        })
        .text(function (d) {
            return d.id.substring(d.id.lastIndexOf(".") + 1);
        });
}
