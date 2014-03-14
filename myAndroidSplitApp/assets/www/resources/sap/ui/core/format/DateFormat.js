/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.core.format.DateFormat");jQuery.sap.require("sap.ui.core.LocaleData");
sap.ui.core.format.DateFormat=function(){throw new Error()};
sap.ui.core.format.DateFormat.oDefaultDateFormat={style:"medium"};sap.ui.core.format.DateFormat.oDefaultDateTimeFormat={style:"medium"};sap.ui.core.format.DateFormat.oDefaultTimeFormat={style:"medium"};
sap.ui.core.format.DateFormat.getInstance=function(f,l){return this.getDateInstance(f,l)};
sap.ui.core.format.DateFormat.getDateInstance=function(f,l){var F=this.createInstance(f,l);F.oFormatOptions=jQuery.extend(false,{},this.oDefaultDateFormat,f);if(!F.oFormatOptions.pattern){F.oFormatOptions.pattern=F.oLocaleData.getDatePattern(F.oFormatOptions.style)}F.init();return F};
sap.ui.core.format.DateFormat.getDateTimeInstance=function(f,l){var F=this.createInstance(f,l);F.oFormatOptions=jQuery.extend(false,{},this.oDefaultDateTimeFormat,f);if(!F.oFormatOptions.pattern){var d=F.oLocaleData.getDateTimePattern(F.oFormatOptions.style),D=F.oLocaleData.getDatePattern(F.oFormatOptions.style),t=F.oLocaleData.getTimePattern(F.oFormatOptions.style);F.oFormatOptions.pattern=d.replace("{1}",D).replace("{0}",t)}F.init();return F};
sap.ui.core.format.DateFormat.getTimeInstance=function(f,l){var F=this.createInstance(f,l);F.oFormatOptions=jQuery.extend(false,{},this.oDefaultTimeFormat,f);if(!F.oFormatOptions.pattern){F.oFormatOptions.pattern=F.oLocaleData.getTimePattern(F.oFormatOptions.style)}F.init();return F};
sap.ui.core.format.DateFormat.createInstance=function(f,l){var F=jQuery.sap.newObject(this.prototype);if(f instanceof sap.ui.core.Locale){l=f;f=undefined}if(!l){l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}F.oLocale=l;F.oLocaleData=sap.ui.core.LocaleData.getInstance(l);return F};
sap.ui.core.format.DateFormat.prototype.init=function(){this.aMonthsAbbrev=this.oLocaleData.getMonths("abbreviated");this.aMonthsWide=this.oLocaleData.getMonths("wide");this.aDaysAbbrev=this.oLocaleData.getDays("abbreviated");this.aDaysWide=this.oLocaleData.getDays("wide");this.aDayPeriods=this.oLocaleData.getDayPeriods("abbreviated");this.aFormatArray=this.parseJavaDateFormat(this.oFormatOptions.pattern)};
sap.ui.core.format.DateFormat.prototype.oStates={"G":"era","y":"year","Y":"weekYear","M":"month","w":"weekInYear","W":"weekInMonth","D":"dayInYear","d":"day","F":"dayOfWeekInMonth","E":"dayNameInWeek","u":"dayNumberOfWeek","a":"amPmMarker","H":"hour0_23","k":"hour1_24","K":"hour0_11","h":"hour1_12","m":"minute","s":"second","S":"millisecond","z":"timezoneGeneral","Z":"timezoneRFC822","X":"timezoneISO8601"};
sap.ui.core.format.DateFormat.prototype.format=function(d){var b=[],p,h=d.getHours(),t=Math.abs(d.getTimezoneOffset()),P=d.getTimezoneOffset()>0,H=Math.floor(t/60),m=t%60,y,w,r;for(var i=0;i<this.aFormatArray.length;i++){p=this.aFormatArray[i];switch(p.sType){case"text":b.push(p.sValue);break;case"day":b.push(jQuery.sap.padLeft(String(d.getDate()),"0",p.iDigits));break;case"dayNameInWeek":if(p.iDigits<4){b.push(this.aDaysAbbrev[d.getDay()])}else if(p.iDigits>=4){b.push(this.aDaysWide[d.getDay()])}break;case"dayNumberOfWeek":b.push(d.getDay()||7);break;case"month":if(p.iDigits==3){b.push(this.aMonthsAbbrev[d.getMonth()])}else if(p.iDigits>=4){b.push(this.aMonthsWide[d.getMonth()])}else{b.push(jQuery.sap.padLeft(String(d.getMonth()+1),"0",p.iDigits))}break;case"era":b.push("AD");break;case"year":case"weekYear":y=""+d.getFullYear();if(p.iDigits==2&&y.length>2){y=y.substr(y.length-2)}b.push(jQuery.sap.padLeft(y,"0",p.iDigits));break;case"weekInYear":w="";if(d.getWeek){w+=d.getWeek()}b.push(jQuery.sap.padLeft(w,"0",p.iDigits));break;case"hour0_23":b.push(jQuery.sap.padLeft(String(h),"0",p.iDigits));break;case"hour1_24":if(h==0){h=24}b.push(jQuery.sap.padLeft(String(h),"0",p.iDigits));break;case"hour0_11":if(h>11){h-=12}b.push(jQuery.sap.padLeft(String(h),"0",p.iDigits));break;case"hour1_12":if(h>12){h-=12}else if(h==0){h=12}b.push(jQuery.sap.padLeft(String(h),"0",p.iDigits));break;case"minute":b.push(jQuery.sap.padLeft(String(d.getMinutes()),"0",p.iDigits));break;case"second":b.push(jQuery.sap.padLeft(String(d.getSeconds()),"0",p.iDigits));break;case"millisecond":b.push(jQuery.sap.padLeft(String(d.getMilliseconds()),"0",p.iDigits));break;case"amPmMarker":var D=d.getHours()<12?0:1;b.push(this.aDayPeriods[D]);break;case"timezoneGeneral":if(p.iDigits>3&&d.getTimezoneLong){b.push(d.getTimezoneLong());break}else if(d.getTimezoneShort){b.push(d.getTimezoneShort());break}b.push("GMT");case"timezoneISO8601":if(t!=0){b.push(P?"-":"+");b.push(jQuery.sap.padLeft(String(H),"0",2));b.push(":");b.push(jQuery.sap.padLeft(String(m),"0",2))}break;case"timezoneRFC822":if(t!=0){b.push(P?"-":"+");b.push(jQuery.sap.padLeft(String(H),"0",2));b.push(jQuery.sap.padLeft(String(m),"0",2))}break}}r=b.join("");if(sap.ui.getCore().getConfiguration().getOriginInfo()){r=new String(r);r.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString(),style:this.oFormatOptions.style,pattern:this.oFormatOptions.pattern}}return r};
sap.ui.core.format.DateFormat.prototype.parse=function(v){var d=new Date(0),I=0,e=false,D=null,m=null,y=null,h=null,M=null,s=null,a=null,p=false,P,b,t=null;function c(C){return C>=48&&C<=57}function f(n){var L=0;while(L<n&&c(v.charCodeAt(I+L))){L++}return v.substr(I,L)}function g(L){var i;for(i=0;i<L.length;i++){if(v.indexOf(L[i],I)==I){return L[i]}}return null}function j(L){var i;for(i=0;i<L.length;i++){if(v.indexOf(L[i],I)==I){return i}}return null}function k(n){var o=v.charAt(I)=="+"?-1:1;I++;b=f(2);var q=parseInt(b,10);I=I+2;if(n){I++}b=f(2);I=I+2;t=parseInt(b,10);t=(t+60*q)*o}for(var i=0;i<this.aFormatArray.length;i++){P=this.aFormatArray[i];switch(P.sType){case"text":if(v.indexOf(P.sValue,I)==I){I+=P.sValue.length}break;case"day":b=f(Math.max(P.iDigits,2));I+=b.length;D=parseInt(b,10);break;case"dayNameInWeek":b=g(this.aDaysWide);if(!b){b=g(this.aDaysAbbrev)}if(b){I+=b.length}break;case"dayNumberOfWeek":b=f(P.iDigits);I+=b.length;break;case"month":if(P.iDigits<3){b=f(Math.max(P.iDigits,2));m=parseInt(b,10)-1;I+=b.length}else{m=j(this.aMonthsWide);if(m!=null){I+=this.aMonthsWide[m].length}else{m=j(this.aMonthsAbbrev);if(m!=null){I+=this.aMonthsAbbrev[m].length}}}break;case"era":break;case"year":case"weekYear":if(P.iDigits==1){b=f(4);I+=b.length}else if(P.iDigits==2){b=f(2);if(b.length==2){y=parseInt(b,10);if(y<90){b="20"+b}else{b="19"+b}I+=2}else{I+=b.length}}else{b=f(P.iDigits);I+=b.length}y=parseInt(b,10);break;case"weekInYear":break;case"hour0_23":b=f(Math.max(P.iDigits,2));I+=b.length;h=parseInt(b,10);break;case"hour1_24":b=f(Math.max(P.iDigits,2));I+=b.length;h=parseInt(b,10);if(h==24){h=0}break;case"hour0_11":b=f(Math.max(P.iDigits,2));I+=b.length;h=parseInt(b,10);break;case"hour1_12":b=f(Math.max(P.iDigits,2));I+=b.length;h=parseInt(b,10);if(h==12){h=0}break;case"minute":b=f(Math.max(P.iDigits,2));I+=b.length;M=parseInt(b,10);break;case"second":b=f(Math.max(P.iDigits,2));I+=b.length;s=parseInt(b,10);break;case"millisecond":b=f(Math.max(P.iDigits,3));b=jQuery.sap.padRight(b,"0",3);I+=b.length;a=parseInt(b,10);break;case"amPmMarker":var A=this.aDayPeriods[0],l=this.aDayPeriods[1];if(v.indexOf(A,I)==I){p=false;I+=2}else if(v.indexOf(l,I)==I){p=true;I+=2}break;case"timezoneGeneral":var T=v.substring(I,I+3);if(T==="GMT"||T==="UTC"){I=I+3}else if(v.substring(I,I+2)==="UT"){I=I+2}else if(v.charAt(I)=="Z"){I=I+1;t=0;break}else{jQuery.sap.log.error(v+" cannot be parsed correcly by sap.ui.core.format.DateFormat: The given timezone is not supported!");break}case"timezoneISO8601":k(true);break;case"timezoneRFC822":k(false);break}}if(p){h+=12}if(t!=null){d.setUTCFullYear(y||1970);d.setUTCMonth(m||0);d.setUTCDate(D||1);d.setUTCHours(h||0);d.setUTCMinutes((M||0)+t);d.setUTCSeconds(s||0);d.setUTCMilliseconds(a||0)}else{d.setFullYear(y||1970);d.setMonth(m||0);d.setDate(D||1);d.setHours(h||0);d.setMinutes(M||0);d.setSeconds(s||0);d.setMilliseconds(a||0)}return d};
sap.ui.core.format.DateFormat.prototype.parseJavaDateFormat=function(f){var F=[],i,q=false,c=null,s="",n="";for(i=0;i<f.length;i++){var C=f.charAt(i),N,p,P;if(q){if(C=="'"){p=f.charAt(i-1);P=f.charAt(i-2);N=f.charAt(i+1);if(p=="'"&&P!="'"){q=false}else if(N=="'"){i+=1}else{q=false;continue}}if(s=="text"){c.sValue+=C}else{c={sType:"text",sValue:C};F.push(c);s="text"}}else{if(C=="'"){q=true}else if(this.oStates[C]){n=this.oStates[C];if(s==n){c.iDigits++}else{c={sType:n,iDigits:1};F.push(c);s=n}}else{if(s=="text"){c.sValue+=C}else{c={sType:"text",sValue:C};F.push(c);s="text"}}}}return F};
