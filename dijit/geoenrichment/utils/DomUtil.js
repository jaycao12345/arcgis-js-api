// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/string","dojo/domReady!"],function(e,n,t,o,r,i,d){function a(){return c||(c=o.create("div",{"class":"esriGEOffscreen"},document.body)),c}var l={};l.isHidden=function(e){return e&&t.contains(e,"esriGEHidden")},l.hasVisibleChildren=function(e){if(!e||!e.children.length)return!1;for(var n=0;n<e.children.length;n++)if(!l.isHidden(e.children[n]))return!0;return!1},l.hide=function(e){return l.addTag(e,"esriGEHidden")},l.show=function(e){return l.removeTag(e,"esriGEHidden")},l.addTag=function(e,n){return l.applyCallback(e,function(e){e&&t.add(e,n)})},l.removeTag=function(e,n){return l.applyCallback(e,function(e){e&&t.remove(e,n)})},l.applyCallback=function(n,t,o){return o&&(t=e.hitch(o,t)),Array.isArray(n)?n.forEach(t):t(n),n},l.enableContent=function(e,n,d){if(e){d=d||{};var a=e.children.length-1;if(!(0>a)){var l=e.children[a];if(t.contains(l,"esriGEDisabledContent")||(l=null),n)l&&e.removeChild(l);else if(l=l||o.create("div",{"class":"esriGEDisabledContent"+(d.overlayClass?" "+d.overlayClass:"")},e),d.fitParent!==!1){var c=r[d.marginBox?"getMarginBox":"getContentBox"](e).h;c&&(c=c.toString()+"px",i.set(l,{height:c,marginTop:"-"+c}))}return l}}},l.enableContentAbsolute=function(e,n,t){if(e){t=t||{};var o=i.get(e,"position");return"relative"!==o&&"absolute"!==o&&i.set(e,"position","relative"),l.enableContent(e,n,{overlayClass:"esriGEAbsoluteStretched "+(t.overlayClass||""),fitParent:!1})}},l.getChildIndex=function(e,n){if(!e||!e.children||!n)return-1;for(var t=0;t<e.children.length;t++)if(e.children[t]===n)return t;return-1},l.getChildren=function(e){if(!e||!e.children)return null;for(var n=[],t=0;t<e.children.length;t++)n.push(e.children[t]);return n},l.getChildNodes=function(e){if(!e||!e.childNodes)return null;for(var n=[],t=0;t<e.childNodes.length;t++)n.push(e.childNodes[t]);return n},l.isChildOf=function(e,n,t){var o=!1,r=function(e){return t&&!t(e)?!1:void(e.parentNode===n?o=!0:e.parentNode&&r(e.parentNode))};return e&&r(e),o},l.isNodeInLayout=function(e){return l.isChildOf(e,document.body,function(e){return!l.isHidden(e)&&"none"!=i.get(e,"display")})};var c;return l.hideNodeInBackground=function(e,t){if(e){if(e._hideNodeInBackgroundUndoController)return e._hideNodeInBackgroundUndoController;var r=o.create("div",null,e,"after"),i=o.create("div",{style:"position: absolute; left: 0px; top: 0px;"},a());o.place(e,i);var d="DomUtil.hideNodeInBackground"+(t?"."+t:"");n.set(r,"_bg_memo_node",d),n.set(i,"_bg_temp_node",d);var l={undo:function(){r&&(o.place(e,r,"replace"),o.destroy(r),o.destroy(i),r=null,delete e._hideNodeInBackgroundUndoController)}};return e._hideNodeInBackgroundUndoController=l,l}},l.showNodeFromBackground=function(e){e&&e._hideNodeInBackgroundUndoController&&e._hideNodeInBackgroundUndoController.undo()},l.position=function(e){function n(e){for(var n={x:0,y:0},t=e;t.offsetParent;)n.x+=t.offsetLeft,n.y+=t.offsetTop,t=t.offsetParent,n.x+=i.get(t,"borderLeftWidth"),n.y+=i.get(t,"borderTopWidth");return n}function t(e){return i.get(e,"width")+i.get(e,"paddingLeft")+i.get(e,"paddingRight")+i.get(e,"borderLeftWidth")+i.get(e,"borderRightWidth")}function o(e){return i.get(e,"height")+i.get(e,"paddingTop")+i.get(e,"paddingBottom")+i.get(e,"borderTopWidth")+i.get(e,"borderBottomWidth")}if(e){var r;if(e instanceof SVGElement&&e.getBBox){var d=e.ownerSVGElement&&e.ownerSVGElement.parentNode;r=d&&n(d);var a=e.getBBox();return{x:(a.x||0)+r.x,y:(a.y||0)+r.y,w:a.width||0,h:a.height||0}}return r=n(e),{x:r.x,y:r.y,w:t(e),h:o(e)}}},l.intersectNodeBoxes=function(e,n){var t=1e6,o=1e6,r=-1e6,i=-1e6;e.forEach(function(e){var n=l.position(e);t=Math.min(t,n.x),o=Math.min(o,n.y),r=Math.max(r,n.x+n.w),i=Math.max(i,n.y+n.h)});var d={x:t,y:o,w:r-t,h:i-o};if(n){var a=l.position(n);d.x-=a.x,d.y-=a.y}return d},l.getNodesBox=function(e){var n=1e6,t=-1e6,o=1e6,i=-1e6;return e.forEach(function(e){var d=r.position(e);n=Math.min(n,d.x),o=Math.min(o,d.y),t=Math.max(t,d.x+d.w),i=Math.max(i,d.y+d.h)}),{x:n,y:o,w:t-n,h:i-o}},l.traverseChildren=function(e,n){function t(e){if(e&&e.children)for(var o=0;o<e.children.length;o++){var r=e.children[o];if(n(r))return;t(r)}}t(e)},l.scrollToListNode=function(e,n,t){var o=n.offsetTop+n.clientHeight,r=e.scrollTop+e.clientHeight,i=o-r;i>0&&(e.scrollTop+=i),t&&(o-=n.clientHeight-t.offsetTop,i=e.scrollTop-o,i>0&&(e.scrollTop-=i))},l});