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

define(["require","exports","./Texture"],function(e,t,i){var r=function(){function e(t,r,n,h){if(this._context=null,this._glName=null,this._depthAttachment=null,this._stencilAttachment=null,this._colorAttachment=null,this._initialized=!1,this._context=t,this._desc={colorTarget:r.colorTarget,depthStencilTarget:r.depthStencilTarget,width:r.width,height:r.height,multisampled:r.multisampled},this._id=e._nextId++,n){var o=void 0;n instanceof i?(this._colorAttachment=n,o=n.descriptor):(o=n,this._colorAttachment=new i(this._context,o)),0!==this._desc.colorTarget&&console.error("Framebuffer is initialized with a texture however the descriptor indicates using a renderbuffer color attachment!"),e._validateTextureDimensions(o,this._desc)}if(h){this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var s=void 0;h instanceof i?(this._depthStencilTexture=h,s=this._depthStencilTexture.descriptor):(s=h,this._depthStencilTexture=new i(this._context,s)),e._validateTextureDimensions(s,this._desc)}}return e.create=function(t,i){return new e(t,i)},e.createWithAttachments=function(t,i,r,n){return new e(t,r,i,n)},Object.defineProperty(e.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"glName",{get:function(){return this._glName},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"descriptor",{get:function(){return this._desc},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"colorTexture",{get:function(){return this._colorAttachment instanceof i?this._colorAttachment:null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"depthStencilTexture",{get:function(){return this._depthStencilTexture},enumerable:!0,configurable:!0}),e.prototype.dispose=function(){if(this._context&&this._glName){this._disposeColorAttachment(),this._disposeDepthStencilAttachments();var e=this._context.gl;e.isFramebuffer(this._glName)&&(e.deleteFramebuffer(this._glName),this._glName=null)}},e.prototype.attachColorTexture=function(t){if(t){var i=t.descriptor;if(e._validateTextureDimensions(i,this._desc),this._disposeColorAttachment(),this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t.glName,0)}this._colorAttachment=t}},e.prototype.detachColorTexture=function(){var e=void 0;if(this._colorAttachment instanceof i){if(e=this._colorAttachment,this._initialized){this._context.bindFramebuffer(this);var t=this._context.gl;this._context.gl.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,null,0)}this._colorAttachment=null}return e},e.prototype.attachDepthStencilTexture=function(t){if(t){var i=t.descriptor;if(34041!==i.pixelFormat&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!"),34042!==i.dataType&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8_WEBGL!"),this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!"),e._validateTextureDimensions(i,this._desc),4!==this._desc.depthStencilTarget&&(this._desc.depthStencilTarget=4),this._disposeDepthStencilAttachments(),this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,t.glName,0)}this._depthStencilTexture=t}},e.prototype.detachDepthStencilTexture=function(){var e=this._depthStencilTexture;if(e&&this._initialized){this._context.bindFramebuffer(this);var t=this._context.gl;this._context.gl.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,null,0)}return this._depthStencilTexture=null,e},e.prototype.copyToTexture=function(e,t,i,r,n,h,o){(0>e||0>t||0>n||0>h)&&console.error("Offsets cannot be negative!"),(0>=i||0>=r)&&console.error("Copy width and height must be greater than zero!");var s=this._desc,a=o.descriptor;3553!==o.descriptor.target&&console.error("Texture target must be TEXTURE_2D!"),(e+i>s.width||t+r>s.height||n+i>a.width||h+r>a.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");var c=this._context;c.bindTexture(o),c.bindFramebuffer(this),c.gl.copyTexSubImage2D(3553,0,n,h,e,t,i,r)},e.prototype.readPixels=function(e,t,i,r,n,h,o){(0>=i||0>=r)&&console.error("Copy width and height must be greater than zero!"),o||console.error("Target memory is not initialized!"),this._context.bindFramebuffer(this);var s=this._context.gl;s.readPixels(e,t,i,r,n,h,o)},e.prototype.initialize=function(){if(this._initialized)return!1;var e=this._context.gl,t=e.createFramebuffer(),r=this._desc;if(e.bindFramebuffer(e.FRAMEBUFFER,t),!this._colorAttachment)if(0===r.colorTarget){var n={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:r.width,height:r.height};this._colorAttachment=new i(this._context,n)}else{var h=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,h),e.renderbufferStorage(e.RENDERBUFFER,e.RGBA4,r.width,r.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,h),this._colorAttachment=h}if(this._colorAttachment instanceof i){var o=this._colorAttachment;e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o.glName,0)}switch(r.depthStencilTarget){case 1:case 3:var s=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,s);var a=1===r.depthStencilTarget?e.DEPTH_COMPONENT16:e.DEPTH_STENCIL,c=1===r.depthStencilTarget?e.DEPTH_ATTACHMENT:e.DEPTH_STENCIL_ATTACHMENT;e.renderbufferStorage(e.RENDERBUFFER,a,r.width,r.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,s),this._depthAttachment=s;break;case 2:var l=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,l),e.renderbufferStorage(e.RENDERBUFFER,e.STENCIL_INDEX8,r.width,r.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.STENCIL_ATTACHMENT,e.RENDERBUFFER,l),this._stencilAttachment=l;break;case 4:if(!this._depthStencilTexture){this._context.extensions.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var f={target:3553,pixelFormat:34041,dataType:34042,samplingMode:9728,width:r.width,height:r.height};this._depthStencilTexture=new i(this._context,f)}e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,this._depthStencilTexture.glName,0)}var u=e.checkFramebufferStatus(e.FRAMEBUFFER);return u!==e.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!"),this._glName=t,this._initialized=!0,!0},e.prototype._disposeColorAttachment=function(){if(this._colorAttachment instanceof i){var e=this._colorAttachment;if(this._initialized){this._context.bindFramebuffer(this);var t=this._context.gl;t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,null,0)}e.dispose()}else if(this._colorAttachment instanceof WebGLRenderbuffer){var r=this._colorAttachment,t=this._context.gl;this._initialized&&(this._context.bindFramebuffer(this),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,null)),t.isRenderbuffer(r)&&this._context.gl.deleteRenderbuffer(r)}this._colorAttachment=null},e.prototype._disposeDepthStencilAttachments=function(){var e=this._context.gl;if(this._depthAttachment){if(this._initialized){this._context.bindFramebuffer(this);var t=this._context.gl,i=1===this._desc.depthStencilTarget?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(t.FRAMEBUFFER,i,t.RENDERBUFFER,null)}e.isRenderbuffer(this._depthAttachment)&&e.deleteRenderbuffer(this._depthAttachment),this._depthAttachment=null}if(this._stencilAttachment){if(this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferRenderbuffer(r.FRAMEBUFFER,r.STENCIL_ATTACHMENT,r.RENDERBUFFER,null)}e.isRenderbuffer(this._stencilAttachment)&&e.deleteRenderbuffer(this._stencilAttachment),this._stencilAttachment=null}if(this._depthStencilTexture){if(this._initialized){this._context.bindFramebuffer(this);var n=this._context.gl;n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,null,0)}this._depthStencilTexture.dispose(),this._depthStencilTexture=null}},e._validateTextureDimensions=function(e,t){console.assert(e.width>0&&e.height>0),3553!==e.target&&console.error("Texture typemust be TEXTURE_2D!"),void 0!==t.width&&t.width>0&&void 0!==t.height&&t.height>0?(t.width!==e.width||t.height!==e.height)&&console.error("Color attachment texture must match the framebuffer's!"):(t.width=e.width,t.height=e.height)},e._nextId=0,e}();return r});