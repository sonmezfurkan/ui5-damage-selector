sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            createDamageModel() {
                return new JSONModel({
                    path1: { type: "", severity: 0.5 },
                    path2: { type: "", severity: 0.5 },
                    path3: { type: "", severity: 0.5 },
                    path4: { type: "", severity: 0.5 },
                    path5: { type: "", severity: 0.5 },
                    path6: { type: "", severity: 0.5 },
                    path7: { type: "", severity: 0.5 },
                    path8: { type: "", severity: 0.5 },
                    path9: { type: "", severity: 0.5 },
                    path10: { type: "", severity: 0.5 },
                    path11: { type: "", severity: 0.5 },
                    path12: { type: "", severity: 0.5 },
                    path13: { type: "", severity: 0.5 },
                    path14: { type: "", severity: 0.5 },
                    path15: { type: "", severity: 0.5 },
                })
            }
    };
});