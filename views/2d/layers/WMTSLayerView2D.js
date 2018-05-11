// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Handles","../../../core/ObjectPool","../../../core/accessorSupport/decorators","../../../geometry/support/webMercatorUtils","../engine/Bitmap","../engine/BitmapContainer","../engine/BitmapSource","../engine/Canvas2DContainer","../engine/Tiled","./LayerView2D","../tiling/TileInfoView","../tiling/TileKey","../tiling/TileQueue","../tiling/TileStrategy","../../layers/RefreshableLayerView"],function(e,t,i,n,r,o,s,l,a,u,h,c,f,p,d,y,_,g,w){var v=function(e){function t(t){var i=e.call(this,t)||this;return i.key=new y(0,0,0,0),i}return i(t,e),t.prototype.acquire=function(e){},t.prototype.release=function(){this.key.set(0,0,0,0)},t.pool=new o(t,!0),t}(f(a)),S=[102113,102100,3857,3785,900913];return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new r,t._tileStrategy=null,t._tileInfoView=null,t._fetchQueue=null,t._tileRequests=new Map,t.container=new c,t.layer=null,t}return i(t,e),t.prototype.hitTest=function(e,t){return null},t.prototype.update=function(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this.notifyChange("updating")},t.prototype.attach=function(){var e,t=this,i=this.layer.activeLayer;i.tileMatrixSetId?e=i.tileMatrixSet:(e=this._getTileMatrixSetBySpatialReference(i),i.tileMatrixSetId=e.id);var n=e.tileInfo.spatialReference,r=i.fullExtent&&i.fullExtent.clone();n.isWebMercator?r=l.geographicToWebMercator(r):n.isWGS84||(r=e.fullExtent),this._tileContainer=new u,this.container.addChild(this._tileContainer),this._tileInfoView=new d(e.tileInfo,r),this._fetchQueue=new _({tileInfoView:this._tileInfoView,process:function(e){return t.fetchTile(e)}}),this._tileStrategy=new g({cachePolicy:"keep",acquireTile:function(e){return t.acquireTile(e)},releaseTile:function(e){return t.releaseTile(e)},tileInfoView:this._tileInfoView}),this._handles.add(i.watch("styleId",function(e){t._refresh()})),this._handles.add(this.layer.watch("activeLayer",function(e){if(!e.tileMatrixSetId){var i=t._getTileMatrixSetBySpatialReference(t.layer.activeLayer);e.tileMatrixSetId=i.id}t._refresh()}))},t.prototype.detach=function(){this._handles.removeAll(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeChild(this._tileContainer),this._fetchQueue=this._tileStrategy=this._tileInfoView=this._tileContainer=null},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.doRefresh=function(){this.updateRequested||this.suspended||this._refresh()},t.prototype.isUpdating=function(){var e=!0;return this._tileRequests.forEach(function(t){e=e&&t.isFulfilled()}),!e},t.prototype.acquireTile=function(e){var t=this,i=v.pool.acquire();i.key.set(e),i.resolution=this._tileInfoView.getTileResolution(i.key),r=this._tileInfoView.tileInfo.size,i.width=r[0],i.height=r[1],this._tileInfoView.getTileCoords(i,i.key);var n=this._fetchQueue.push(i.key).then(function(e){i.source=e,i.once("attach",function(){return t.requestUpdate()}),t._tileContainer.addChild(i)});return this._tileRequests.set(i,n),this.requestUpdate(),i;var r},t.prototype.releaseTile=function(e){var t=this._tileRequests.get(e);t.isFulfilled()||t.cancel(),this._tileRequests.delete(e),this._tileContainer.removeChild(e),this.requestUpdate()},t.prototype.fetchTile=function(e){var t=this;return this.layer.fetchTile(e.level,e.row,e.col).then(function(i){var n=h.default.pool.acquire(i);return t._tileInfoView.getTileCoords(n,e),n.resolution=t._tileInfoView.getTileResolution(e),n})},t.prototype._refresh=function(){var e=this;this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(function(t){if(t.source){t.source=null;var i=e._fetchQueue.push(t.key).then(function(i){t.source=i,t.requestRender(),e.notifyChange("updating")});e._tileRequests.set(t,i)}}),this.notifyChange("updating")},t.prototype._getTileMatrixSetBySpatialReference=function(e){var t=this.view.spatialReference,i=t.wkid,n=e.tileMatrixSets.find(function(e){return e.tileInfo.spatialReference.wkid===i});return!n&&t.isWebMercator&&(n=e.tileMatrixSets.find(function(e){return S.indexOf(e.tileInfo.spatialReference.wkid)>-1})),n},n([s.property({dependsOn:["updateRequested","attached"]})],t.prototype,"updating",void 0),t=n([s.subclass("esri.views.2d.layers.WMTSLayerView2D")],t)}(s.declared(p,w))});