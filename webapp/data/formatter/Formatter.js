sap.ui.define([], function () {
    "use strict";
    return {
        gender: function (sKey) {
            let sGenderName;
            if (sKey == 1) {
                sGenderName = 'female';
            } else {
                sGenderName = 'male';
            }
            return this.getView().getModel("i18n").getResourceBundle().getText(sGenderName);
        },
        date: function (sDate) {
            let dateObj = new Date(sDate);
            return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
        }
    }
}
)