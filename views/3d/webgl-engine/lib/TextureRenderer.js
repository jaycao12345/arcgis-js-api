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

define(["require","exports","./Renderer","./GLFBO","./GLVBO","./VertexBufferLayout","./Camera","./Util","./gl-matrix","../materials/internal/TexOnlyGLMaterial"],function(e,t,r,i,a,n,s,o,d,h){var u=d.vec3d,_=d.vec4d,l=d.mat4d,p=function(){function e(e,t,i,a,n,s){this._acquiredTextures={},this._clearColor=_.createFrom(0,0,0,0),this._id2origin={},this._gl=e,this._canvas=t,this._programRep=i,this._materialRep=a,this._textureRep=n,this._modelDirtySet=s,this._renderer=new r(i,void 0,a,n,e,!0),this._renderer.setLightingData({ambient:[1,1,1,1],diffuse:[0,0,0,0],specular:[0,0,0,0],direction:[0,-1,0]})}return e.prototype.dispose=function(){for(var e in this._acquiredTextures)this._acquiredTextures[e].fbo.dispose(),this._textureRep.release(e);this._acquiredTextures=null,this._renderer.dispose(),this._renderer=null},e.prototype.addRenderGeometries=function(e){var t=this;e.forEach(function(e){null==e.origin&&(e.origin=t.getOrigin(e.center,e.bsRadius))}),this._renderer.modify(e,[])},e.prototype.removeRenderGeometries=function(e){this._renderer.modify([],e)},e.prototype.updateRenderGeometries=function(e,t){var r=e.map(function(e){return{renderGeometry:e,updateType:t}});this._renderer.modify([],[],r,{})},e.prototype.updateRenderOrder=function(e){Object.keys(e).length>0&&this._renderer.modifyRenderOrder(e)},e.prototype.setBackgroundColor=function(e){this._clearColor=e},e.prototype.isEmpty=function(){return this._renderer.isEmpty()},e.prototype.processDirtyMaterials=function(){var e=this._modelDirtySet.getDirtyMaterials();e&&this._renderer.modify([],[],[],e),this._modelDirtySet.clearDirtyMaterials()},e.prototype.draw=function(e,t){this.processDirtyMaterials();var r,a=e.getId(),n=this._gl;if(this._acquiredTextures[a])r=this._acquiredTextures[a].fbo;else{var s=this._textureRep.aquire(a);r=new i(6408,5121,!1,9728,n,s);var o=Object.keys(this._acquiredTextures).length;this._acquiredTextures[a]={glName:s,fbo:r,idx:o}}var d=t.width,h=t.height;(r.getWidth()!==d||r.getHeight()!==h)&&(r.setSize(d,h),n.texParameteri(3553,10241,9729),n.texParameteri(3553,10240,9729)),x.near=1,x.far=1e4,r.bind(),n.disable(2929),n.blendFuncSeparate(770,771,1,771),n.clearColor.apply(n,this._clearColor),n.clear(16384),this._renderer.setPixelRatio(t.pixelRatio||1);for(var u=0;u<t.views.length;u++){var _=t.views[u];x.viewport=_.viewport,l.ortho(0,_.extent[2]-_.extent[0],0,_.extent[3]-_.extent[1],x.near,x.far,x.projectionMatrix),l.identity(x.viewMatrix),l.translate(x.viewMatrix,[-_.extent[0],-_.extent[1],0]),x.setGLViewport(n),c&&this._drawTestTexture(d,h,f[this._acquiredTextures[a].idx%f.length]),this._renderer.render(x,T)}n.enable(n.DEPTH_TEST),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,this._canvas.width,this._canvas.height)},e.prototype._drawTestTexture=function(e,t,r){var i=this._gl;if(!this._testPatternMat){for(var s=new Uint8Array(e*t*4),o=0,d=0;t>d;d++)for(var u=0;e>u;u++){var _=Math.floor(u/10),p=Math.floor(d/10);2>_||2>p||10*_>e-20||10*p>t-20?(s[o++]=255,s[o++]=255,s[o++]=255,s[o++]=255):(s[o++]=255,s[o++]=255,s[o++]=255,s[o++]=1&_&&1&p?1&u^1&d?0:255:1&_^1&p?0:128)}var c=i.createTexture();i.bindTexture(i.TEXTURE_2D,c),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,e,t,0,i.RGBA,i.UNSIGNED_BYTE,s),this._testPatternMat=new h(this._programRep,c,[1,1,1,1],!0,i.ALWAYS),this._testPatternBindParams={proj:l.identity(),view:l.identity(),nearFar:[-1,1],origin:[0,0,0]};var f=new Float32Array(20);f[0]=-1,f[1]=-1,f[2]=0,f[3]=0,f[4]=0,f[5]=1,f[6]=-1,f[7]=0,f[8]=1,f[9]=0,f[10]=-1,f[11]=1,f[12]=0,f[13]=0,f[14]=1,f[15]=1,f[16]=1,f[17]=0,f[18]=1,f[19]=1,this._quadVBO=new a(f,n.Defaults.PosTex,i)}this._testPatternMat.setColor([r[0],r[1],r[2],1]),this._testPatternMat.bind(i,this._testPatternBindParams),this._testPatternMat.bindView(i,this._testPatternBindParams),this._quadVBO.bind(),this._quadVBO.setPointers(this._testPatternMat.getProgram()),i.drawArrays(i.TRIANGLE_STRIP,0,this._quadVBO.getNum()),this._testPatternMat.release(i)},e.prototype.getOrigin=function(e,t){var r=1e4,i=10,a=0,n=t*i/r;n>1&&(a=Math.ceil(o.logWithBase(n,2)));var s=Math.pow(2,a)*r,d=Math.round(e[0]/s),h=Math.round(e[1]/s),_=Math.round(e[2]/s),l=a+"_"+d+"_"+h+"_"+_,p=this._id2origin[l];return null==p&&(p={vec3:u.createFrom(d*s,h*s,_*s),id:l},this._id2origin[l]=p),p},e}(),c=!1,f=[[1,.5,.5],[.5,.5,1],[.5,1,.5]],T={get:function(){return!0}},x=new s;return p});