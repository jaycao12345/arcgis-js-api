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

define(["dojo/_base/array","dojo/_base/lang","../core/declare","../core/lang","./SpatialReference","./Geometry","./Point","./Extent","./support/coordsUtils","./support/mathUtils","./support/webMercatorUtils"],function(e,n,t,i,r,s,a,h,l,o,c){var f=function(e){return function(n,t){return null==n?t:null==t?n:e(n,t)}},u=f(Math.min),g=f(Math.max),p="number",m=t(s,{declaredClass:"esri.geometry.Polygon",classMetadata:{properties:{cache:{dependsOn:["hasM","hasZ","rings"]},extent:{dependsOn:["cache"]},centroid:{dependsOn:["cache"]},isSelfIntersecting:{dependsOn:["cache"]}}},type:"polygon",getDefaults:function(){return{rings:[]}},normalizeCtorArgs:function(e,n){var t=null,i=void 0,s=void 0,a=null;return e&&!Array.isArray(e)?(t=e.rings?e.rings:null,n||(e.spatialReference?n=e.spatialReference:e.rings||(n=e)),i=e.hasZ,s=e.hasM):t=e,t=t||[],n=n||r.WGS84,t.length&&t[0]&&null!=t[0][0]&&typeof t[0][0]==p&&(t=[t]),a=t[0]&&t[0][0],a&&(void 0===i&&void 0===s?(i=a.length>2,s=!1):void 0===i?i=!s&&a.length>3:void 0===s&&(s=!i&&a.length>3)),{rings:t,spatialReference:n,hasZ:i,hasM:s}},_ring:0,_centroidGetter:function(e){var n=l.centroid([],this.rings,this.hasZ);return isNaN(n[0])||isNaN(n[1])||this.hasZ&&isNaN(n[2])?null:(e=e||new a,e.x=n[0],e.y=n[1],e.spatialReference=this.spatialReference,this.hasZ&&(e.z=n[2]),e)},_extentGetter:function(e){var n=this.rings,t=n.length;if(!t||!n[0].length)return null;var i,r,s,a,l,o,c,f,p,m,d,v,x,y,R,M,_,Z,w,A,z,P,I,C=c=n[0][0][0],O=f=n[0][0][1],N=this.spatialReference,b=[],S=this.hasZ,G=this.hasM,E=S?3:2;for(d=0;t>d;d++){for(i=n[d],M=_=i[0]&&i[0][0],Z=w=i[0]&&i[0][1],x=i.length,A=z=void 0,P=I=void 0,v=0;x>v;v++)r=i[v],s=r[0],a=r[1],C=u(C,s),O=u(O,a),c=g(c,s),f=g(f,a),M=u(M,s),Z=u(Z,a),_=g(_,s),w=g(w,a),S&&r.length>2&&(l=r[2],y=u(y,l),p=g(p,l),A=u(A,l),z=g(z,l)),G&&r.length>E&&(o=r[E],R=u(y,o),m=g(p,o),P=u(A,o),I=g(z,o));b.push(new h({xmin:M,ymin:Z,zmin:A,mmin:P,xmax:_,ymax:w,zmax:z,mmax:I,spatialReference:N}))}var j=e||new h;return j.xmin=C,j.ymin=O,j.xmax=c,j.ymax=f,j.spatialReference=N,S&&(j.zmin=y,j.zmax=p),G&&(j.mmin=R,j.mmax=m),j._partwise=b.length>1?b:null,j},_isSelfIntersectingGetter:function(){var e,n,t,i,r,s,a,h,l,c,f=this.rings,u=f.length;for(i=0;u>i;i++){for(e=f[i],n=0;n<e.length-1;n++)for(s=[[e[n][0],e[n][1]],[e[n+1][0],e[n+1][1]]],t=i+1;u>t;t++)for(r=0;r<f[t].length-1;r++)if(a=[[f[t][r][0],f[t][r][1]],[f[t][r+1][0],f[t][r+1][1]]],h=o._getLineIntersection2(s,a),h&&!(h[0]===s[0][0]&&h[1]===s[0][1]||h[0]===a[0][0]&&h[1]===a[0][1]||h[0]===s[1][0]&&h[1]===s[1][1]||h[0]===a[1][0]&&h[1]===a[1][1]))return!0;if(l=e.length,!(4>=l))for(n=0;l-3>n;n++)for(c=l-1,0===n&&(c=l-2),s=[[e[n][0],e[n][1]],[e[n+1][0],e[n+1][1]]],t=n+2;c>t;t++)if(a=[[e[t][0],e[t][1]],[e[t+1][0],e[t+1][1]]],h=o._getLineIntersection2(s,a),h&&!(h[0]===s[0][0]&&h[1]===s[0][1]||h[0]===a[0][0]&&h[1]===a[0][1]||h[0]===s[1][0]&&h[1]===s[1][1]||h[0]===a[1][0]&&h[1]===a[1][1]))return!0}return!1},rings:null,addRing:function(e){if(e){this.clearCache();var n=this.rings,t=n.length;if(Array.isArray(e[0]))n[t]=e.concat();else{var i=[];n[t]=i;for(var r=0,s=e.length;s>r;r++)i[r]=e[r].toArray()}return this}},clone:function(){var e=new m;return e.spatialReference=this.spatialReference,e.rings=n.clone(this.rings),e.hasZ=this.hasZ,e.hasM=this.hasM,e},contains:function(e){return e?(c.canProject(e,this.spatialReference)&&(e=c.project(e,this.spatialReference)),l.contains(this.rings,l.fromGeom(e))):!1},isClockwise:function(e){var n,t,i,r,s=0,a=0,h=0,l=e.length,o=this.hasZ,c=this.hasM;for(n=0;l>n;n++)t=e[n],i=e[(n+1)%l],Array.isArray(t)?(s+=t[0]*i[1]-i[0]*t[1],r=2,t.length>2&&i.length>2&&o&&(a+=t[0]*i[2]-i[0]*t[2],r=3),t.length>r&&i.length>r&&c&&(h+=t[0]*i[r]-i[0]*t[r])):(s+=t.x*i.y-i.x*t.y,t.hasZ&&i.hasZ&&(a+=t.x*i.z-i.x*t.z),t.hasM&&i.hasM&&(h+=t.x*i.m-i.x*t.m));return 0>=s&&0>=a&&0>=h},getPoint:function(e,n){if(this._validateInputs(e,n)){var t=this.rings[e][n],i=this.hasZ,r=this.hasM;return i&&!r?new a(t[0],t[1],t[2],void 0,this.spatialReference):r&&i?new a(t[0],t[1],void 0,t[2],this.spatialReference):i&&r?new a(t[0],t[1],t[2],t[3],this.spatialReference):new a(t[0],t[1],this.spatialReference)}},insertPoint:function(e,n,t){return this._validateInputs(e)&&i.isDefined(n)&&n>=0&&n<=this.rings[e].length?(this.clearCache(),this.rings[e].splice(n,0,t),this):void 0},removePoint:function(e,n){return this._validateInputs(e,n)?(this.clearCache(),new a(this.rings[e].splice(n,1)[0],this.spatialReference)):void 0},removeRing:function(e){if(this._validateInputs(e,null)){this.clearCache();var n,t=this.rings.splice(e,1)[0],i=t.length,r=this.spatialReference;for(n=0;i>n;n++)t[n]=new a(t[n],r);return t}},setPoint:function(e,n,t){return this._validateInputs(e,n)?(this.clearCache(),Array.isArray(t)||(t=t.toArray()),this.rings[e][n]=t,this):void 0},toJSON:function(){var e=this.spatialReference,n={rings:this.rings,spatialReference:e&&e.toJSON()};return this.hasZ&&(n.hasZ=!0),this.hasM&&(n.hasM=!0),n},_insertPoints:function(n,t){this.clearCache(),this._ring=t,this.rings[this._ring]||(this.rings[this._ring]=[]),e.forEach(n,this._addPoint,this)},_validateInputs:function(e,n){return null!==e&&void 0!==e&&(0>e||e>=this.rings.length)?!1:null!==n&&void 0!==e&&(0>n||n>=this.rings[e].length)?!1:!0}});return m.createEllipse=function(e){var n,t,i,r,s=e.center.x,a=e.center.y,h=e.center.z,l=e.center.m,o=e.longAxis,c=e.shortAxis,f=e.numberOfPoints,u=e.map,g=[],p=2*Math.PI/f;for(t=0;f>t;t++)i=Math.cos(t*p),r=Math.sin(t*p),n=u.toMap({x:o*i+s,y:c*r+a}),null==h||n.hasZ||(n.z=h),null==l||n.hasM||(n.m=l),g.push(n);return g.push(g[0]),new m({rings:[g],spatialReference:u.spatialReference})},m.createCircle=function(e){var n={center:e.center,longAxis:e.r,shortAxis:e.r,numberOfPoints:e.numberOfPoints,map:e.map};return m.createEllipse(n)},m.fromExtent=function(n){var t=n.clone().normalize(),i=n.spatialReference,r=!1,s=!1;e.map(t,function(e){e.hasZ&&(r=!0),e.hasM&&(s=!0)});var a={rings:e.map(t,function(e){var n=[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]];if(r&&e.hasZ)for(var t=(e.zmax-e.zmin)/2,i=0;i<n.length;i++)n[i].push(t);if(s&&e.hasM){var a=(e.mmax-e.mmin)/2;for(i=0;i<n.length;i++)n[i].push(a)}return n}),spatialReference:i?i.toJSON():null};return r&&(a.hasZ=!0),s&&(a.hasM=!0),new m(a)},m});