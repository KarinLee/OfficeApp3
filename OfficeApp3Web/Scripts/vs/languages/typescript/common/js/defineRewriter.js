/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.1.0(6c0fe2014e7a7d596ac1af21f25bf2fc17da8a75)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
define("vs/languages/typescript/common/js/defineRewriter",["require","exports","vs/languages/typescript/common/js/rewriting","vs/languages/typescript/common/lib/typescriptServices"],function(e,t,r,n){"use strict";var a=function(){function e(){}return Object.defineProperty(e.prototype,"name",{get:function(){return"rewriter.modules.define"},enumerable:!0,configurable:!0}),e.prototype.computeEdits=function(t){var r=t.sourceFile.getFullText();for(e._pattern.lastIndex=0;e._pattern.test(r);){var a=e._pattern.lastIndex-1,i=n.getTokenAtPosition(t.sourceFile,a);i&&65===i.kind&&i.parent&&160===i.parent.kind&&e._checkArguments(i.parent,t)}},e._checkArguments=function(t,n){var a,i,s=t.arguments[0]&&8===t.arguments[0].kind?1:0;if(t.arguments[s]&&156===t.arguments[s].kind&&t.arguments[s].elements.forEach(function(e){8===e.kind&&(a?a.push(e):a=[e])}),s+=1,a&&t.arguments[s]&&165===t.arguments[s].kind&&(i=t.arguments[s].parameters),a&&i&&i.length)for(var o=0;o<i.length;o++){var u=i[o];if(!e._specialModules[u.name.getText()]){var p=a[o];if(!p)break;var m=r.encodeVariableName(u);n.newDerive(p,e._importPattern,m,p.getText()),n.newInsert(u.name.getEnd(),e._typeOfPattern,m)}}},e._pattern=/\bdefine\b/g,e._specialModules={require:!0,exports:!0,module:!0},e._importPattern="import * as {0} from {1};\n",e._typeOfPattern=": typeof {0}",e}();return a});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/6c0fe2014e7a7d596ac1af21f25bf2fc17da8a75/vs\languages\typescript\common\js\defineRewriter.js.map