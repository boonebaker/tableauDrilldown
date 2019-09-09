'use strict';

(function() {

    $(document).ready(function() {
        tableau.extensions.initializeDialogAsync().then(function(openPayload) {
            buildDialog();
        });
    });

    function buildDialog() {
        let dashboard = tableau.extensions.dashboardContent.dashboard;

        dashboard.objects.forEach(function(obj) {
            if (obj.isFloating) {
                $("#selectObj").append("<option value='" + obj.name + "'>" + obj.name + "</option>");
            }
        });
        var cont1 = tableau.extensions.settings.get("cont1");
        if (cont1 != undefined) {
            $("#selectObj").val(cont1);
        }

        var parameters = dashboard.getParametersAsync().then(function(p) {
            p.forEach(function(p1) {
                $("#selectParam").append("<option value='" + p1.name + "'>" + p1.name + "</option>");
            });
            var param = tableau.extensions.settings.get("param");
            if (param != undefined) {
                $("#selectParam").val(param);
            }
        });

        var useResize = $("#resize").val();
        console.log(useResize);

        var xPos = $("#xPos").val();
        var yPos = $("#yPos").val();
        var height = $("#height").val();
        var width = $("#width").val();


        console.log(xPos);
        console.log(yPos);
        console.log(height);
        console.log(width);

        //$("#cont1").val(cont1);
        //$("#param").val(param);
        $('#cancel').click(closeDialog);
        $('#save').click(saveButton);
    }

    function closeDialog() {
        tableau.extensions.ui.closeDialog("10");
    }

    function saveButton() {

        console.log(xPos);
        console.log(yPos);
        console.log(height);
        console.log(width);
        tableau.extensions.settings.set("cont1", $("#selectObj").val());
        tableau.extensions.settings.set("param", $("#selectParam").val());
        tableau.extensions.settings.set("useResize", $("#resize").val());
        tableau.extensions.settings.set("xPos", $("#xPos").val());
        tableau.extensions.settings.set("yPos", $("#yPos").val());
        tableau.extensions.settings.set("height", $("#height").val());
        tableau.extensions.settings.set("width", $("#width").val());
        tableau.extensions.settings.saveAsync().then((currentSettings) => {
            tableau.extensions.ui.closeDialog("10");
        });
    }
})();