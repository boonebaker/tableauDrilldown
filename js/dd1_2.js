'use strict';
var id2 = null;

$(document).ready(function() {
    tableau.extensions.initializeAsync().then(function() {
        getid2();
        createParameterListener();
    }, function() { console.log('Error while Initializing: ' + err.toString()); });
});

function createParameterListener() {

    tableau.extensions.dashboardContent.dashboard.getParametersAsync().then(function(t) {
        var p = t.find(p1 => p1.name === "selectedCategory");
        const pChanged = tableau.TableauEventType.ParameterChanged;
        p.addEventListener(pChanged, function(parameterEvent) {
            showid2();
        });
    });

};

function getid2() {
    var dash = tableau.extensions.dashboardContent.dashboard;
    var sObj = dash.objects.find(o => o.name === "id2");
    id2 = sObj.id;
};

async function showid2() {
    var zoneVisibilityMap = {};
    zoneVisibilityMap[id2] = tableau.ZoneVisibilityType.Show;
    await tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(zoneVisibilityMap).then(() => {

    });
};

async function hideid2() {
    var zoneVisibilityMap = {};
    zoneVisibilityMap[id2] = tableau.ZoneVisibilityType.Hide;
    await tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(zoneVisibilityMap).then(() => {

    });
};