'use strict';
var id2 = null;
var p = null;

$(document).ready(function() {
    tableau.extensions.initializeAsync({ 'configure': configure }).then(function() {
        getid2();
        createParameterListener();
    }, function() { console.log('Error while Initializing: ' + err.toString()); });
});

function createParameterListener() {

    tableau.extensions.dashboardContent.dashboard.getParametersAsync().then(function(t) {
        p = t.find(p1 => p1.name === tableau.extensions.settings.get("param"));
        const pChanged = tableau.TableauEventType.ParameterChanged;
        p.addEventListener(pChanged, function(parameterEvent) {
            showid2();
        });
    });

};

function configure() {
    const popupUrl = `https://boonebaker.github.io/tableauDrilldown/dialog.html`;
    let defaultPayload = "";
    tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height: 450, width: 500 }).then((closePayload) => {}).catch((error) => {
        switch (error.errorCode) {
            case tableau.ErrorCodes.DialogClosedByUser:
                console.log("Dialog was closed by user");
                break;
            default:
                console.error(error.message);
        }
    });
}

function getid2() {
    var dash = tableau.extensions.dashboardContent.dashboard;
    var sObj = dash.objects.find(o => o.name === tableau.extensions.settings.get("cont1"));
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
        p.changeValueAsync(tableau.extensions.settings.get("defValue"));
    });
};