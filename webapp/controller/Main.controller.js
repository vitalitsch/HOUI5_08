sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "de/huberit/training08/zhoui5/data/formatter/Formatter"
], function (Controller, Formatter) {
  "use strict";

  return Controller.extend("de.huberit.training08.zhoui5.controller.Main", {
    formatter: Formatter,
    onInit: function () {

    },
    onListItemClicked: function (oEvent) {
      const sPath = oEvent.getSource().getBindingContext().getPath();
      this.getOwnerComponent().getRouter().navTo("Customer", {
        path: encodeURIComponent(sPath)
      }, false);
    },
    onCreatePressed: function (oEvent) {
      this.getOwnerComponent().getRouter().navTo("CreateCustomer", null, false);

    }

  });
});