/*
 * Makes a new app container with the given name.
 * @param appName <String>: The name of the app it will contain
 * @returns appContainerBody <Element>: App container's body element
 */
function createAppContainer(appName) {
    var formatedName = appName.replace(' ', '_').toLowerCase();
    var appContainer = d3.select('body').append('div')
        .attr('class', 'appContainer')
        .attr('id', 'appContainer_' + formatedName);

    //set up container header
    var header = appContainer.append('div').attr('class', 'appContainerHeader');
    header.text(appName);
    
    //set up container body
    var containerBody = appContainer.append('div').attr('class', 'appContainerBody');
    
    return containerBody;
}

function getAppHeight() {
    return 800;
}

function getAppWidth() {
    return 1240;
}

function getTreeBranchWidth() {
    return 10;
}

function getTreeTextChildSpacing() {
    return 8;
}

function getTreeTextParentSpacing() {
    return 8;
}

function getTreeTextChildAnchor() {
    var option = ['start', 'end'];
    return option[0];
}

function getTreeTextParentAnchor() {
    var option = ['start', 'end'];
    return option[0];
}

function getTreeCircleSize() {
    return 3;
}

function getTreeTextRotation() {
    return 90;
}
