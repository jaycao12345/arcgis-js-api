// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["../../../core/Accessoire","../../../core/Evented","../../../core/watchUtils","./Picker","./mixins/CamerasMixin"],function(e,i,n,t,r){var s=e.createSubclass([r,i],{classMetadata:{properties:{interacting:{getter:function(){return this._interacting},readOnly:!0},renderUnitInMeters:{dependsOn:["renderCoordsHelper"],getter:function(){return this.renderCoordsHelper?this.renderCoordsHelper.unitInMeters:1}},picker:{},constraints:{}}},initialize:function(){this._mapCoordsHelperHandle=n.init(this.view,"mapCoordsHelper",function(e){this.mapCoordsHelper=e}.bind(this)),this._renderCoordsHelperHandle=n.init(this.view,"renderCoordsHelper",this.updateRenderCoordsHelper.bind(this)),this.picker=new t(this,this.view),this._interacting=!1},destroy:function(){this._mapCoordsHelperHandle.remove(),this._renderCoordsHelperHandle.remove()},updateRenderCoordsHelper:function(e){this.renderCoordsHelper=e,this.inherited(arguments)},begin:function(){this.pan&&this.pan.continuous&&this.pan.continuous.stop(),this._interacting=!0,this.notifyChange("interacting")},end:function(){this._interacting=!1,this.notifyChange("interacting")}});return s});