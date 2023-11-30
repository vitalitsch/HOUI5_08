sap.ui.define([
  "de/huberit/training08/zhoui5/controller/BaseController",
  "de/huberit/training08/zhoui5/data/formatter/Formatter",
  "sap/m/MessageBox"
], function (BaseController, Formatter, MessageBox) {
  "use strict";

  return BaseController.extend("de.huberit.training08.zhoui5.controller.Main", {
    formatter: Formatter,
    onInit: function () {
      this.setContentDensity();
    },
    onListItemClicked: function (oEvent) {
      const sPath = oEvent.getSource().getBindingContext().getPath();
      // this.getOwnerComponent().getRouter().navTo("Customer", {
      //   path: encodeURIComponent(sPath)
      // }, false);
      this.getRouter().navTo("Customer", {
        path: encodeURIComponent(sPath)
      }, false);
    },
    onCreatePressed: function (oEvent) {
      this.getOwnerComponent().getRouter().navTo("CreateCustomer", null, false);

    },
    onDeletePressed: function (oEvent) {
      const oListItem = oEvent.getParameters().listItem;
      const oModel = this.getView().getModel();
      const sPath = oListItem.getBindingContext().getPath();
      const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

      MessageBox.warning("Warnung! Löschen?", {
        title: oResourceBundle.getText("sureToDeleteTitle"),
        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        emphasizedAction: MessageBox.Action.YES,
        onClose: (oAction) => {
          if (MessageBox.Action.YES === oAction) {
            this.getView().setBusy(true);

            oModel.remove(sPath, {
              success: (oData, response) => {
                this.getView().setBusy(false);

                MessageBox.success(oResourceBundle.getText("dialog.delete.success"));
                oModel.refresh(true);
              },
              error: (oError) => {
                this.getView().setBusy(false);

                MessageBox.error(oError.message);
              }
            });
          }
        }
      });

    },
    _getVal: function (evt) {
      return evt.getSource().getText();
    },

    handleTelPress: function (evt) {
      sap.m.URLHelper.triggerTel(this._getVal(evt));
    },

    handleEmailPress: function (evt) {
      sap.m.URLHelper.triggerEmail(this._getVal(evt), "Info Request", false, false, false, true);
    }
  });
});