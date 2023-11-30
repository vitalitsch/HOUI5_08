sap.ui.define([
    "de/huberit/training08/zhoui5/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "de/huberit/training08/zhoui5/data/formatter/Formatter",
    "sap/ui/core/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox, JSONModel, Fragment, Formatter, History) {
        "use strict";

        return BaseController.extend("de.huberit.training08.zhoui5.controller.Customer", {
            _fragmentList: {},
            formatter: Formatter,
            onInit: function () {

                let oEditModel = new JSONModel({
                    editmode: false
                });

                this.setContentDensity();
                this.getView().setModel(oEditModel, "editModel");
                let oRouter = this.getRouter();
                oRouter.getRoute("Customer").attachPatternMatched(this._onPatternMatched, this);
                oRouter.getRoute("CreateCustomer").attachPatternMatched(this._onCreatePatternMatched, this);
            },
            _showCustomerFragment: function (sFragmentName) {
                let page = this.getView().byId("ObjectPageLayout");

                page.removeAllSections();

                if (this._fragmentList[sFragmentName]) {
                    page.addSection(this._fragmentList[sFragmentName]);
                } else {
                    Fragment.load({
                        id: this.getView().createId(sFragmentName),
                        name: "de.huberit.training08.zhoui5.view.fragment." + sFragmentName,
                        controller: this
                    }).then(function (oFragment) {
                        this._fragmentList[sFragmentName] = oFragment;
                        page.addSection(this._fragmentList[sFragmentName]);
                    }.bind(this));
                }
            },
            onEditPressed: function () {
                this._toggleEdit(true);
            },

            _toggleEdit: function (bEditMode) {
                let oEditModel = this.getView().getModel("editModel");

                oEditModel.setProperty("/editmode", bEditMode);

                this._showCustomerFragment(bEditMode ? "CustomerEdit" : "CustomerDisplay");
            },

            onSavePressed: function () {

                const oModel = this.getView().getModel();
                const sSuccessText = this.bCreate ? "Erfolgreich hinzugefügt" : "Erfolgreich geändert!";

                this.getView().setBusy(true);

                oModel.submitChanges({
                    success: (oData, response) => {
                        MessageBox.success(sSuccessText, {
                            onClose: () => {
                                if (this.bCreate) {
                                    this._toggleEdit(false);
                                    oModel.refresh(true);
                                    this.getOwnerComponent().getRouter().navTo("Main", {}, true);
                                    //this.onNavBack();
                                } else {
                                    this._toggleEdit(false);
                                }
                            }
                        });
                    },
                    error: (oError) => {
                        MessageBox.error(oError.message);
                    }
                });
                this.getView().setBusy(false);
            },

            onNavBack: function (navigate) {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Main", {}, true);
                }
                this._toggleEdit(false);
            },

            onCancelPressed: function () {


                const oModel = this.getView().getModel();

                if (oModel.hasPendingChanges()) {
                    oModel.resetChanges()
                }

                this._toggleEdit(false);

                if (this.bCreate) {
                    this.bCreate = !this.bCreate;
                    this.onNavBack();
                }
            },
            _onPatternMatched: function (oEvent) {
                let path = oEvent.getParameters().arguments["path"];
                this.getView().bindElement(decodeURIComponent(path));
                this._showCustomerFragment("CustomerDisplay");
            },
            _onCreatePatternMatched: function (oEvent) {
                this.bCreate = true;

                let oNewCustomerContext = this.getView().getModel().createEntry("/Z_P_CUSTOMER");
                this.getView().bindElement(oNewCustomerContext.getPath());

                this.getView().getModel("editModel").setProperty("/editmode", true);
                this._showCustomerFragment("CustomerEdit");
            },
        });
    });
