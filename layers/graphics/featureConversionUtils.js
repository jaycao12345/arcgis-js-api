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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../core/Error","../../core/Logger","../../geometry/support/jsonUtils","./OptimizedFeature","./OptimizedFeatureSet","./OptimizedGeometry"],function(e,r,t,n,o,a,s,u){function i(e,r){return e?r?4:3:r?3:2}function l(e,r){var t=e.scale,n=e.translate;return Math.round((r-n[0])/t[0])}function h(e,r){var t=e.scale,n=e.translate;return Math.round((n[1]-r)/t[1])}function c(e,r){var t=e.scale,n=e.translate;return r*t[0]+n[0]}function g(e,r){var t=e.scale;return e.translate[1]-r*t[1]}function d(e,r,t){return e?r?t?M(e):v(e):t?p(e):f(e):null}function f(e){var r=e.coords;return{x:r[0],y:r[1]}}function m(e,r){return e.coords[0]=r.x,e.coords[1]=r.y,e}function v(e){var r=e.coords;return{x:r[0],y:r[1],z:r[2]}}function y(e,r){return e.coords[0]=r.x,e.coords[1]=r.y,e.coords[2]=r.z,e}function p(e){var r=e.coords;return{x:r[0],y:r[1],m:r[2]}}function I(e,r){return e.coords[0]=r.x,e.coords[1]=r.y,e.coords[2]=r.m,e}function M(e){var r=e.coords;return{x:r[0],y:r[1],z:r[2],m:r[3]}}function b(e,r){return e.coords[0]=r.x,e.coords[1]=r.y,e.coords[2]=r.z,e.coords[3]=r.m,e}function F(e,r,t,n){var o=f;t&&n?o=M:t?o=v:n&&(o=p);for(var a=0,s=r;a<s.length;a++){var u=s[a],i=u.geometry,l=u.attributes,h=i?o(i):null;e.push({attributes:l,geometry:h})}return e}function N(e,r){return e&&r?b:e?y:r?I:m}function T(e,r,t,n,o){for(var s=N(t,n),i=0,l=r;i<l.length;i++){var h=l[i],c=h.geometry,g=h.attributes,d=void 0;c&&(d=s(new u.default,c)),e.push(new a.default(d,g,null,g[o]))}return e}function w(e,r,t){return void 0===t&&(t=N(null!=r.z,null!=r.m)),t(e,r)}function G(e,r,t,n){for(var o=0,a=r;o<a.length;o++){var s=a[o],u=s.geometry,i=s.attributes,l=void 0;u&&(l=z(u,t,n)),e.push({attributes:i,geometry:l})}return e}function z(e,r,t){if(!e)return null;for(var n=i(r,t),o=[],a=0;a<e.coords.length;a+=n){for(var s=[],u=0;u<n;u++)s.push(e.coords[a+u]);o.push(s)}return r?t?{points:o,hasZ:r,hasM:t}:{points:o,hasZ:r}:t?{points:o,hasM:t}:{points:o}}function P(e,r,t,n,o){for(var s=i(t,n),l=0,h=r;l<h.length;l++){var c=h[l],g=c.geometry,d=c.attributes,f=void 0;g&&(f=x(new u.default,g,s)),e.push(new a.default(f,d,null,d[o]))}return e}function x(e,r,t){void 0===t&&(t=i(r.hasZ,r.hasM)),e.lengths[0]=r.points.length;for(var n=e.coords,o=0,a=0,s=r.points;a<s.length;a++)for(var u=s[a],l=0;l<t;l++)n[o++]=u[l];return e}function Z(e,r,t,n){for(var o=0,a=r;o<a.length;o++){var s=a[o],u=s.geometry,i=s.attributes,l=void 0;u&&(l=O(u,t,n)),e.push({attributes:i,geometry:l})}return e}function O(e,r,t){if(!e)return null;for(var n=i(r,t),o=e.coords,a=e.lengths,s=[],u=0,l=0,h=a;l<h.length;l++){for(var c=h[l],g=[],d=0;d<c;d++){for(var f=[],m=0;m<n;m++)f.push(o[u++]);g.push(f)}s.push(g)}return r?t?{paths:s,hasZ:r,hasM:t}:{paths:s,hasZ:r}:t?{paths:s,hasM:t}:{paths:s}}function E(e,r,t,n,o){for(var s=i(t,n),l=0,h=r;l<h.length;l++){var c=h[l],g=c.geometry,d=c.attributes,f=void 0;g&&(f=S(new u.default,g,s)),e.push(new a.default(f,d,null,d[o]))}return e}function S(e,r,t){void 0===t&&(t=i(r.hasZ,r.hasM));for(var n=e.lengths,o=e.coords,a=0,s=0,u=r.paths;s<u.length;s++){for(var l=u[s],h=0,c=l;h<c.length;h++)for(var g=c[h],d=0;d<t;d++)o[a++]=g[d];n.push(l.length)}return e}function j(e,r,t,n){for(var o=0,a=r;o<a.length;o++){var s=a[o],u=s.geometry,i=s.attributes,l=s.centroid,h=void 0;if(u&&(h=Y(u,t,n)),l){var c=f(l);e.push({attributes:i,centroid:c,geometry:h})}else e.push({attributes:i,geometry:h})}return e}function Y(e,r,t){if(!e)return null;for(var n=i(r,t),o=e.coords,a=e.lengths,s=[],u=0,l=0,h=a;l<h.length;l++){for(var c=h[l],g=[],d=0;d<c;d++){for(var f=[],m=0;m<n;m++)f.push(o[u++]);g.push(f)}s.push(g)}return r?t?{rings:s,hasZ:r,hasM:t}:{rings:s,hasZ:r}:t?{rings:s,hasM:t}:{rings:s}}function _(e,r,t,n,o){for(var s=0,i=r;s<i.length;s++){var l=i[s],h=l.geometry,c=l.centroid,g=l.attributes,d=void 0;h&&(d=k(new u.default,h,t,n)),c?e.push(new a.default(d,g,m(new u.default,c),g[o])):e.push(new a.default(d,g,null,g[o]))}return e}function k(e,r,t,n){void 0===t&&(t=r.hasZ),void 0===n&&(n=r.hasM);var o=i(t,n),a=e.lengths,s=e.coords,u=0;a.length=s.length=0;for(var l=0,h=r.rings;l<h.length;l++){for(var c=h[l],g=0,d=c;g<d.length;g++)for(var f=d[g],m=0;m<o;m++)s[u++]=f[m];a.push(c.length)}return e}function V(e,r,t,n,o){ue[0]=e;var a=q(ie,ue,r,t,n,o)[0];return ue.length=ie.length=0,a}function q(e,r,n,o,s,u){if(e.length=0,!n){for(var i=0,l=r;i<l.length;i++){var h=l[i],c=h.attributes[u];e.push(new a.default(null,h.attributes,null,c))}return e}switch(n){case"esriGeometryPoint":return T(e,r,o,s,u);case"esriGeometryMultipoint":return P(e,r,o,s,u);case"esriGeometryPolyline":return E(e,r,o,s,u);case"esriGeometryPolygon":return _(e,r,o,s,u);default:te.error("convertToFeatureSet:unknown-geometry",new t("Unable to parse unknown geometry type '"+n+"'")),e.length=0}return e}function L(e,r,t,n){ie[0]=e,A(ue,ie,r,t,n);var o=ue[0];return ue.length=ie.length=0,o}function R(e,r,n){if(!e)return null;var a=new u.default;if("hasZ"in e&&null==r&&(r=e.hasZ),"hasM"in e&&null==n&&(n=e.hasM),o.isPoint(e)){return N(null!=r?r:null!=e.z,null!=n?n:null!=e.m)(a,e)}return o.isPolygon(e)?k(a,e,r,n):o.isPolyline(e)?S(a,e,i(r,n)):o.isMultipoint(e)?x(a,e,i(r,n)):void te.error("convertFromGeometry:unknown-geometry",new t("Unable to parse unknown geometry type '"+e+"'"))}function U(e,r,n,o){var a=e&&("coords"in e?e:e.geometry);if(!a)return null;switch(r){case"esriGeometryPoint":var s=f;return n&&o?s=M:n?s=v:o&&(s=p),s(a);case"esriGeometryMultipoint":return z(a,n,o);case"esriGeometryPolyline":return O(a,n,o);case"esriGeometryPolygon":return Y(a,n,o);default:te.error("convertToGeometry:unknown-geometry",new t("Unable to parse unknown geometry type '"+r+"'"))}}function A(e,r,n,o,a){switch(e.length=0,n){case"esriGeometryPoint":return F(e,r,o,a);case"esriGeometryMultipoint":return G(e,r,o,a);case"esriGeometryPolyline":return Z(e,r,o,a);case"esriGeometryPolygon":return j(e,r,o,a);default:te.error("convertToFeatureSet:unknown-geometry",new t("Unable to parse unknown geometry type '"+n+"'"))}return e}function B(e){var r=e.objectIdFieldName,t=e.spatialReference,n=e.transform,o=e.fields,a=e.hasM,s=e.hasZ,u=e.features,i=e.geometryType,l=e.exceededTransferLimit,h=A([],u,i,s,a),c={features:h,fields:o,geometryType:i,objectIdFieldName:r,spatialReference:t};return n&&(c.transform=n),l&&(c.exceededTransferLimit=l),a&&(c.hasM=a),s&&(c.hasZ=s),c}function X(e,r){var n=new s.default,o=e.hasM,a=e.hasZ,u=e.features,i=e.objectIdFieldName,l=e.spatialReference,h=e.geometryType,c=e.exceededTransferLimit,g=e.transform;return n.fields=e.fields,n.geometryType=h,n.objectIdFieldName=i||r,n.spatialReference=l,n.objectIdFieldName?(u&&q(n.features,u,h,a,o,n.objectIdFieldName),c&&(n.exceededTransferLimit=c),o&&(n.hasM=o),a&&(n.hasZ=a),g&&(n.transform=g),n):(te.error(new t("optimized-features:invalid-objectIdFieldName","objectIdFieldName is missing")),n)}function C(e){var r=e.transform,t=e.features,n=e.hasM,o=e.hasZ;if(!r)return e;for(var a=0,s=t;a<s.length;a++){var u=s[a];u.geometry&&re(u.geometry,u.geometry,n,o,r),u.centroid&&re(u.centroid,u.centroid,n,o,r)}return e.transform=null,e}function Q(e,r){var t=r.geometryType,n=r.features,o=r.hasM,s=r.hasZ;if(!e)return r;for(var i=0;i<n.length;i++){var l=n[i],h=new a.default(new u.default,l.attributes);D(h.geometry,l.geometry,o,s,t,e),l.centroid&&(h.centroid=new u.default,D(h.centroid,l.centroid,o,s,"esriGeometryPoint",e)),n[i]=h}return r.transform=e,r}function D(e,r,t,n,o,a){if(e.lengths.length&&(e.lengths.length=0),e.coords.length&&(e.coords.length=0),!r||!r.coords.length)return null;var s=ne[o],u=r.coords,c=r.lengths,g=i(t,n),d=t?n?se:ae:n?ae:oe;if(!c.length)return d(e.coords,u,0,0,l(a,u[0]),h(a,u[1])),e.lengths.length&&(e.lengths.length=0),e.coords.length=g,e;for(var f,m,v,y,p=0,I=0,M=I,b=0,F=c;b<F.length;b++){var N=F[b];if(!(N<s)){var T=0;I=M,v=f=l(a,u[p]),y=m=h(a,u[p+1]),d(e.coords,u,I,p,v,y),T++,p+=g,I+=g;for(var w=1;w<N;w++,p+=g)v=l(a,u[p]),y=h(a,u[p+1]),v===f&&y===m||(d(e.coords,u,I,p,v-f,y-m),I+=g,T++,f=v,m=y);T>=s&&(e.lengths.push(T),M=I)}}return e.coords.length=M,e.coords.length?e:null}function H(e,r,t,n,o,a){if(e.lengths.length&&(e.lengths.length=0),e.coords.length&&(e.coords.length=0),!r||!r.coords.length)return null;var s=ne[o],u=r.coords,c=r.lengths,g=i(t,n),d=t?n?se:ae:n?ae:oe;if(!c.length)return d(e.coords,u,0,0,l(a,u[0]),h(a,u[1])),e.lengths.length&&(e.lengths.length=0),e.coords.length=g,e;for(var f,m,v,y,p=0,I=0,M=I,b=0,F=c;b<F.length;b++){var N=F[b];if(!(N<s)){var T=0;I=M,v=f=l(a,u[p]),y=m=h(a,u[p+1]),d(e.coords,u,I,p,v,y),T++,p+=g;for(var w=!1,G=0,z=0,P=1;P<N;P++,p+=g)if(v=l(a,u[p]),y=h(a,u[p+1]),v!==f||y!==m){var x=v-f,Z=y-m;w&&(0===G&&0===x||0===z&&0===Z)?(G+=x,z+=Z,d(e.coords,u,I,p,G,z)):(w=!0,G=x,z=Z,I+=g,T++,d(e.coords,u,I,p,G,z)),f=v,m=y}w&&(I+=g,d(e.coords,u,I,p,G,z)),T>=s&&(e.lengths.push(T),M=I)}}return e.coords.length!==M&&(e.coords.length=M),e.coords.length?e:null}function J(e,r,t,n,o,a){if(e.lengths.length&&(e.lengths.length=0),e.coords.length&&(e.coords.length=0),!r||!r.coords.length)return null;var s=ne[o],u=r.coords,l=r.lengths,h=i(t,n),c=t?n?se:ae:n?ae:oe;if(!l.length)return c(e.coords,u,0,0,u[0],u[1]),e.lengths.length&&(e.lengths.length=0),e.coords.length=h,e;for(var g=0,d=0,f=l;d<f.length;d++){var m=f[d];if(m<s)g+=m*h;else{var v=e.coords.length/h;W(e.coords,u,h,a,c,g,g+m*h);var y=e.coords.length/h-v;y>=s?e.lengths.push(y):e.coords.length=v*h,g+=m*h}}return e.coords.length?e:null}function K(e,r,t,n){var o=e[r],a=e[r+1],s=e[t],u=e[t+1],i=e[n],l=e[n+1];if(s===i)return Math.abs(o-s);var h=(l-u)/(i-s),c=u-h*s;return Math.abs(h*o-a+c)/Math.sqrt(h*h+1)}function W(e,r,t,n,o,a,s){for(var u,i=a,l=s-t,h=0,c=0,g=a+t;g<s-t;g+=t)(u=K(r,g,i,l))>h&&(c=g,h=u);h>n?(W(e,r,t,n,o,a,c+t),W(e,r,t,n,o,c,s)):(o(e,r,e.length,i,r[i],r[i+1]),o(e,r,e.length,l,r[l],r[l+1]))}function $(e,r,t,n){var o=i(t,n),a=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY,l=Number.NEGATIVE_INFINITY;if(r&&r.coords)for(var h=r.coords,c=0;c<h.length;c+=o){var g=h[c],d=h[c+1];a=Math.min(a,g),u=Math.max(u,g),s=Math.min(s,d),l=Math.max(l,d)}return e[0]=a,e[1]=s,e[2]=u,e[3]=l,e}function ee(e,r,t,n){for(var o=i(t,n),a=r.lengths,s=r.coords,u=Number.POSITIVE_INFINITY,l=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY,c=Number.NEGATIVE_INFINITY,g=0,d=0,f=a;d<f.length;d++){var m=f[d],v=s[g],y=s[g+1];u=Math.min(v,u),l=Math.min(y,l),h=Math.max(v,h),c=Math.max(y,c),g+=o;for(var p=1;p<m;p++,g+=o){var I=s[g],M=s[g+1];v+=I,y+=M,I<0&&(u=Math.min(u,v)),I>0&&(h=Math.max(h,v)),M<0?l=Math.min(l,y):M>0&&(c=Math.max(c,y))}}return e[0]=u,e[1]=l,e[2]=h,e[3]=c,e}function re(e,r,t,n,o){var a=r.coords,s=r.lengths,u=t?n?se:ae:n?ae:oe,l=i(t,n);if(!a.length)return e!==r&&(e.lengths.length=0,e.coords.length=0),e;if(!s.length)return u(e.coords,a,0,0,c(o,a[0]),g(o,a[1])),e!==r&&(e.lengths.length=0,e.coords.length=l),e;for(var h=o.scale,d=h[0],f=h[1],m=0,v=0;v<s.length;v++){var y=s[v];e.lengths[v]=y;var p=c(o,a[m]),I=g(o,a[m+1]);u(e.coords,a,m,m,p,I),m+=l;for(var M=1;M<y;M++,m+=l)p+=a[m]*d,I-=a[m+1]*f,u(e.coords,a,m,m,p,I)}return e!==r&&(e.lengths.length=s.length,e.coords.length=a.length),e}Object.defineProperty(r,"__esModule",{value:!0});var te=n.getLogger("esri.tasks.support.optimizedFeatureSet"),ne={esriGeometryPoint:0,esriGeometryPolyline:2,esriGeometryPolygon:3,esriGeometryMultipoint:0},oe=function(e,r,t,n,o,a){e[t]=o,e[t+1]=a},ae=function(e,r,t,n,o,a){e[t]=o,e[t+1]=a,e[t+2]=r[n+2]},se=function(e,r,t,n,o,a){e[t]=o,e[t+1]=a,e[t+2]=r[n+2],e[t+3]=r[n+3]};r.quantizeX=l,r.quantizeY=h,r.hydrateX=c,r.hydrateY=g,r.convertToPoint=d,r.convertFromPoint=w,r.convertToMultipoint=z,r.convertFromMultipoint=x,r.convertToPolyline=O,r.convertToPolygon=Y,r.convertFromPolygon=k;var ue=[],ie=[];r.convertFromFeature=V,r.convertFromFeatures=q,r.convertToFeature=L,r.convertFromGeometry=R,r.convertToGeometry=U,r.convertToFeatures=A,r.convertToFeatureSet=B,r.convertFromFeatureSet=X,r.hydrateOptimizedFeatureSet=C,r.quantizeOptimizedFeatureSet=Q,r.quantizeOptimizedGeometry=D,r.quantizeOptimizedGeometryRemoveCollinear=H,r.generalizeOptimizedGeometry=J,r.getBoundsOptimizedGeometry=$,r.getQuantizedBoundsOptimizedGeometry=ee,r.hydrateOptimizedGeometry=re});