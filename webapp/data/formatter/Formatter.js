sap.ui.define([], function () {
    "use strict";
    return {
        gender: function (sKey) {
            return this.getView().getModel("i18n").getResourceBundle().getText(sKey);
        },
        date: function (sDate) {
            let dateObj = new Date(sDate);
            return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
        }
    }
}
)