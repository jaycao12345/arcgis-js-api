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

define(["dojo/_base/array","dojo/sniff","../lib/glMatrix","../../../core/watchUtils","../webgl-engine/lib/Util","./NavigationConstants"],function(e,t,n,o,i,a){var u=function(c,r){function s(e){if(!(z&&!e.isPrimary||(e.preventDefault(),0===F||void 0===e.originalTouchEvent&&void 0!==typeof e.movementX&&void 0!==typeof e.movementY&&0===e.movementX&&0===e.movementY))){var t=g(e,_),n=F-1;switch(K){case 1:k("mouseDragLeft",t,n);break;case 2:k("mouseDragMiddle",t,n);break;case 3:case 0:k("mouseDragRight",t,n)}1!==F||0===Math.abs(t[0]-I[0])&&0===Math.abs(t[1]-I[1])?3===F&&(B&&window.clearTimeout(B),F=0,K=0,U(e)):F=2}}function l(e){(!z||e.isPrimary)&&(e.preventDefault(),T.focus(),I=g(e),B&&window.clearTimeout(B),N.stop(),F=1,K=e.which,1===K&&(X>0?(k("mouseClickDouble",g(e,_),2),X=0):X=Date.now()),W(e))}function d(e){if(!z||e.isPrimary){e.preventDefault();var t=g(e,_);1===F&&1===K?X>0&&setTimeout(function(){X>0&&(k("mouseClick",g(e,_)),X=0)},Math.max(b-(Date.now()-X),0)):X=0,2===F?(F=3,B=setTimeout(function(){if(3===F)switch(K){case 1:k("mouseDragLeft",t,2);break;case 2:k("mouseDragMiddle",t,2);break;case 3:case 0:k("mouseDragRight",t,2)}U(e),F=0,K=0},w)):(U(e),F=0,K=0)}}function m(e){e.preventDefault();var t=e.deltaY;switch(e.deltaMode){case 0:(P||y)&&(t=t/document.documentElement.clientHeight*600);break;case 1:t*=30;break;case 2:t*=900}0!==t&&k("mouseWheel",t,g(e,x))}function p(e){e.stopPropagation();var t=e.changedTouches,n=t[0],o="";if(!(e.touches.length>1)){var i;switch(e.type){case"touchstart":o="mousedown";break;case"touchmove":o="mousemove";break;case"touchend":o="mouseup",i=document.createEvent("MouseEvent"),i.initMouseEvent("click",!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(i),e.preventDefault();break;default:return}i=document.createEvent("MouseEvent"),i.initMouseEvent(o,!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.originalTouchEvent=e,n.target.dispatchEvent(i),e.preventDefault()}}function v(e){e.preventDefault()}function f(e){if(!(e.shiftKey||e.ctrlKey||e.altKey||e.metaKey)){var t=E[e.keyCode];void 0!==t&&(G[t](),e.preventDefault())}}function h(e){var t=E[e.keyCode];void 0!==t&&(t=V[t],void 0!==t&&t(),e.preventDefault())}function g(e,t){t||(t=L.create());var n=T.getBoundingClientRect();return t[0]=e.clientX-Math.round(n.left),t[1]=Math.round(n.height)-(e.clientY-Math.round(n.top)),t}function k(e,t,n){var o=r[e];void 0!==o&&H[o](t,n)}var D,b=200,w=100,E={37:"panLeft",38:"panForward",39:"panRight",40:"panBackward",66:"lookAround",74:"panDown",78:"lookNorth",80:"lookDown",85:"panUp"},L=n.vec2d,C=i.assert,R={down:"mousedown",move:"mousemove",up:"mouseup"},M={down:"pointerdown",move:"pointermove",up:"pointerup"},P=t("trident"),y=parseFloat(navigator.appVersion.split("Edge/")[1])||void 0,z=!!window.PointerEvent&&(P||y),A=!z,S=z?M:R,O=["touchmove","touchstart","touchend","touchcancel"],T=null,W=function(e){z?(T.setPointerCapture(e.pointerId),T.addEventListener(S.move,s,!0),T.addEventListener(S.up,d,!0)):(document.addEventListener(S.move,s,!0),document.addEventListener(S.up,d,!0))},U=function(e){z?(T.releasePointerCapture(e.pointerId),T.removeEventListener(S.move,s,!0),T.removeEventListener(S.up,d,!0)):(document.removeEventListener(S.move,s,!0),document.removeEventListener(S.up,d,!0))};this.connect=function(){T=c.get("canvas"),T&&(T.style.touchAction="none",A&&e.forEach(O,function(e){T.addEventListener(e,p,!0)}),T.addEventListener(S.down,l,!1),T.addEventListener("wheel",m,!1),T.addEventListener("contextmenu",v,!1),T.setAttribute("tabindex","1"),T.addEventListener("keydown",f,!1),T.addEventListener("keyup",h,!1))},this.disconnect=function(){T&&(A&&e.forEach(O,function(e){T.removeEventListener(e,p,!0)}),T.removeEventListener(S.down,l,!1),T.removeEventListener("wheel",m,!1),T.removeEventListener("contextmenu",v,!1),T.removeEventListener("keydown",f,!1),T.removeEventListener("keyup",h,!1),T=null)};var Y=o.init(c,"canvas",function(){this.disconnect(),this.connect()}.bind(this)),N=c.navigation;this.destroy=function(){this.disconnect(),Y.remove()},this.setControls=function(e){D?D=e:r=e},this.getControls=function(){return r};var B,F=0,K=0,X=0,I=null,_=L.create(),x=L.create(),H={select:function(e){c.get("ready")&&c._stage.select(e)},clickStep:function(e){c.get("ready")&&N.zoom.stepScreen(Math.log(.5)/Math.log(.6),e)},pan:function(e,t){switch(t){case 0:N.pan.begin(e);break;case 1:N.pan.update(e);break;case 2:N.pan.end(e);break;default:C(!1)}},tumble:function(e,t){switch(t){case 0:N.rotate.begin(e,a.Rotate.PivotPoint.POI);break;case 1:N.rotate.update(e,a.Rotate.PivotPoint.POI);break;case 2:N.rotate.end(e);break;default:C(!1)}},zoom:function(e,t){switch(t){case 0:N.zoom.begin(e);break;case 1:N.zoom.update(e);break;case 2:N.zoom.end(e);break;default:C(!1)}},zoomStep:function(e,t){e=-e/60,N.zoom.stepScreen(e,t)},lookAround:function(e,t){switch(t){case 0:N.rotate.begin(e,a.Rotate.PivotPoint.EYE);break;case 1:N.rotate.update(e,a.Rotate.PivotPoint.EYE);break;case 2:N.rotate.end(e);break;default:C(!1)}}},j=a.Pan.Direction,G={panLeft:function(){N.pan.beginContinuous(j.LEFT)},panRight:function(){N.pan.beginContinuous(j.RIGHT)},panForward:function(){N.pan.beginContinuous(j.FORWARD)},panBackward:function(){N.pan.beginContinuous(j.BACKWARD)},panUp:function(){N.pan.beginContinuous(j.UP)},panDown:function(){N.pan.beginContinuous(j.DOWN)},lookAround:function(){D||(D=r,r=u.LOOK_AROUND)},lookNorth:function(){c.goTo({heading:0})},lookDown:function(){c.goTo({tilt:0})}},V={panLeft:function(){N.pan.endContinuous(j.LEFT)},panRight:function(){N.pan.endContinuous(j.RIGHT)},panForward:function(){N.pan.endContinuous(j.FORWARD)},panBackward:function(){N.pan.endContinuous(j.BACKWARD)},panUp:function(){N.pan.endContinuous(j.UP)},panDown:function(){N.pan.endContinuous(j.DOWN)},lookAround:function(){D&&(r=D,D=void 0)}}};return u.PAN={mouseClick:"select",mouseClickDouble:"clickStep",mouseDragLeft:"pan",mouseDragRight:"tumble",mouseDragMiddle:"zoom",mouseWheel:"zoomStep"},u.TUMBLE={mouseClick:"select",mouseClickDouble:"clickStep",mouseDragLeft:"tumble",mouseDragRight:"pan",mouseDragMiddle:"zoom",mouseWheel:"zoomStep"},u.LOOK_AROUND={mouseClick:"select",mouseClickDouble:"clickStep",mouseDragLeft:"lookAround",mouseDragRight:"tumble",mouseDragMiddle:"pan",mouseWheel:"zoomStep"},u.OLD={mouseClick:"select",mouseClickDouble:"clickStep",mouseDragMiddle:"tumble",mouseDragRight:"pan",mouseWheel:"zoomStep"},u.PRO_PAN={mouseClick:"select",mouseClickDouble:"clickStep",mouseDragLeft:"pan",mouseDragMiddle:"tumble",mouseDragRight:"zoom",mouseWheel:"zoomStep"},u.PRO_TUMBLE={mouseClick:"select",mouseClickDouble:"clickStep",mouseDragLeft:"tumble",mouseDragMiddle:"pan",mouseDragRight:"zoom",mouseWheel:"zoomStep"},u});