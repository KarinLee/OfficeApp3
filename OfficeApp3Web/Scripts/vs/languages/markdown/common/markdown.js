/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.1.0(6c0fe2014e7a7d596ac1af21f25bf2fc17da8a75)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
define("vs/languages/markdown/common/markdownTokenTypes",["require","exports"],function(e,t){"use strict";t.TOKEN_HEADER_LEAD="entity.name.type",t.TOKEN_HEADER="entity.name.type",t.TOKEN_EXT_HEADER="entity.other.atribute-name",t.TOKEN_SEPARATOR="meta.separator",t.TOKEN_QUOTE="comment",t.TOKEN_LIST="keyword",t.TOKEN_BLOCK="string",t.TOKEN_BLOCK_CODE="variable.source"});var __extends=this&&this.__extends||function(e,t){function o(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)},__decorate=this&&this.__decorate||function(e,t,o,n){var r,s=arguments.length,a=3>s?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(a=(3>s?r(a):s>3?r(t,o,a):r(t,o))||a);return s>3&&a&&Object.defineProperty(t,o,a),a},__param=this&&this.__param||function(e,t){return function(o,n){t(o,n,e)}};define("vs/languages/markdown/common/markdown",["require","exports","vs/editor/common/modes/monarch/monarch","vs/editor/common/modes/monarch/monarchCompile","vs/platform/thread/common/threadService","vs/languages/html/common/html","vs/languages/markdown/common/markdownTokenTypes","vs/editor/common/services/modeService","vs/platform/instantiation/common/instantiation","vs/platform/thread/common/thread","vs/editor/common/services/modelService","vs/platform/workspace/common/workspace","vs/editor/common/services/editorWorkerService","vs/editor/common/modes/abstractMode"],function(e,t,o,n,r,s,a,i,c,m,p,T,d,_){"use strict";t.language={displayName:"Markdown",name:"md",defaultToken:"",suggestSupport:{disableAutoTrigger:!0},autoClosingPairs:[],blockCommentStart:"<!--",blockCommentEnd:"-->",control:/[\\`*_\[\]{}()#+\-\.!]/,noncontrol:/[^\\`*_\[\]{}()#+\-\.!]/,escapes:/\\(?:@control)/,jsescapes:/\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,empty:["area","base","basefont","br","col","frame","hr","img","input","isindex","link","meta","param"],tokenizer:{root:[[/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/,["white",a.TOKEN_HEADER_LEAD,a.TOKEN_HEADER,a.TOKEN_HEADER]],[/^\s*(=+|\-+)\s*$/,a.TOKEN_EXT_HEADER],[/^\s*((\*[ ]?)+)\s*$/,a.TOKEN_SEPARATOR],[/^\s*>+/,a.TOKEN_QUOTE],[/^\s*([\*\-+:]|\d+\.)\s/,a.TOKEN_LIST],[/^(\t|[ ]{4})[^ ].*$/,a.TOKEN_BLOCK],[/^\s*~{3}\s*((?:\w|[\/\-])+)?\s*$/,{token:a.TOKEN_BLOCK,next:"@codeblock"}],[/^\s*```\s*((?:\w|[\/\-])+)\s*$/,{token:a.TOKEN_BLOCK,next:"@codeblockgh",nextEmbedded:"$1"}],[/^\s*`{3}\s*$/,{token:a.TOKEN_BLOCK,next:"@codeblock"}],{include:"@linecontent"}],codeblock:[[/^\s*~{3}\s*$/,{token:a.TOKEN_BLOCK,next:"@pop"}],[/^\s*`{3}\s*$/,{token:a.TOKEN_BLOCK,next:"@pop"}],[/.*$/,a.TOKEN_BLOCK_CODE]],codeblockgh:[[/```\s*$/,{token:"@rematch",switchTo:"@codeblockghend",nextEmbedded:"@pop"}],[/[^`]*$/,a.TOKEN_BLOCK_CODE]],codeblockghend:[[/\s*```/,{token:a.TOKEN_BLOCK_CODE,next:"@pop"}],[/./,"@rematch","@pop"]],linecontent:[[/&\w+;/,"string.escape"],[/@escapes/,"escape"],[/\b__([^\\_]|@escapes|_(?!_))+__\b/,"strong"],[/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/,"strong"],[/\b_[^_]+_\b/,"emphasis"],[/\*([^\\*]|@escapes)+\*/,"emphasis"],[/`([^\\`]|@escapes)+`/,"variable"],[/\{[^}]+\}/,"string.target"],[/(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/,["string.link","","string.link"]],[/(!?\[)((?:[^\]\\]|@escapes)*)(\])/,"string.link"],{include:"html"}],html:[[/<(\w+)\/>/,s.htmlTokenTypes.getTag("$1")],[/<(\w+)/,{cases:{"@empty":{token:s.htmlTokenTypes.getTag("$1"),next:"@tag.$1"},"@default":{token:s.htmlTokenTypes.getTag("$1"),bracket:"@open",next:"@tag.$1"}}}],[/<\/(\w+)\s*>/,{token:s.htmlTokenTypes.getTag("$1"),bracket:"@close"}],[/<!--/,"comment","@comment"]],comment:[[/[^<\-]+/,"comment.content"],[/-->/,"comment","@pop"],[/<!--/,"comment.content.invalid"],[/[<\-]/,"comment.content"]],tag:[[/[ \t\r\n]+/,"white"],[/(type)(\s*=\s*)(")([^"]+)(")/,[s.htmlTokenTypes.ATTRIB_NAME,s.htmlTokenTypes.DELIM_ASSIGN,s.htmlTokenTypes.ATTRIB_VALUE,{token:s.htmlTokenTypes.ATTRIB_VALUE,switchTo:"@tag.$S2.$4"},s.htmlTokenTypes.ATTRIB_VALUE]],[/(type)(\s*=\s*)(')([^']+)(')/,[s.htmlTokenTypes.ATTRIB_NAME,s.htmlTokenTypes.DELIM_ASSIGN,s.htmlTokenTypes.ATTRIB_VALUE,{token:s.htmlTokenTypes.ATTRIB_VALUE,switchTo:"@tag.$S2.$4"},s.htmlTokenTypes.ATTRIB_VALUE]],[/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/,[s.htmlTokenTypes.ATTRIB_NAME,s.htmlTokenTypes.DELIM_ASSIGN,s.htmlTokenTypes.ATTRIB_VALUE]],[/\w+/,s.htmlTokenTypes.ATTRIB_NAME],[/\/>/,s.htmlTokenTypes.getTag("$S2"),"@pop"],[/>/,{cases:{"$S2==style":{token:s.htmlTokenTypes.getTag("$S2"),switchTo:"@embedded.$S2",nextEmbedded:"text/css"},"$S2==script":{cases:{$S3:{token:s.htmlTokenTypes.getTag("$S2"),switchTo:"@embedded.$S2",nextEmbedded:"$S3"},"@default":{token:s.htmlTokenTypes.getTag("$S2"),switchTo:"@embedded.$S2",nextEmbedded:"text/javascript"}}},"@default":{token:s.htmlTokenTypes.getTag("$S2"),next:"@pop"}}}]],embedded:[[/[^"'<]+/,""],[/<\/(\w+)\s*>/,{cases:{"$1==$S2":{token:"@rematch",next:"@pop",nextEmbedded:"@pop"},"@default":""}}],[/"([^"\\]|\\.)*$/,"string.invalid"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/"/,"string",'@string."'],[/'/,"string","@string.'"],[/</,""]],string:[[/[^\\"']+/,"string"],[/@jsescapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/["']/,{cases:{"$#==$S2":{token:"string",next:"@pop"},"@default":"string"}}]]}};var l=function(e){function o(o,r,s,a,i,c,m){e.call(this,o.id,n.compile(t.language),a,i,m),this._modeWorkerManager=new _.ModeWorkerManager(o,"vs/languages/markdown/common/markdownWorker","MarkdownWorker",null,r),this._threadService=s,this.emitOutputSupport=this,this.configSupport=this}return __extends(o,e),o.prototype._worker=function(e){return this._modeWorkerManager.worker(e)},o.prototype.configure=function(e){return this._threadService.isInMainThread?this._configureWorkers(e):this._worker(function(t){return t._doConfigure(e)})},o.prototype._configureWorkers=function(e){return this._worker(function(t){return t._doConfigure(e)})},o.prototype.getEmitOutput=function(e,t){return this._worker(function(o){return o.getEmitOutput(e,t)})},o.$_configureWorkers=r.AllWorkersAttr(o,o.prototype._configureWorkers),o.$getEmitOutput=r.OneWorkerAttr(o,o.prototype.getEmitOutput),o=__decorate([__param(1,c.IInstantiationService),__param(2,m.IThreadService),__param(3,i.IModeService),__param(4,p.IModelService),__param(5,T.IWorkspaceContextService),__param(6,d.IEditorWorkerService)],o)}(o.MonarchMode);t.MarkdownMode=l});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/6c0fe2014e7a7d596ac1af21f25bf2fc17da8a75/vs\languages\markdown\common\markdown.js.map