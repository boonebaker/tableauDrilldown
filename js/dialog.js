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

        //$("#cont1").val(cont1);
        //$("#param").val(param);
        $('#cancel').click(closeDialog);
        $('#save').click(saveButton);
    }

    function closeDialog() {
        tableau.extensions.ui.closeDialog("10");
    }

    function saveButton() {

        tableau.extensions.settings.set("cont1", $("#selectObj").val());
        tableau.extensions.settings.set("param", $("#selectParam").val());
        tableau.extensions.settings.saveAsync().then((currentSettings) => {
            tableau.extensions.ui.closeDialog("10");
        });
    }
})();