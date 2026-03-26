"use strict";var EnvSnap=(()=>{var l=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var h=(r,e)=>{for(var n in e)l(r,n,{get:e[n],enumerable:!0})},w=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of g(e))!f.call(r,o)&&o!==n&&l(r,o,{get:()=>e[o],enumerable:!(t=m(e,o))||t.enumerable});return r};var u=r=>w(l({},"__esModule",{value:!0}),r);var p={};h(p,{EnvSnap:()=>s,default:()=>v});var s=class{static async collect(){return{timestamp:new Date().toISOString(),browser:this.getBrowserInfo(),os:await this.getOSInfo(),screen:this.getScreenInfo(),device:this.getDeviceInfo(),network:this.getNetworkInfo(),storage:this.getStorageInfo(),timezone:this.getTimezoneInfo(),userAgent:navigator.userAgent}}static getBrowserInfo(){let e=navigator.userAgent,n="Unknown",t="Unknown";return e.indexOf("Firefox")>-1?(n="Firefox",t=e.match(/Firefox\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Opera")>-1||e.indexOf("OPR")>-1?(n="Opera",t=e.match(/(?:Opera|OPR)\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Edg")>-1?(n="Edge",t=e.match(/Edg\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Chrome")>-1?(n="Chrome",t=e.match(/Chrome\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Safari")>-1?(n="Safari",t=e.match(/Version\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Trident")>-1&&(n="Internet Explorer",t=e.match(/rv:(\d+\.?\d*)/)?.[1]||"Unknown"),{name:n,version:t,language:navigator.language||navigator.userLanguage||"Unknown",languages:navigator.languages||[navigator.language||navigator.userLanguage||"Unknown"],cookieEnabled:navigator.cookieEnabled,doNotTrack:navigator.doNotTrack||null,onLine:navigator.onLine,platform:navigator.platform,vendor:navigator.vendor}}static async getOSInfo(){if(navigator.userAgentData)try{let e=await navigator.userAgentData.getHighEntropyValues(["platform","platformVersion","bitness"]);return{name:e.platform||"Unknown",version:e.platformVersion||"",platform:navigator.platform,is64Bit:e.bitness==="64"}}catch{}return this.getOSInfoFromUA()}static getOSInfoFromUA(){let e=navigator.userAgent,n=navigator.platform,t="Unknown",o="";if(e.indexOf("Windows NT 10.0")>-1||e.indexOf("Windows NT 11")>-1)t="Windows",o=e.indexOf("Windows NT 11")>-1?"11":"10";else if(e.indexOf("Windows NT 6.3")>-1)t="Windows",o="8.1";else if(e.indexOf("Windows NT 6.2")>-1)t="Windows",o="8";else if(e.indexOf("Windows NT 6.1")>-1)t="Windows",o="7";else if(e.indexOf("Mac OS X")>-1){t="macOS";let i=e.match(/Mac OS X (\d+[._]\d+)/);i&&(o=i[1].replace(/_/g,"."))}else if(e.indexOf("Android")>-1){t="Android";let i=e.match(/Android (\d+\.?\d*)/);i&&(o=i[1])}else if(e.indexOf("iOS")>-1||e.indexOf("iPhone")>-1||e.indexOf("iPad")>-1){t="iOS";let i=e.match(/OS (\d+[._]\d+)/);i&&(o=i[1].replace(/_/g,"."))}else e.indexOf("Linux")>-1&&(t="Linux");let c=/WOW64|Win64|x86_64|x86-64|x64|aarch64|arm64/i.test(e)||t==="macOS";return{name:t,version:o,platform:n,is64Bit:c}}static getScreenInfo(){return{screenWidth:screen.width,screenHeight:screen.height,availWidth:screen.availWidth,availHeight:screen.availHeight,colorDepth:screen.colorDepth,pixelDepth:screen.pixelDepth,viewportWidth:window.innerWidth||document.documentElement.clientWidth,viewportHeight:window.innerHeight||document.documentElement.clientHeight,documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,orientation:screen.orientation?screen.orientation.type:"Unknown"}}static getDeviceInfo(){let e=navigator.userAgent;return{touchSupport:"ontouchstart"in window||navigator.maxTouchPoints>0,maxTouchPoints:navigator.maxTouchPoints||0,devicePixelRatio:window.devicePixelRatio||1,hardwareConcurrency:navigator.hardwareConcurrency||"Unknown",isMobile:/Mobile|Android|iPhone|iPad|iPod/i.test(e),isTablet:/iPad|Android(?!.*Mobile)/i.test(e),vibrationSupport:"vibrate"in navigator}}static getNetworkInfo(){let e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e?{supported:!0,onLine:navigator.onLine,type:e.type||void 0,effectiveType:e.effectiveType||void 0,downlink:e.downlink??void 0,downlinkMax:e.downlinkMax??void 0,rtt:e.rtt??void 0,saveData:e.saveData||!1}:{supported:!1,onLine:navigator.onLine}}static getStorageInfo(){let e=n=>{try{let t=window[n],o="__storage_test__";return t.setItem(o,"1"),t.removeItem(o),!0}catch{return!1}};return{localStorage:e("localStorage"),sessionStorage:e("sessionStorage"),cookies:navigator.cookieEnabled,indexedDB:"indexedDB"in window,webSQL:"openDatabase"in window,serviceWorker:"serviceWorker"in navigator,cacheAPI:"caches"in window}}static getTimezoneInfo(){let e=new Date,n=Intl.DateTimeFormat().resolvedOptions().timeZone,t=navigator.language||navigator.userLanguage||"en-US";return{timezone:n||"Unknown",timezoneOffset:e.getTimezoneOffset(),locale:t,dateFormat:new Intl.DateTimeFormat(t).format(e),timeFormat:new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)}}static async format(e){e||(e=await this.collect());let n=`=== Environment Snapshot ===
`;return n+=`Generated: ${e.timestamp}

`,n+=`\u{1F4F1} Browser
`,n+=`  \u2022 Name: ${e.browser.name} ${e.browser.version}
`,n+=`  \u2022 Language: ${e.browser.language}
`,n+=`  \u2022 Online: ${e.browser.onLine?"Yes":"No"}
`,n+=`  \u2022 Cookies: ${e.browser.cookieEnabled?"Enabled":"Disabled"}

`,n+=`\u{1F4BB} Operating System
`,n+=`  \u2022 OS: ${e.os.name} ${e.os.version}
`,n+=`  \u2022 Platform: ${e.os.platform}
`,n+=`  \u2022 64-bit: ${e.os.is64Bit?"Yes":"No/Unknown"}

`,n+=`\u{1F5A5}\uFE0F Screen
`,n+=`  \u2022 Resolution: ${e.screen.screenWidth} \xD7 ${e.screen.screenHeight}
`,n+=`  \u2022 Viewport: ${e.screen.viewportWidth} \xD7 ${e.screen.viewportHeight}
`,n+=`  \u2022 Color Depth: ${e.screen.colorDepth}-bit
`,n+=`  \u2022 Pixel Ratio: ${e.device.devicePixelRatio}

`,n+=`\u{1F4DF} Device
`,n+=`  \u2022 Touch Support: ${e.device.touchSupport?"Yes":"No"}
`,n+=`  \u2022 Mobile: ${e.device.isMobile?"Yes":"No"}
`,n+=`  \u2022 Tablet: ${e.device.isTablet?"Yes":"No"}
`,n+=`  \u2022 CPU Cores: ${e.device.hardwareConcurrency}

`,n+=`\u{1F310} Network
`,e.network.supported?(e.network.type&&(n+=`  \u2022 Connection: ${e.network.type}
`),e.network.downlink!==void 0&&(n+=`  \u2022 Downlink: ${e.network.downlink} Mbps
`),e.network.rtt!==void 0&&(n+=`  \u2022 RTT: ${e.network.rtt} ms
`),n+=`  \u2022 Data Saver: ${e.network.saveData?"On":"Off"}

`):(n+=`  \u2022 Status: ${e.network.onLine?"Online":"Offline"}
`,n+=`  \u2022 Details: Not available

`),n+=`\u{1F4BE} Storage
`,n+=`  \u2022 Local Storage: ${e.storage.localStorage?"\u2713":"\u2717"}
`,n+=`  \u2022 Session Storage: ${e.storage.sessionStorage?"\u2713":"\u2717"}
`,n+=`  \u2022 IndexedDB: ${e.storage.indexedDB?"\u2713":"\u2717"}
`,n+=`  \u2022 Service Worker: ${e.storage.serviceWorker?"\u2713":"\u2717"}

`,n+=`\u{1F550} Timezone
`,n+=`  \u2022 Zone: ${e.timezone.timezone}
`,n+=`  \u2022 Offset: UTC${e.timezone.timezoneOffset>0?"-":"+"}${Math.abs(e.timezone.timezoneOffset/60)}
`,n+=`  \u2022 Locale: ${e.timezone.locale}

`,n+=`\u{1F50D} User Agent
`,n+=`  ${e.userAgent}
`,n}static async copyToClipboard(e){let n=await this.format(e);if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(n);{let t=document.createElement("textarea");t.value=n,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();try{return document.execCommand("copy"),document.body.removeChild(t),Promise.resolve()}catch(o){return document.body.removeChild(t),Promise.reject(o)}}}static async download(e,n){let t=await this.format(e),o=new Date().toISOString().replace(/[:.]/g,"-"),c=n||`envsnap_${o}.txt`,i=new Blob([t],{type:"text/plain;charset=utf-8"}),d=URL.createObjectURL(i),a=document.createElement("a");a.href=d,a.download=c,a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(d)}static async toJSON(e){return JSON.stringify(e||await this.collect(),null,2)}},v=s;return u(p);})();
if (typeof window !== 'undefined' && window.EnvSnap && window.EnvSnap.default) {
      window.EnvSnap = window.EnvSnap.default;
    }
//# sourceMappingURL=index.global.js.map