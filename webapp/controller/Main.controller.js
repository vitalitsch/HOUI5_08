sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "de/huberit/training08/zhoui5/data/formatter/Formatter"
], function (Controller, Formatter) {
  "use strict";

  return Controller.extend("de.huberit.training08.zhoui5.controller.Main", {
    formatter: Formatter,
    onInit: function () {

    },
    genderFormatter: function (sKey) {
      return this.getView().getModel("i18n").getResourceBundle().getText(sKey);
    },
    dateFormatter: function (sDate) {
      let dateObj = new Date(sDate);
      return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
    },
    onListItemClicked: function (oEvent) {
      const sPath = oEvent.getSource().getBindingContext().getPath();
      this.getOwnerComponent().getRouter().navTo("Customer", {
        path: encodeURIComponent(sPath)
      }, false);
    }
  });
});