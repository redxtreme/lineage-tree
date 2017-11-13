/*
 * Makes a new app container with the given name.
 * @param appName <String>: The name of the app it will contain
 */
function createAppContainer(appName) {
    appName = appName.replace(' ', '_').toLowerCase();
    var appContainer = d3.select('body').append('div')
        .attr('id', 'appContainer_' + appName);
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