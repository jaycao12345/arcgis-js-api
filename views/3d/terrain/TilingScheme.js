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

define(["../../../geometry/SpatialReference","../../../geometry/support/scaleUtils","../support/projectionUtils","../support/mathUtils"],function(e,i,t,r){function l(e,i){var t=new Error(i);return t.name=e,t}var n=t.webMercator.x2lon,o=t.webMercator.y2lat,s=[0,0,0,0],a=12,h=function(e){var i=h._checkUnsupported(e);if(i)throw i;this.spatialReference=e.spatialReference,this._isWebMercator=this.spatialReference.isWebMercator,this._isWGS84=this.spatialReference.isWGS84,this.origin=[e.origin.x,e.origin.y],this.pixelSize=[e.cols,e.rows];var t=e.lods.reduce(function(e,i,t){return i.level<e.min&&(e.min=i.level,e.minIndex=t),e.max=Math.max(e.max,i.level),e},{min:1/0,minIndex:0,max:-1/0}),r=e.lods[t.minIndex],l=Math.pow(2,r.level),n=r.resolution*l,o=r.scale*l;this.levels=new Array(t.max+1);for(var s=0;s<this.levels.length;s++)this.levels[s]={resolution:n,scale:o,tileSize:[n*e.cols,n*e.rows]},n/=2,o/=2};return h.prototype={getExtent:function(e,i,t,l,s){l=l||new Array(4);var a=this.levels[e],h=a.tileSize[0],u=a.tileSize[1];l[0]=this.origin[0]+t*h,l[2]=l[0]+h,l[3]=this.origin[1]-i*u,l[1]=l[3]-u,s&&(this._isWebMercator?(s[0]=n(l[0]),s[1]=o(l[1]),s[2]=n(l[2]),s[3]=o(l[3])):this._isWGS84&&(s[0]=r.deg2rad(l[0]),s[1]=r.deg2rad(l[1]),s[2]=r.deg2rad(l[2]),s[3]=r.deg2rad(l[3])))},ensureMaxLod:function(e){for(;this.levels.length<=e;){var i=this.levels[this.levels.length-1],t=i.resolution/2;this.levels.push({resolution:t,scale:i.scale/2,tileSize:[t*this.pixelSize[0],t*this.pixelSize[1]]})}},capMaxLod:function(e){this.levels.length>e+1&&(this.levels.length=e+1)},getMaxLod:function(){return this.levels.length-1},scaleAtLevel:function(e){return this.levels[0].scale/Math.pow(2,e)},levelAtScale:function(e){var i=this.levels[0].scale;return e>=i?0:Math.log(i/e)*Math.LOG2E},compatibleWith:function(e){if(!(e instanceof h)){if(h._checkUnsupported(e))return!1;e=new h(e)}if(!e.spatialReference.equals(this.spatialReference))return!1;if(e.pixelSize[0]!==this.pixelSize[0]||e.pixelSize[1]!==this.pixelSize[1])return!1;var i=Math.min(this.levels.length,e.levels.length)-1,t=this.levels[i].resolution,l=r.floatEqualAbsolute,n=.5*t;if(!l(e.origin[0],this.origin[0],n)||!l(e.origin[1],this.origin[1],n))return!1;var o=Math.max(this.pixelSize[0],this.pixelSize[1]),s=Math.pow(2,i);return n=.5*t/s/o*a,l(t,e.levels[i].resolution,n)},rootTilesInExtent:function(e,i,t){var r=this.levels[0].tileSize;h.computeRowColExtent(e,r,this.origin,s);var l=s[1],n=s[3],o=s[0],a=s[2],u=a-o,c=n-l;if(u*c>t){var f=Math.floor(Math.sqrt(t));c>f&&(l=l+Math.floor(.5*c)-Math.floor(.5*f),n=l+f),u>f&&(o=o+Math.floor(.5*u)-Math.floor(.5*f),a=o+f)}for(var p=new Array((a-o)*(n-l)),v=0,g=l;n>g;g++)for(var m=o;a>m;m++)p[v++]=[0,g,m];return i&&(i[0]=this.origin[0]+o*r[0],i[1]=this.origin[1]-n*r[1],i[2]=this.origin[0]+a*r[0],i[3]=this.origin[1]-l*r[1]),p}},h.computeRowColExtent=function(e,i,t,r){var l=.001*(e[2]-e[0]+(e[3]-e[1]));r[0]=Math.floor((e[0]+l-t[0])/i[0]),r[2]=Math.ceil((e[2]-l-t[0])/i[0]),r[1]=Math.floor((t[1]-e[3]+l)/i[1]),r[3]=Math.ceil((t[1]-e[1]-l)/i[1])},h.isPowerOfTwo=function(e){var i=e.lods,t=i[0].resolution*Math.pow(2,i[0].level);return!i.some(function(e){return!r.floatEqualRelative(e.resolution,t/Math.pow(2,e.level))})},h.hasGapInLevels=function(e){var i=e.lods.map(function(e){return e.level});i.sort(function(e,i){return e-i});for(var t=1;t<i.length;t++)if(i[t]!==i[0]+t)return!0;return!1},h.tileSizeSupported=function(e){var i=e.rows;return i===e.cols&&0===(i&i-1)&&i>=128&&512>=i},h._checkUnsupported=function(e){return e?e.lods.length<1?l("tilingscheme:generic","Tiling scheme must have at least one level"):h.isPowerOfTwo(e)?null:l("tilingscheme:power-of-two","Tiling scheme must be power of two"):l("tilingscheme:tile-info-missing","Tiling scheme must have tiling information")},h.checkUnsupported=function(e){var i=h._checkUnsupported(e);return i?i:h.hasGapInLevels(e)?l("tilingscheme:gaps","Tiling scheme levels must not have gaps between min and max level"):h.tileSizeSupported(e)?null:l("tilingscheme:tile-size","Tiles must be square and size must be one of [128, 256, 512]")},h.fromExtent=function(e,t){var r=e[2]-e[0],l=e[3]-e[1],n=i.getUnitValueForSR(t),o=1.2*Math.max(r,l),s=256,a=96,u=.0254,c=new h({rows:s,cols:s,origin:{x:e[0]-.5*(o-r),y:e[3]+.5*(o-l)},lods:[{level:0,resolution:o/s,scale:1/(s/a*u/(o*n))}],spatialReference:t});return c.ensureMaxLod(20),c},h.WebMercatorAuxiliarySphereTileInfo={rows:256,cols:256,origin:{x:-20037508.342787,y:20037508.342787},spatialReference:e.WebMercator,lods:[{level:0,resolution:156543.03392800014,scale:591657527.591555}]},h.WebMercatorAuxiliarySphere=new h(h.WebMercatorAuxiliarySphereTileInfo),h.WebMercatorAuxiliarySphere.ensureMaxLod(19),h.makeWGS84WithTileSize=function(i){var t=256/i,r=new h({rows:i,cols:i,origin:{x:-180,y:90},spatialReference:e.WGS84,lods:[{level:0,resolution:.703125*t,scale:295497598.570834*t}]});return r.ensureMaxLod(16),r},h});