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

define(["require","exports","../../lib/glMatrix","../../support/earthUtils","../../support/projectionUtils","../../../../core/urlUtils","../../../../core/requireUtils","../../../../core/promiseUtils","dojo/_base/lang","dojo/promise/all","../../../../request","../../webgl-engine/Stage","../../webgl-engine/materials/Material","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/Layer","../../webgl-engine/lib/BufferVectorMath","../../webgl-engine/lib/Util","./I3SBinaryReader"],function(e,t,r,n,a,i,o,u,s,d,l,c,f,g,p,y,b,h,v,m){function T(e){return"/"!==e[e.length-1]&&(e+="/"),e}function w(e,t){return i.isAbsoluteUrl(t)?t:i.join(e,t)}function M(e){return e&&parseInt(e.substring(e.lastIndexOf("/")+1,e.length),10)}function I(e,r){if(Array.isArray(e)){if(r){var n=e.indexOf(t.DDS_ENCODING_STRING);if(n>-1)return n}for(var a=0;a<e.length;a++)if(t.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS.indexOf(e[a])>-1)return a;throw new Error("Could not find appropriate texture encoding (among "+e.toString()+")")}return-1}function E(e,t,r,n,i,o){if(null!=r){var u=P;if(a.mbsToMbs(r.mbs,n,u,t),0!==this.intersectBoundingBoxWithMbs(e,u)){o.push(r);for(var s=null!=r.children?r.children.length:0,d=0;s>d;d++){var l=i[r.children[d].id];this.findIntersectingNodes(e,t,l,n,i,o)}}}}function A(e,t){var r=t[0],n=t[1],a=t[2],i=t[3],o=0;if(r<e[0]){var u=e[0]-r;o+=u*u}if(n<e[1]){var u=e[1]-n;o+=u*u}if(a<e[2]){var u=e[2]-a;o+=u*u}if(r>e[3]){var u=r-e[3];o+=u*u}if(n>e[4]){var u=n-e[4];o+=u*u}if(a>e[5]){var u=a-e[5];o+=u*u}if(o>i*i)return 0;if(o>0)return 1;var s=1/0;return r-e[0]<s&&(s=r-e[0]),n-e[1]<s&&(s=n-e[1]),a-e[2]<s&&(s=a-e[2]),e[3]-r<s&&(s=e[3]-r),e[4]-n<s&&(s=e[4]-n),e[5]-a<s&&(s=e[5]-a),s>i?2:1}function R(e,t){for(var r=h.Vec3Compact.subtract,n=e.map(function(e){return e.indices.position.length/3}).reduce(function(e,t){return e+t}),a=new Float32Array(3*n),i=t.position.data,o=0,u=0;u<e.length;u++){for(var s=e[u].indices.position,d=new Uint32Array(s.length),l=0;l<s.length;l+=3){r(i,3*s[l],i,3*s[l+1],F,0),r(i,3*s[l],i,3*s[l+2],x,0),j.cross(x,F),j.normalize(x);var c=o/3;a[o++]=x[0],a[o++]=x[1],a[o++]=x[2],d[l]=c,d[l+1]=c,d[l+2]=c}e[u].indices.normal=d}t.normal.data=a}function S(e,t,r){function i(e){return{ambient:e,diffuse:[0,0,0],transparent:!0,opacity:.5,blendModeOneOne:!1}}var o=new g(p.createCylinderGeometry(1,1,64,[0,0,1],[0,0,0],!1),"debugCylinder"),u=new g(p.createSphereGeometry(1),"debugSphere"),s={red:new f(i([.8,0,0]),"debugMaterialRed"),grey:new f(i([.4,.4,.4]),"debugMaterialGrey"),brown:new f(i([.2,.1,0]),"debugMaterialBrown"),green:new f(i([0,.8,0]),"debugMaterialGreen"),blue:new f(i([0,0,.8]),"debugMaterialBlue"),yellow:new f(i([.8,.8,0]),"debugMaterialYellow"),magenta:new f(i([.8,0,.8]),"debugMaterialMagenta")};for(var d in s)e.add(c.ModelContentType.MATERIAL,s[d]);e.add(c.ModelContentType.GEOMETRY,o);var l=new b(r+"_debug",{interaction:"IGNORED"},r+"_debug");e.add(c.ModelContentType.LAYER,l),e.addToViewContent([l.getId()]);var h=j.create(),v=D.create();return{engineLayer:l,added:{},show:function(e,r,i){var u=e.computedMbs;u||(u=B.create(),a.mbsToMbs(e.mbs,r,u,t.spatialReference));var d="node"+e.id+"dbg";j.set(u,h);var l=u[3];if(l>n.earthRadius/10&&t.spatialReference===a.SphericalRenderSpatialReference){this.showWS(h,Math.max(.01*l,1e4),i,d+"_center");var c=j.length(h),f=n.earthRadius;if(f+l>c){var g=(c*c+f*f-l*l)/(2*c);j.scale(h,g/c),l=Math.sqrt(f*f-g*g)}}D.identity(v),D.scale(v,[l,l,.05*l]);var p=s[i];L(p);var b=new y({name:d,geometries:[o],materials:[[p]],transformations:[v],castShadow:!1,idHint:d});a.computeLinearTransformation(r,e.mbs,v,t.spatialReference),null!=h&&(v[12]=h[0],v[13]=h[1],v[14]=h[2]),b.setObjectTransformation(v),this._addToStage(b,d)},showWS:function(e,t,r,n){var a=D.identity();D.scale(a,[t,t,t]);var i=s[r];L(i);var o=new y({name:n,geometries:[u],materials:[[i]],transformations:[a],castShadow:!1,idHint:n}),d=D.identity();D.translate(d,e),o.setObjectTransformation(d),this._addToStage(o,n)},_addToStage:function(t,r){e.add(c.ModelContentType.OBJECT,t),this.engineLayer.addObject(t);var n=this.added[r];void 0!==n&&(e.remove(c.ModelContentType.OBJECT,n.getId()),this.engineLayer.removeObject(n)),this.added[r]=t},clear:function(){for(var t in this.added){var r=this.added[t];e.remove(c.ModelContentType.OBJECT,r.getId()),this.engineLayer.removeObject(r)}this.added={}},dispose:function(){this.clear();for(var t in s)e.remove(c.ModelContentType.MATERIAL,s[t].getId());e.remove(c.ModelContentType.GEOMETRY,o.getId()),e.remove(c.ModelContentType.LAYER,this.engineLayer.getId())}}}function C(e,t,r){var n=new XMLHttpRequest;n.open("PUT","/put.php"+e,!0),n.setRequestHeader("Content-type",r),n.send(t)}function O(e,t,r,n,a){var i=n.filter(function(e){return!t.attributes.hasOwnProperty(e)});if(0===i.length)return u.resolve(t);var o=function(e){return s.mixin(t.attributes,e),t},d=e.companionFeatureLayer,l=e.attributeStorageInfo;if(d)return U(d,r,i).then(o);if(l){var c=a();if(null!=c)return _(l,c.node,c.index,i).then(o)}return u.reject()}function U(t,r,n){return void 0===n&&(n=["*"]),t?o.when(e,["../../../../tasks/support/Query","../../../../tasks/QueryTask"]).then(function(e){var a=e[0],i=e[1],o=new a({objectIds:[r],outFields:n}),u=new i(t.parsedUrl.path);return u.execute(o)}).then(function(e){return e&&e.features&&e.features.length>0?e.features[0].attributes:u.reject(new Error("Feature not found in companion feature layer."))}):u.reject(new Error("Companion feature layer not present."))}function _(e,t,r,n){void 0===n&&(n=["*"]);var a=n.some(function(e){return"*"===e});return d(t.attributeData.map(function(r,i){if(!a&&!n.some(function(t){return e[i].name===t}))return u.resolve(null);var o=w(t.baseUrl,r.href);return l(o,{responseType:"array-buffer"}).then(function(t){return m.readBinaryAttribute(e[i],t.data)}).otherwise(function(){return null})})).then(function(t){for(var n={},a=0;a<t.length;a++)null!=t[a]&&(n[e[a].name]=t[a][r]);return n})}function G(e){return t.valueType2TypedArrayClassMap.hasOwnProperty(e)}function N(e){return G(e)&&t.valueType2TypedArrayClassMap[e].BYTES_PER_ELEMENT}var B=r.vec4d,j=r.vec3d,D=r.mat4d,L=v.assert,x=j.create(),F=j.create(),P=B.create();t.DDS_ENCODING_STRING="image/vnd-ms.dds",t.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS=["image/jpeg","image/png"],t.addTrailingSlash=T,t.concatUrl=w,t.extractWkid=M,t.getAppropriateTextureEncoding=I,t.findIntersectingNodes=E,t.intersectBoundingBoxWithMbs=A,t.recomputeNormals=R,t.makeNodeDebugVisualizer=S,t.postData=C,t.whenGraphicAttributes=O,t.queryAttributesFromFeatureLayer=U,t.queryAttributesFromCachedAttributes=_,t.valueType2TypedArrayClassMap={Float32:Float32Array,Float64:Float64Array,UInt8:Uint8Array,Int8:Int8Array,UInt16:Uint16Array,Int16:Int16Array,UInt32:Uint32Array,Int32:Int32Array},t.isValueType=G,t.getBytesPerValue=N});