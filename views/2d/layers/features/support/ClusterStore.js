// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../../../core/tsSupport/assignHelper","../../../../../core/tsSupport/generatorHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../geometry","../../../../../core/has","../../../../../core/maybe","../../../../../core/screenUtils","../../../../../geohash/GeohashTree","../../../../../geohash/geohashUtils","../../../../../geometry/support/spatialReferenceUtils","../../../../../geometry/support/webMercatorUtils","../../../../../layers/graphics/OptimizedFeature","../../../../../layers/graphics/OptimizedGeometry","../../../../../layers/graphics/data/FeatureStore","../../../../../layers/graphics/data/projectionSupport","../../../../../layers/graphics/data/QueryEngine","../../../../../layers/graphics/data/utils","../../../engine/webgl/definitions"],function(e,t,r,o,a,i,s,n,u,l,h,c,d,g,f,p,_,y,v,I,m){Object.defineProperty(t,"__esModule",{value:!0});var x=function(e){return u.andThen(e,function(e){return"cluster"!==e.type?null:o({},e,{clusterRadius:l.pt2px(e.clusterRadius/2)})})},S=function(e){function t(t,r,o,a,i){var s=this,n=new p.default([],[r,o]);return s=e.call(this,n,a,null,t)||this,s.invalid=!1,s.canDelete=!1,s.geohashBoundsInfo=i,s}return r(t,e),Object.defineProperty(t.prototype,"count",{get:function(){return this.attributes.cluster_count},enumerable:!0,configurable:!0}),t.create=function(e,r,o,a,i,s,n){var u=new t(r,o,a,s,n);return u.localId=e.createLocalId(u.objectId,!0),u.tileLevel=i,u},t.prototype.update=function(e,t,r,o,a){return this.geometry.coords[0]=e,this.geometry.coords[1]=t,this.tileLevel=r,this.attributes=o,this.geohashBoundsInfo=a,this.referenceId=null,this.invalid=!1,this},t.prototype.toJSON=function(){return{objectId:this.objectId,referenceId:this.referenceId,attributes:o({},this.attributes,{clusterId:this.objectId}),geometry:{x:this.geometry.coords[0],y:this.geometry.coords[1]}}},t}(f.default),b=function(e){function t(t,r,o,a){var i=e.call(this,t)||this;return i._deferredDeletionQueue=[],i._invalidated=!1,i._aggregateFieldsHash=null,i._geohashLevel=0,i._aggregateValueRanges={},i._aggregateValueRangesChanged=!1,i._clusters=new Map,i._tiles=new Map,i._spatialReference=r,i._attributeStore=o,i._featureReduction=x(a),i._projectionSupportCheck=y.checkProjectionSupport(r,s.SpatialReference.WGS84),i}return r(t,e),t.prototype.update=function(e,t){return i(this,void 0,void 0,function(){var r,o,i,s,n,l,c=this;return a(this,function(a){switch(a.label){case 0:return r=this._featureReduction,o=u.andThen(t.featureReduction,x),i=t.aggregateFields.reduce(function(e,t){return e+JSON.stringify(t)},""),s=null===r&&t.featureReduction,n=i!==this._aggregateFieldsHash,l=s||n,[4,this._projectionSupportCheck];case 1:return a.sent(),(this._featureReduction=o,this._aggregateFieldsHash=i,this._aggregateValueRanges={},this._invalidated=!0,u.isNone(o))?(this._tree=null,[2]):(u.isSome(r)&&r.clusterRadius!==o.clusterRadius&&this._clusters.forEach(function(e){return e.canDelete=!0}),l&&(this._tree=new h.GeohashTree(t.aggregateFields),this._unindexFeatures()),(l||e)&&this._reindexFeatures(),this._handleClusterUpdates(),this._tiles.forEach(function(e){return c._getClustersForTile(e,0,o.clusterRadius,null,!1)}),[2])}})})},t.prototype._unindexFeatures=function(){this._featuresById.forEach(function(e){e.geohashIndexed=!1})},t.prototype._reindexFeatures=function(){var e=this;this._featuresById.forEach(function(t){t.geohashX||t.geohashY||e._setGeohash(t),e._attributeStore.isVisible(t)?e._insertIntoIndex(t):e._removeFromIndex(t)})},t.prototype.onTileUpdate=function(e){var t=this,r=e.added,o=e.removed;if(r.length){var a=Math.max.apply(Math,r.map(function(e){return e.level}));this._setGeohashLevel(a),r.forEach(function(e){return t._tiles.set(e.key.id,e)})}if(!u.isNone(this._featureReduction)){var i=this._featureReduction.clusterRadius;o.forEach(function(e){t._tiles.delete(e.key.id),t._markTileClustersForDeletion(e,i)})}},t.prototype.sweepClusters=function(){var e=this;this._clusters.forEach(function(t,r){t.canDelete&&(e._attributeStore.freeLocalId(t.objectId),e._clusters.delete(r))});for(var t=0,r=this._deferredDeletionQueue;t<r.length;t++){var o=r[t];this._attributeStore.addLocalId(o)}this._deferredDeletionQueue=[]},t.prototype.executeTileQuery=function(t,r,o){return i(this,void 0,void 0,function(){var i,s,n;return a(this,function(a){switch(a.label){case 0:return u.isNone(this._featureReduction)?[2,e.prototype.executeTileQuery.call(this,t,r,o)]:[4,this._projectionSupportCheck];case 1:return a.sent(),this._handleClusterUpdates(),i=this._featureReduction.clusterRadius,s=this._getTransforms(t,r),n=this._getClustersForTile(t,o.pixelBuffer,i,s),this._aggregateValueRangesChanged&&(this.events.emit("valueRangesChanged",{valueRanges:this._aggregateValueRanges}),this._aggregateValueRangesChanged=!1),[2,n]}})})},t.prototype.getAggregate=function(e){var t=null;return this._clusters.forEach(function(r){r.localId===e&&(t=r.toJSON())}),t},t.prototype.getAggregateValueRanges=function(){return this._aggregateValueRanges},t.prototype._getClustersForTile=function(e,t,r,a,i){var l=this;void 0===i&&(i=!0),t=Math.max(t,50);for(var h=2*r,c=new Set,d=this._getGeohashLevel(e.key.level),f=Math.pow(2,e.key.level)*Math.ceil(m.TILE_SIZE/h),p=Math.ceil(t/h)+2,_=Math.ceil(m.TILE_SIZE/h)+2*p,x=e.key,S=x.row,b=x.col,R=b*m.TILE_SIZE,L=S*m.TILE_SIZE,T=Math.floor(R/h)-p,E=Math.floor(L/h)-p,F=T+_,C=E+_,w=new Array,V=e.tileInfoView.getLODInfoAt(e.key.level),j=T;j<=F;j++)for(var M=this,G=E;G<=C;G++)!function(t){var r,h,p=j;V.wrap&&(p=j<0?j+f:j%f);var _=V.wrap&&j<0,m=V.wrap&&j%f!==j,x=M._lookupCluster(V,e.key.level,p,t,d);if(u.isSome(x)){var S=u.andThen(a,function(e){return _?e.left:m?e.right:e.tile});if(i&&u.isNone(S))return"continue";if(!x.count)return"continue";if(i&&1===x.count){var b=x.geohashBoundsInfo,R=b.xLL,L=b.yLL,T=b.xTR,E=b.yTR,F=b.level,C=u.expect(M._tree).findSingleOccupancyNode(R,L,T,E,F),G=u.unwrap(C).getLngLatBounds(),k={x:G[0],y:G[1]},D={x:G[2],y:G[3]},X=0,Y=0,B=0,N=0;if(M._spatialReference.isWebMercator)r=g.lngLatToXY(k.x,k.y),X=r[0],Y=r[1],h=g.lngLatToXY(D.x,D.y),B=h[0],N=h[1];else{var Z=y.project(k,s.SpatialReference.WGS84,M._spatialReference),O=y.project(D,s.SpatialReference.WGS84,M._spatialReference);if(!Z||!O)return n("esri-2d-debug")&&console.debug("Failed to reproject known tree node"),"continue";X=Z.x,Y=Z.y,B=O.x,N=O.y}var U=[X,Y,B,N],W=null;if(M.forEachInBounds(U,function(e){l._attributeStore.isVisible(e)&&(W&&n("esri-2d-debug")&&console.debug("Expected to find only one feature, but found multiple"),W=e)}),!W)return n("esri-2d-debug")&&console.debug("Expected to find a feature, but found none"),"continue";var A=I.getGeometry(M.geometryInfo,W.geometry,0,u.expect(S)),H=o({},W.attributes,x.attributes);x.referenceId=W.localId,c.add(x.objectId),w.push(new v.Feature(H,x.localId,A))}else if(i){c.add(x.objectId);var A=I.getGeometry(M.geometryInfo,x.geometry,0,u.expect(S));w.push(new v.Feature(x.attributes,x.localId,A))}}}(G);return{features:w,objectIds:c}},t.prototype._getGeohashLevel=function(e){return Math.min(Math.ceil(e/2+2),12)},t.prototype._setGeohashLevel=function(e){var t=this,r=this._geohashLevel,o=this._getGeohashLevel(e),a=Math.floor(o/2),i=2*(a+1)-1,s=this._tree;this._geohashLevel=i,u.isNone(s)||(i>r?this._featuresById.forEach(function(e){e.geohashIndexed&&(s.insert(e,t._geohashLevel,r+1),e.geohashIndexed=!0)}):i<r&&s.dropLevels(this._geohashLevel))},t.prototype._insertIntoIndex=function(e){e.geohashIndexed||(this._invalidated=!0,e.geohashIndexed=!0,u.expect(this._tree).insert(e,this._geohashLevel))},t.prototype._removeFromIndex=function(e){e.geohashIndexed&&(this._invalidated=!0,u.expect(this._tree).remove(e,this._geohashLevel),e.geohashIndexed=!1)},t.prototype._handleClusterUpdates=function(){var e=this;this._invalidated&&this._clusters.size&&this._clusters.forEach(function(t){u.isSome(t)&&(t.invalid=t.invalid||e._invalidated)}),this._invalidated=!1},t.prototype._getTransforms=function(e,t){var r={originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]},a=d.getInfo(t);if(!a)return{tile:r,left:null,right:null};var i=a.valid,s=i[0],n=i[1];return{tile:r,left:o({},r,{translate:[n,e.bounds[3]]}),right:o({},r,{translate:[s-n+e.bounds[0],e.bounds[3]]})}},t.prototype._getClusterId=function(e,t,r){return(15&e)<<28|(16383&t)<<14|16383&r},t.prototype._markForDeletion=function(e,t,r){var o=this._getClusterId(e,t,r);if(this._clusters.has(o)){var a=this._clusters.get(o);u.isSome(a)?a.canDelete=!0:this._clusters.delete(o)}},t.prototype._getClusterBounds=function(e,t,r){if(u.isNone(this._featureReduction))return null;var o=this._featureReduction.clusterRadius,a=2*o,i=r%2?t*a:t*a+o,s=r*a,n=i/m.TILE_SIZE,l=s/m.TILE_SIZE,h=(i+a)/m.TILE_SIZE,c=(s-a)/m.TILE_SIZE;return[e.getXForColumn(n),e.getYForRow(l),e.getXForColumn(h),e.getYForRow(c)]},t.prototype._lookupCluster=function(e,t,r,a,i){var n,l;if(u.isNone(this._featureReduction)||u.isNone(this._tree))return null;var h=this._getClusterId(t,r,a),d=this._clusters.get(h);if(d&&u.isSome(d)&&!d.invalid&&!d.canDelete)return d;var f=this._getClusterBounds(e,r,a),p=f[0],_=f[1],v=f[2],I=f[3],m={x:p,y:_},x={x:v,y:I},b=0,R=0,L=0,T=0;if(this._spatialReference.isWebMercator)n=g.xyToLngLat(m.x,m.y),b=n[0],R=n[1],l=g.xyToLngLat(x.x,x.y),L=l[0],T=l[1];else{var E=y.project(m,this._spatialReference,s.SpatialReference.WGS84),F=y.project(x,this._spatialReference,s.SpatialReference.WGS84);if(!E||!F)return null;b=E.x,R=E.y,L=F.x,T=F.y}var C={geohashX:0,geohashY:0},w={geohashX:0,geohashY:0};c.setGeohashXY(C,R,b,i),c.setGeohashXY(w,T,L,i);var V=C.geohashX,j=C.geohashY,M=w.geohashX,G=w.geohashY,k={xLL:V,yLL:j,xTR:M,yTR:G,level:i},D=this._tree.getRegionStatistics(V,j,M,G,i),X=D.count,Y=D.xTotal,B=D.yTotal,N=X?Y/X:0,Z=X?B/X:0;if(u.isSome(d)&&d.canDelete){var O=this._attributeStore.removeLocalId(d.objectId);this._deferredDeletionQueue.push(O)}var U=u.isSome(d)&&!d.canDelete&&d.invalid,W=o({cluster_count:X},D.attributes),A=this._attributeStore,H=U?d.update(N,Z,t,W,k):S.create(A,h,N,Z,t,W,k);return 0===X&&(H.geometry.coords[0]=(p+v)/2,H.geometry.coords[1]=(_+I)/2),this._attributeStore.setAttributeData(H.localId,H,this.geometryInfo,null),this._clusters.set(h,H),this._updateAggregateValueRangeForCluster(H,H.tileLevel),H},t.prototype._updateAggregateValueRangeForCluster=function(e,t){var r=this._aggregateValueRanges[t]||{minValue:1/0,maxValue:0},o=r.minValue,a=r.maxValue;r.minValue=Math.min(o,e.count),r.maxValue=Math.max(a,e.count),this._aggregateValueRanges[t]=r,o===r.minValue&&a===r.maxValue||(this._aggregateValueRangesChanged=!0)},t.prototype._markTileClustersForDeletion=function(e,t){for(var r=2*t,o=Math.ceil(m.TILE_SIZE/r),a=e.key,i=a.row,s=a.col,n=s*m.TILE_SIZE,u=i*m.TILE_SIZE,l=Math.floor(n/r),h=Math.floor(u/r),c=l;c<l+o;c++)for(var d=h;d<h+o;d++)this._markForDeletion(e.key.level,c,d)},t.prototype._setGeohash=function(e){var t=e.geometry;if(t&&t.coords.length){var r={x:t.coords[0],y:t.coords[1]},o=y.project(r,this._spatialReference,s.SpatialReference.WGS84);if(!o)return void(n("esri-2d-debug")&&console.debug("Tried to project feature geometry, but got back `null`"));c.setGeohashXY(e,o.y,o.x,12)}},t.prototype._add=function(t){var r=this._featuresById.get(t.objectId);e.prototype._add.call(this,t),u.isSome(this._featureReduction)&&u.isSome(this._tree)&&(r?(t.geohashIndexed=r.geohashIndexed,t.geohashX=r.geohashX,t.geohashY=r.geohashY):this._setGeohash(t),!t.geohashIndexed&&this._attributeStore.isVisible(t)&&this._insertIntoIndex(t))},t.prototype._remove=function(t){return u.isSome(this._featureReduction)&&u.isSome(this._tree)&&this._removeFromIndex(t),e.prototype._remove.call(this,t)},t}(_.default);t.ClusterStore=b});