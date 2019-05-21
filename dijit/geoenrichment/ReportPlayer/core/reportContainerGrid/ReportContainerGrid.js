// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/Deferred","esri/dijit/geoenrichment/when","dojo/dom-construct","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/store/Memory","dijit/_WidgetBase","dijit/_TemplatedMixin","./_HiddenContentSupport","./_ScrollSupport","./_ZoomSupport","../grid/coreUtils/GridDataUtil","./utils/QueryUtil","./utils/SerializationManager","./utils/ContentLoadingEventManager","../supportClasses/DocumentOptions","../supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder","../themes/BackgroundThemeUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ViewModes","dojo/text!../templates/ReportContainerGrid.html"],function(e,t,i,n,o,r,a,s,d,g,h,l,u,c,p,m,f,_,C,y,x,P,v,w,S){return e([g,h,l,u,c],{templateString:S,viewModel:null,theme:null,parentWidget:null,currentFeatureIndex:null,showWatermark:!0,isSourceContainer:!0,documentOptions:null,loadingManager:null,serializationManager:null,renderOptions:{},_grids:null,_enableAsyncRendering:!0,postCreate:function(){this.renderOptions=t.mixin({center:!1,minTop:0,minRight:0,minBottom:0,minLeft:0},this.renderOptions),this.serializationManager=(new this._getSerializationManagerClass)(this),this._grids=[],this.inherited(arguments),this.updateLayout(),this.setViewMode(w.PREVIEW_VALUES),this.isSourceContainer&&r.add(this.domNode,"reportContainerGrid_sourceContainer")},_getSerializationManagerClass:function(){return f},setDocumentOptions:function(e,i){this.documentOptions&&t.mixin(this.documentOptions,e),this.updateLayout(i)},updateLayout:function(e){var t=this;this.documentOptions&&(this._updateContainerSize(),this._grids.forEach(function(i,n){e&&void 0!==e.pageIndex&&e.pageIndex!==n||(t._updateGridWrappingNodeForCurrentDocumentLayout(i),i.setMaxWidth(t._getAllowedPageWidth()),i.resizeToFitAllowedWidth(),i.resizeToFitHeight(t._getPageHeight()))}),this._syncFillerContainer())},getFirstPageNode:function(){var e=this.stackContainer.children[0];return e&&e.children[0]},getPageNodes:function(){for(var e=[],t=0;t<this.stackContainer.children.length;t++){var i=this.stackContainer.children[t];e.push(i.children[0])}return e},getPageRowNodes:function(){for(var e=[],t=0;t<this.stackContainer.children.length;t++)e.push(this.stackContainer.children[t]);return e},_placeGridContainer:function(e,t){var i=o.create("div",{class:"reportContainerGrid_gridContainerWrapper"}),n=void 0!==t&&this.stackContainer.children[t];n?o.place(i,n,"before"):o.place(i,this.stackContainer),o.place(e,i),e.backgroundImage=o.create("div",{class:"reportContainerGrid_stackContainerBackgroundImage esriGEAbsoluteStretched"},e)},getGridContainer:function(e){return this._getGridContainer(e)},_getGridContainer:function(e){var t=e.isFloatingTable?e.parentGrid:e;return t.domNode&&t.domNode.parentNode},_getGridContainerWrapper:function(e){var t=this._getGridContainer(e);return t&&t.parentNode},_updateGridWrappingNodeForCurrentDocumentLayout:function(e){e.isEmptyTable()&&s.set(e.domNode,{width:this._getAllowedPageWidth()+"px",height:this._getPageHeight()+"px"});var t=this._getGridContainer(e);if(t){var i=this.viewModel.getDocumentDefaultStyles(this.theme);s.set(t,{paddingLeft:(this.documentOptions.left||0)+"px",paddingRight:(this.documentOptions.right||0)+"px",paddingTop:(this.documentOptions.top||0)+"px",paddingBottom:(this.documentOptions.bottom||0)+"px",backgroundColor:this.documentOptions.backgroundColor||i&&i.backgroundColor})}x.renderThemeBackgroundImage(t.backgroundImage,i&&i.backgroundImage)},_updateContainerSize:function(){var e=0===this._heigth?"auto":s.get(this.domNode,"height")+"px";s.set(this.mainContainer,"height",e),s.set(this.mainContainer,"maxWidth",this._maxWidth?this._maxWidth+"px":""),s.set(this.mainContainer,"maxHeight",this._maxHeight?this._maxHeight+"px":""),this._syncFillerContainer()},getCurrentPageDim:function(){return C.getPageBox(this.documentOptions)},_getAllowedPageWidth:function(){return this.getCurrentPageDim().contentW},_getPageHeight:function(){return this.getCurrentPageDim().contentH},getTemplateVisibleBox:function(){var e=a.position(this.mainContainer),t=a.position(this.fillerContainer),i={x:Math.max(e.x,t.x),y:e.y,h:e.h};return i.w=Math.min(e.x+e.w,t.x+t.w)-i.x,i},_currentPageIndex:-1,getFullWidth:function(){var e=this.getFirstPageNode();return a.getMarginBox(e).w+a.getMarginExtents(this.stackContainer).w},getFullHeight:function(){var e=this.getFirstPageNode();return a.getMarginBox(e).h+a.getMarginExtents(this.stackContainer).h},getNumberOfPages:function(){return this._grids.length},showAllPages:function(){this.showPageAt(-1)},showPageAt:function(e){this._grids.forEach(function(t,i){var n=-1===e||e===i,o=P[n?"showNodeFromBackground":"hideNodeInBackground"](this._getGridContainerWrapper(t),"reportContainerPage_"+i);o&&this.own(o),this.isCurrentContainer()&&n&&t.notifyShown()},this),this._currentPageIndex=e,this._syncFillerContainer(),this.onShownPageIndexChanged(this._currentPageIndex)},getShownGrid:function(){return this._grids[this._currentPageIndex]},getShownGrids:function(){return-1===this._currentPageIndex?this._grids:[this.getShownGrid()]},getCurrentPageIndex:function(){return this._currentPageIndex},getGrids:function(){return this._grids},isCurrentContainer:function(){return!1},getLayersOpacity:function(e){var t=this.getGrids()[e];return t&&{foregroundCells:t.foregroundFloatingTablesSection?t.foregroundFloatingTablesSection.getStyle().opacity:void 0,fixedCells:t.getSettings().style.fixedCellsOpacity,backgroundCells:t.backgroundFloatingTablesSection?t.backgroundFloatingTablesSection.getStyle().opacity:void 0}},setLayersOpacity:function(e,t){if(e){var i=this.getGrids()[t];i&&(void 0!==e.foregroundCells&&i.foregroundFloatingTablesSection&&i.foregroundFloatingTablesSection.setStyle({opacity:e.foregroundCells}),void 0!==e.fixedCells&&i.setOpacity({fixedCellsOpacity:e.fixedCells}),void 0!==e.backgroundCells&&i.backgroundFloatingTablesSection&&i.backgroundFloatingTablesSection.setStyle({opacity:e.backgroundCells}))}},_width:0,_heigth:0,resize:function(e,t){this._width=void 0===e?this._width:e,this._heigth=void 0===t?this._heigth:t,void 0!==e&&s.set(this.domNode,"width",0===this._width?"auto":this._width+"px"),void 0!==t&&s.set(this.domNode,"height",0===this._heigth?"auto":this._heigth+"px"),this._updateContainerSize(),this.onResized()},_maxWidth:0,_maxHeight:0,setMaxWidth:function(e){this._maxWidth=e},setMaxHeight:function(e){this._maxHeight=e},screenToPageCoords:function(e,t){return m.screenToPageCoords(this,e,t)},getLayoutCells:function(e){return e=e||{},m.getLayoutCells(this,{sectionFuncName:e.sectionFuncName,floatingCells:!1!==e.floatingCells,topFirst:e.topFirst,visibleOnly:e.visibleOnly})},getCellPageGrid:function(e){return e&&e.parentGrid?e.parentGrid.isFloatingTable?e.parentGrid.parentGrid:e.parentGrid:null},getFloatingTables:function(e){return m.getFloatingTables(this,e)},clear:function(e){this._grids.forEach(function(e,t){e.destroy()},this),this._grids.length=0,this.stackContainer&&o.empty(this.stackContainer),this._syncFillerContainer()},_removeGrid:function(e){if(e){var t=this._getGridContainerWrapper(e);e.destroy(),t&&o.destroy(t),this._grids.splice(this._grids.indexOf(e),1),this._syncFillerContainer()}},removeGridAt:function(e){this._removeGrid(this._grids[e])},getGridJsonAt:function(e){return this._grids[e].toJson()},setHeight:function(e){s.set(this.mainContainer,"height",e+"px")},_viewMode:null,getViewMode:function(){return this._viewMode},setViewMode:function(e){this._viewMode!==e&&(this._viewMode=e,e===w.EDIT?(r.add(this.domNode,"reportContainerEditMode"),r.remove(this.domNode,"reportContainerPreviewMode")):(r.remove(this.domNode,"reportContainerEditMode"),r.add(this.domNode,"reportContainerPreviewMode")),this._updateContainerSize(),this._grids.forEach(function(t,i){t.setViewMode(e)},this))},hasFocusedChild:function(){return m.hasFocusedChild(this)},collectFieldInfos:function(e){return m.collectFieldInfos(this,e)},createGridFromSectionTableJson:function(e,t,i){void 0!==t&&"replace"===i&&this._removeGrid(this._grids[t]);var n=o.create("div",{class:"reportContainerGrid_stackContainer"});this._placeGridContainer(n,t);var r=this._createGridFromTableJson(e,n);return r.setMaxWidth(this._getAllowedPageWidth()),r.setSettings({style:{width:this._getAllowedPageWidth(),left:0,spaceBefore:0,spaceAfter:0,fixedCellsOpacity:e.style.fixedCellsOpacity},viewMode:this._viewMode}),this._updateGridWrappingNodeForCurrentDocumentLayout(r),void 0!==t?this._grids.splice(t,0,r):this._grids.push(r),this._syncFillerContainer(),r},_getGridClass:function(){return this.viewModel.layoutBuilder.getClass("grid")},_createGridFromTableJson:function(e,i){var n=this;return e.data=e.data||{},new(this._getGridClass())(t.mixin({class:"outerAdjustableGrid",fieldCellClass:"outerAdjustableGridCell",viewModel:this.viewModel,theme:this.theme,currentFeatureIndex:this.currentFeatureIndex,parentWidget:this,viewPortContainer:this.mainContainer,reportContainerPageNode:i,isReportContainerPageGrid:!0,columns:e.data.columns||[],store:new d({data:e.data.data||[],idProperty:"id"}),backgroundSectionJson:e.backgroundSectionJson,foregroundSectionJson:e.foregroundSectionJson,backgroundFloatingTablesSectionJson:e.backgroundFloatingTablesSectionJson,foregroundFloatingTablesSectionJson:e.foregroundFloatingTablesSectionJson,stickToRight:!0,looseResize:!0,layoutDefaults:{defaultRowHeight:250,rowMinHeight:30,columnMinWidth:50},renderBordersFromTheme:!0,hasRealBorders:!0,inheritThemeBackground:!1,enableBackgroundForeground:!0,enableAsyncRendering:this._enableAsyncRendering,_preRenderFieldCell:function(e){e.parentGrid.isFloatingTable||p.getFieldInfo(e)||n.isSourceContainer||p.setFieldInfo(e,n.createEmptySectionJson())},_postCreateFieldCell:function(e){n._postCreateFieldCell(e)},onContentLoadingStart:function(){n.loadingManager&&n.loadingManager.onContentLoadingStart()},onContentLoadingEnd:function(){n.loadingManager&&n.loadingManager.onContentLoadingEnd()}},this._getGridCreationParams(i)),o.create("div",null,i))},_postCreateFieldCell:function(e){},createEmptySectionJson:function(){return y.createFieldInfoFromSection({type:v.EMPTY})},_getGridCreationParams:function(e){return null},notifyShown:function(){n(this.serializationManager.notifyShown(),function(){this.getShownGrid()&&this.getShownGrid().notifyShown()}.bind(this))},getVisualState:function(){return{pages:this._grids.map(function(e,t){return{grid:e.getVisualState()}})}},setVisualState:function(e){e&&e.pages&&e.pages.length===this._grids.length&&this._grids.forEach(function(t,i){var n=e.pages[i];t.setVisualState(n.grid)})},_pagePromise:null,_contentPromise:null,fromJson:function(e,t){t=t||{};var o=this;this._enableAsyncRendering=!t.renderSync,this._pagePromise=null,this._contentPromise=null;var r;t.keepZoom?r=this.getZoomInfo():this.resetZoom(),this._currentPageIndex=-1,this.loadingManager&&this.loadingManager.destroy(),this.loadingManager=null;var a=new i;return t.waitUntilAllContentIsReady?(this.loadingManager=new _,this.loadingManager.init(),this._pagePromise=this.serializationManager.fromJson(e,t),this._contentPromise=n(this._pagePromise,function(){return this._contentPromise=null,this.loadingManager.notifyPagesLoaded(),this.loadingManager.returnOnLoadEnd()}.bind(this))):this._pagePromise=this.serializationManager.fromJson(e,t),n(this._pagePromise,function(){this._pagePromise=null}.bind(this)),n(t.waitUntilAllContentIsReady?this._contentPromise:this._pagePromise,a.resolve,a.reject),n(a.promise,function(){r&&o.setZoomInfo(r)})},getPagePromise:function(){return this._pagePromise},getContentPromise:function(){return this._contentPromise},toJson:function(e){return this.serializationManager.toJson(e)},onPendingDataApplied:function(){},onShownPageIndexChanged:function(e){},onResized:function(){},destroy:function(){this.loadingManager&&this.loadingManager.destroy(),this.loadingManager=null,this.clear(),this.inherited(arguments)}})});