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

define(["./TileAgentBase","./TerrainConst","./UpsampleInfo","../support/ObjectPool"],function(e,t,i,l){var a=4,r=function(){e.apply(this,arguments)};return r.prototype=new e,r.prototype.constructor=r,r.prototype.dataArrived=function(e){e!==this.tile?this._setUpsamplingTile(e):this.updateGeometry(),this._dataRequested=null,this._requestNext()},r.prototype.updateGeometry=function(){this._tileLayerInfo.pendingUpdates|=t.TileUpdateTypes.UPDATE_GEOMETRY,this.tile.updateGeometry()},r.prototype._findAncestorWithData=function(){if(this.tile.lij[0]<this.tile.elevationStartsAtLevel)return null;for(var e,l=this.layerClass,a=this.layerIdx,r=this.tile,s=r.vlevel;r&&!(r.layerInfo[l][a].data&&(e=r,s-r.lij[0]>=t.ELEVATION_DESIRED_RESOLUTION_LEVEL));)r=r.parent;if(e){var n=i.Pool.acquire();return n.init(e,0,0,1),n}return null},r.prototype._findNextDownload=function(){var e,i=this.layerIdx,l=this.layerClass,r=this.tile.parentSurface.layerViewByIndex(i,l),s=r.minDataLevel,n=r.maxDataLevel,o=t.ELEVATION_DESIRED_RESOLUTION_LEVEL-(this.tile.vlevel-this.tile.lij[0]),p=a+o;if(this._tileLayerInfo.data||this.tile.lij[0]<Math.max(s,this.tile.elevationStartsAtLevel))e=null;else{for(var u=this.tile,h=u.lij[0],y=0,f=this._tileLayerInfo.upsampleFromTile?this._tileLayerInfo.upsampleFromTile.tile.lij[0]:-1,m=this.tile.parentSurface,d=m.getTilemapTile(u),_=m.tilemapStats,I=!1;u&&p>=y&&u.lij[0]>=s;){if(u.layerInfo[this.layerClass][this.layerIdx].data&&h-u.lij[0]>=o){u.lij[0]>f&&this._setUpsamplingTile(u);break}d&&!d.tileDataAvailable(u,i,l)?(I=!0,e=null):u.lij[0]<=n&&(e=u),u=u.parent,d=d?d.parent:null,y++}e&&h-e.lij[0]<o&&this._tileLayerInfo.upsampleFromTile&&(e=null),!e&&I&&_.tilesNotPresent++}return e},r.prototype._setUpsamplingTile=function(e){this._tileLayerInfo.upsampleFromTile&&i.Pool.release(this._tileLayerInfo.upsampleFromTile);var t=i.Pool.acquire();t.init(e,0,0,1),this._tileLayerInfo.upsampleFromTile=t,this.tile.updateElevationBounds(),this.updateGeometry()},l.on(r,400),r});