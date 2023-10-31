sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "../model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, models) {
        "use strict";

        return Controller.extend("ui5.damageselector.controller.Home", {
            onInit: function () {
                $.ajax({
                    url: '/assets/car.svg',
                    async: true,
                    success: data => {
                        const content = new XMLSerializer().serializeToString(data)
                        this.getView().byId("idSvgContainer").setContent(content)
                    }
                })

                this.getView().setModel(models.createDamageModel(), "damage")
            },

            onSvgContainerRendered() {
                // Get all path elements
                const aPaths = $("path.part")

                // Check elements are in the DOM
                if (!aPaths.length) return

                // Register onclick event on the paths
                aPaths.bind("click", this._handlePathClick.bind(this))
            },

            onSelectDamageType(oEvent) {
                const sType = oEvent.getSource().data("type")

                this._oActivePath.removeClass("scratch")
                this._oActivePath.removeClass("dent")
                this._oActivePath.removeClass("chip")

                switch (sType) {
                    case "S":
                        this._oActivePath.addClass("scratch")
                        break;
                    case "D":
                        this._oActivePath.addClass("dent")
                        break;
                    case "C":
                        this._oActivePath.addClass("chip")
                        break;
                    default:
                        break;
                }

                // Navigate to the next page
                const oTarget = this.getView().byId("severity")
                this.getView().byId("idNavContainer").to(oTarget)
            },

            onPressReset() {
                const oData = this.getView().getModel("damage").getData()

                oData[this._oActivePath.attr("id")].type = ""
                oData[this._oActivePath.attr("id")].severity = 0.5

                this.getView().getModel("damage").refresh()

                this._oPopover.close()
            },

            onNavBack() {
                const oTarget = this.getView().byId("type")
                this.getView().byId("idNavContainer").to(oTarget)
            },

            onBeforeOpen() {
                const oTarget = this.getView().byId("type")
                const oData = this.getView().getModel("damage").getData()
                const oDataCurrent = oData[this._oActivePath.attr("id")]

                this.getView().byId("idNavContainer").to(oTarget)

                this.getView().byId("idSlider").setValue(
                    oDataCurrent.severity ? oDataCurrent.severity * 100 : 50
                )
            },

            onChangeSeverity(oEvent) {
                const fValue = oEvent.getParameter("value") / 100

                this._oActivePath.css({ "fill-opacity": fValue })
            },

            onSave() {
                const oData = this.getView().getModel("damage").getData()

                if (this._oActivePath.hasClass("scratch"))
                    oData[this._oActivePath.attr("id")].type = "S"
                else if (this._oActivePath.hasClass("dent"))
                    oData[this._oActivePath.attr("id")].type = "D"
                else if (this._oActivePath.hasClass("chip"))
                    oData[this._oActivePath.attr("id")].type = "C"
                else
                    oData[this._oActivePath.attr("id")].type = ""

                oData[this._oActivePath.attr("id")].severity = +this._oActivePath.css("fill-opacity")

                this.getView().getModel("damage").refresh()

                this._oPopover.close()
            },

            onCancel() {
                const oData = this.getView().getModel("damage").getData()

                this._oActivePath.removeClass("scratch")
                this._oActivePath.removeClass("dent")
                this._oActivePath.removeClass("chip")

                if (oData[this._oActivePath.attr("id")].type === "S")
                    this._oActivePath.addClass("scratch")
                else if (oData[this._oActivePath.attr("id")].type === "D")
                    this._oActivePath.addClass("dent")
                else if (oData[this._oActivePath.attr("id")].type === "C")
                    this._oActivePath.addClass("chip")

                if (this._oActivePath.hasClass("scratch") ||
                    this._oActivePath.hasClass("dent") ||
                    this._oActivePath.hasClass("chip"))
                    this._oActivePath.css({ "fill-opacity": oData[this._oActivePath.attr("id")].severity })
                else
                    this._oActivePath.attr("style", "")

                this._oPopover.close()
            },

            _handlePathClick(oEvent) {
                this._oActivePath = $(oEvent.target)
                const oSource = oEvent.target

                if (!this._oPopover) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "ui5.damageselector.view.fragments.DamageSelector",
                        controller: this
                    }).then(oPopover => {
                        this._oPopover = oPopover
                        this.getView().addDependent(this._oPopover)
                        this._oPopover.openBy(oSource)
                    })
                } else {
                    this._oPopover.openBy(oSource)
                }
            }
        });
    });
