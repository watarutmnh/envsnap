"use strict";var EnvSnap=(()=>{var l=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var h=(r,e)=>{for(var n in e)l(r,n,{get:e[n],enumerable:!0})},u=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of f(e))!g.call(r,o)&&o!==n&&l(r,o,{get:()=>e[o],enumerable:!(t=d(e,o))||t.enumerable});return r};var w=r=>u(l({},"__esModule",{value:!0}),r);var p={};h(p,{EnvSnap:()=>s,default:()=>v});var s=class{static async collect(){return{timestamp:new Date().toISOString(),browser:this.getBrowserInfo(),os:await this.getOSInfo(),screen:this.getScreenInfo(),device:this.getDeviceInfo(),network:this.getNetworkInfo(),storage:this.getStorageInfo(),timezone:this.getTimezoneInfo(),userAgent:navigator.userAgent}}static getBrowserInfo(){let e=navigator.userAgent,n="Unknown",t="Unknown";return e.indexOf("Firefox")>-1?(n="Firefox",t=e.match(/Firefox\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Opera")>-1||e.indexOf("OPR")>-1?(n="Opera",t=e.match(/(?:Opera|OPR)\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Edg")>-1?(n="Edge",t=e.match(/Edg\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Chrome")>-1?(n="Chrome",t=e.match(/Chrome\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Safari")>-1?(n="Safari",t=e.match(/Version\/(\d+\.?\d*)/)?.[1]||"Unknown"):e.indexOf("Trident")>-1&&(n="Internet Explorer",t=e.match(/rv:(\d+\.?\d*)/)?.[1]||"Unknown"),{name:n,version:t,language:navigator.language||navigator.userLanguage||"Unknown",languages:navigator.languages||[navigator.language||navigator.userLanguage||"Unknown"],cookieEnabled:navigator.cookieEnabled,doNotTrack:navigator.doNotTrack||null,onLine:navigator.onLine,platform:navigator.platform,vendor:navigator.vendor}}static async getOSInfo(){if(navigator.userAgentData)try{let e=await navigator.userAgentData.getHighEntropyValues(["platform","platformVersion","architecture","bitness"]);return{name:e.platform||"Unknown",version:e.platformVersion||"",versionEstimated:!1,platform:e.architecture||navigator.platform,platformEstimated:!1,is64Bit:e.bitness==="64"}}catch{}return this.getOSInfoFromUA()}static getOSInfoFromUA(){let e=navigator.userAgent,n=navigator.platform,t="Unknown",o="";if(e.indexOf("Windows NT 10.0")>-1||e.indexOf("Windows NT 11")>-1)t="Windows",o=e.indexOf("Windows NT 11")>-1?"11":"10";else if(e.indexOf("Windows NT 6.3")>-1)t="Windows",o="8.1";else if(e.indexOf("Windows NT 6.2")>-1)t="Windows",o="8";else if(e.indexOf("Windows NT 6.1")>-1)t="Windows",o="7";else if(e.indexOf("Mac OS X")>-1){t="macOS";let i=e.match(/Mac OS X (\d+[._]\d+)/);i&&(o=i[1].replace(/_/g,"."))}else if(e.indexOf("Android")>-1){t="Android";let i=e.match(/Android (\d+\.?\d*)/);i&&(o=i[1])}else if(e.indexOf("iOS")>-1||e.indexOf("iPhone")>-1||e.indexOf("iPad")>-1){t="iOS";let i=e.match(/OS (\d+[._]\d+)/);i&&(o=i[1].replace(/_/g,"."))}else e.indexOf("Linux")>-1&&(t="Linux");let c=/WOW64|Win64|x86_64|x86-64|x64|aarch64|arm64/i.test(e)||t==="macOS";return{name:t,version:o,versionEstimated:!0,platform:n,platformEstimated:!0,is64Bit:c}}static getScreenInfo(){return{screenWidth:screen.width,screenHeight:screen.height,availWidth:screen.availWidth,availHeight:screen.availHeight,colorDepth:screen.colorDepth,pixelDepth:screen.pixelDepth,viewportWidth:window.innerWidth||document.documentElement.clientWidth,viewportHeight:window.innerHeight||document.documentElement.clientHeight,documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,orientation:screen.orientation?screen.orientation.type:"Unknown"}}static getDeviceInfo(){let e=navigator.userAgent,n=e.indexOf("Safari")>-1&&e.indexOf("Chrome")===-1&&e.indexOf("OPR")===-1;return{touchSupport:"ontouchstart"in window||navigator.maxTouchPoints>0,maxTouchPoints:navigator.maxTouchPoints||0,devicePixelRatio:window.devicePixelRatio||1,hardwareConcurrency:navigator.hardwareConcurrency||"Unknown",hardwareConcurrencyEstimated:n,isMobile:/Mobile|Android|iPhone|iPad|iPod/i.test(e),isTablet:/iPad|Android(?!.*Mobile)/i.test(e),vibrationSupport:"vibrate"in navigator}}static getNetworkInfo(){let e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e?{supported:!0,onLine:navigator.onLine,type:e.type||void 0,effectiveType:e.effectiveType||void 0,downlink:e.downlink??void 0,downlinkMax:e.downlinkMax??void 0,rtt:e.rtt??void 0,saveData:e.saveData||!1}:{supported:!1,onLine:navigator.onLine}}static getStorageInfo(){let e=n=>{try{let t=window[n],o="__storage_test__";return t.setItem(o,"1"),t.removeItem(o),!0}catch{return!1}};return{localStorage:e("localStorage"),sessionStorage:e("sessionStorage"),cookies:navigator.cookieEnabled,indexedDB:"indexedDB"in window,webSQL:"openDatabase"in window,serviceWorker:"serviceWorker"in navigator,cacheAPI:"caches"in window}}static getTimezoneInfo(){let e=new Date,n=Intl.DateTimeFormat().resolvedOptions().timeZone,t=navigator.language||navigator.userLanguage||"en-US";return{timezone:n||"Unknown",timezoneOffset:e.getTimezoneOffset(),locale:t,dateFormat:new Intl.DateTimeFormat(t).format(e),timeFormat:new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)}}static async format(e){e||(e=await this.collect());let n=`Environment Snapshot
`;return n+=`Generated: ${e.timestamp}

`,n+=`[Browser]
`,n+=`  Name: ${e.browser.name} ${e.browser.version}
`,n+=`  Language: ${e.browser.language}
`,n+=`  Online: ${e.browser.onLine?"Yes":"No"}
`,n+=`  Cookies: ${e.browser.cookieEnabled?"Enabled":"Disabled"}

`,n+=`[OS]
`,n+=`  Name: ${e.os.versionEstimated?e.os.name:`${e.os.name} ${e.os.version}`.trim()}
`,e.os.platformEstimated||(n+=`  Platform: ${e.os.platform}
`),n+=`  64-bit: ${e.os.is64Bit?"Yes":"No/Unknown"}

`,n+=`[Screen]
`,n+=`  Resolution: ${e.screen.screenWidth} x ${e.screen.screenHeight}
`,n+=`  Viewport: ${e.screen.viewportWidth} x ${e.screen.viewportHeight}
`,n+=`  Color Depth: ${e.screen.colorDepth}-bit
`,n+=`  Pixel Ratio: ${e.device.devicePixelRatio}

`,n+=`[Device]
`,n+=`  Touch: ${e.device.touchSupport?"Yes":"No"}
`,n+=`  Mobile: ${e.device.isMobile?"Yes":"No"}
`,n+=`  Tablet: ${e.device.isTablet?"Yes":"No"}
`,e.device.hardwareConcurrencyEstimated||(n+=`  CPU Cores: ${e.device.hardwareConcurrency}
`),n+=`
`,n+=`[Network]
`,e.network.supported?(e.network.type&&(n+=`  Connection: ${e.network.type}
`),e.network.downlink!==void 0&&(n+=`  Downlink: ${e.network.downlink} Mbps
`),e.network.rtt!==void 0&&(n+=`  RTT: ${e.network.rtt} ms
`),n+=`  Data Saver: ${e.network.saveData?"On":"Off"}

`):(n+=`  Status: ${e.network.onLine?"Online":"Offline"}
`,n+=`  Details: Not available

`),n+=`[Storage]
`,n+=`  Local Storage: ${e.storage.localStorage?"Yes":"No"}
`,n+=`  Session Storage: ${e.storage.sessionStorage?"Yes":"No"}
`,n+=`  IndexedDB: ${e.storage.indexedDB?"Yes":"No"}
`,n+=`  Service Worker: ${e.storage.serviceWorker?"Yes":"No"}

`,n+=`[Timezone]
`,n+=`  Zone: ${e.timezone.timezone}
`,n+=`  Offset: UTC${e.timezone.timezoneOffset>0?"-":"+"}${Math.abs(e.timezone.timezoneOffset/60)}
`,n+=`  Locale: ${e.timezone.locale}

`,n+=`[User Agent]
`,n+=`  ${e.userAgent}
`,n}static async copyToClipboard(e){let n=await this.format(e);if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(n);{let t=document.createElement("textarea");t.value=n,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();try{return document.execCommand("copy"),document.body.removeChild(t),Promise.resolve()}catch(o){return document.body.removeChild(t),Promise.reject(o)}}}static async download(e,n){let t=await this.format(e),o=new Date().toISOString().replace(/[:.]/g,"-"),c=n||`envsnap_${o}.txt`,i=new Blob([t],{type:"text/plain;charset=utf-8"}),m=URL.createObjectURL(i),a=document.createElement("a");a.href=m,a.download=c,a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(m)}static async toJSON(e){return JSON.stringify(e||await this.collect(),null,2)}};s.version="1.3.0";var v=s;return w(p);})();
if (typeof window !== 'undefined' && window.EnvSnap && window.EnvSnap.default) {
      window.EnvSnap = window.EnvSnap.default;
    }
//# sourceMappingURL=index.global.js.map