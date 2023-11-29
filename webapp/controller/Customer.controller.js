sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("de.huberit.training08.zhoui5.controller.Customer", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Customer").attachPatternMatched(this._onPatternMatched, this);
                const oEditModel = new JSONModel({
                    editmode: false
                });
            
            },
            _onPatternMatched: function (oEvent) {
                let path = oEvent.getParameters().arguments["path"];
                this.getView().bindElement(decodeURIComponent(path));
            },
            dateFormatter: function (sDate) {
                let dateObj = new Date(sDate);
                return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
            },
        });
    });
