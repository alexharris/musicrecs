(function(e){function t(t){for(var n,a,o=t[0],l=t[1],c=t[2],f=0,d=[];f<o.length;f++)a=o[f],r[a]&&d.push(r[a][0]),r[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),s()}function s(){for(var e,t=0;t<i.length;t++){for(var s=i[t],n=!0,o=1;o<s.length;o++){var l=s[o];0!==r[l]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=s[0]))}return e}var n={},r={app:0},i=[];function a(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=n,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/musicrecs/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;i.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"034f":function(e,t,s){"use strict";var n=s("64a9"),r=s.n(n);r.a},"524c":function(e,t,s){"use strict";var n=s("be5a"),r=s.n(n);r.a},"56d7":function(e,t,s){"use strict";s.r(t);s("cadf"),s("551c"),s("f751"),s("097d");var n=s("59ca"),r=s.n(n),i=(s("66ce"),s("2b0e")),a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{"night-mode":e.nightMode},attrs:{id:"app"}},[s("h1",[e._v("Music Recs")]),s("p",[s("span",{staticClass:"link",on:{click:e.toggleNightMode}},[e._v("night mode")])]),s("span",{staticClass:"link",on:{click:e.filterNone}},[e._v("all")]),e._v("  \n    "),s("span",{staticClass:"link",on:{click:function(t){return e.filterYoutube()}}},[e._v("youtube")]),e._v(" \n    "),s("span",{staticClass:"link",on:{click:function(t){e.clearFilters(),e.filterSpotify()}}},[e._v("spotify")]),e._v(" \n    "),s("span",{staticClass:"link",on:{click:function(t){e.clearFilters(),e.filterBandcamp()}}},[e._v("bandcamp")]),e._v(" \n    "),s("span",{staticClass:"link",on:{click:function(t){e.clearFilters(),e.filterSoundcloud()}}},[e._v("soundcloud")]),e._v(" \n    "),s("span",{staticClass:"link",on:{click:function(t){e.clearFilters(),e.filterOther()}}},[e._v("other")]),s("br"),s("br"),s("h2",[e._v(e._s(e.currentFilter))]),s("hr"),s("br"),"All"==this.currentFilter?s("div",[s("RenderMessages",{attrs:{initialMessages:this.messages}})],1):s("div",[s("RenderMessages",{attrs:{initialMessages:this.filteredMessages}})],1)])},o=[],l=(s("ac6a"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"paginate"},[s("span",{on:{click:function(t){e.getNext10Messages(),e.$emit("next-ten",e.messages)}}},[e._v("next")]),e._l(e.messages,function(t){return s("section",[e._v("\n      "+e._s(t)+"\n    ")])})],2)}),c=[],u={name:"Paginate",props:["initialMessages"],data:function(){return{startingPoint:0,messages:this.initialMessages}},methods:{sayHello:function(){console.log("hello")},getNext10Messages:function(){this.messages=[],this.messages=this.initialMessages.slice(this.startingPoint,this.startingPoint+10),this.startingPoint=this.startingPoint+10}}},f=u,d=(s("524c"),s("2877")),p=Object(d["a"])(f,l,c,!1,null,"05a16fe4",null),h=p.exports,g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",e._l(e.messages,function(t){return s("section",["youtube"==t.type?s("div",[s("iframe",{attrs:{width:"560",height:"315",src:"https://www.youtube.com/embed/"+t.youtubeId,frameborder:"0",allow:"accelerometer; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})]):"soundcloud"==t.type?s("div",[s("a",{attrs:{href:t.url}},[e._v(e._s(t.url))])]):"spotify"==t.type?s("div",["album"==t.spotifyTrackOrAlbum?s("iframe",{attrs:{src:"https://open.spotify.com/embed/album/"+t.spotifyId,width:"300",height:"380",frameborder:"0",allowtransparency:"true",allow:"encrypted-media"}}):"track"==t.spotifyTrackOrAlbum?s("iframe",{attrs:{src:"https://open.spotify.com/embed/track/"+t.spotifyId,width:"300",height:"380",frameborder:"0",allowtransparency:"true",allow:"encrypted-media"}}):e._e()]):"bandcamp"==t.type?s("div",[s("a",{attrs:{href:t.url}},[e._v(e._s(t.url))])]):"other"==t.type?s("div",[s("a",{attrs:{href:t.url}},[e._v(e._s(t.url))])]):e._e(),s("p",[s("small",[e._v("Posted by "+e._s(t.user)+" on "+e._s(t.createdTimestamp))])]),s("hr"),s("br")])}),0)},m=[],b={name:"RenderMessages",props:["initialMessages"],data:function(){return{startingPoint:0}},computed:{messages:function(){return this.initialMessages}}},y=b,v=Object(d["a"])(y,g,m,!1,null,null,null),_=v.exports,M={name:"app",data:function(){return{allMessages:[],messages:[],currentFilter:"All",nightMode:!1}},components:{Paginate:h,RenderMessages:_},computed:{filteredMessages:function(){var e=this;return this.messages.filter(function(t){return t.type==e.currentFilter})}},methods:{clearFilters:function(){this.messages=this.allMessages,this.currentFilter="All"},filterYoutube:function(){this.currentFilter="youtube"},filterSoundcloud:function(){this.currentFilter="soundcloud"},filterBandcamp:function(){this.currentFilter="bandcamp"},filterSpotify:function(){this.currentFilter="spotify"},filterOther:function(){this.currentFilter="other"},filterNone:function(){this.messages=this.allMessages,this.currentFilter="All"},toggleNightMode:function(){this.nightMode=!this.nightMode}},mounted:function(){var e=this,t=s("8aa5");s("e71f"),t.firestore().collection("messages").orderBy("createdTimestamp","desc").get().then(function(t){t.forEach(function(t){e.allMessages.push({url:t.data().url,user:t.data().user,type:t.data().type,youtubeId:t.data().youtubeId,spotifyId:t.data().spotifyId,spotifyTrackOrAlbum:t.data().spotifyTrackOrAlbum,createdTimestamp:new Date(t.data().createdTimestamp)})})}).then(function(){e.messages=e.allMessages})}},k=M,w=(s("034f"),Object(d["a"])(k,a,o,!1,null,null,null)),F=w.exports;r.a.database.enableLogging(!0);var O={apiKey:"AIzaSyAWR5oRFAs6_B7FCr7A882Gf9R0dKGPK8o",authDomain:"musicrecs-d37a6.firebaseapp.com",databaseURL:"https://musicrecs-d37a6.firebaseio.com",projectId:"musicrecs-d37a6",storageBucket:"",messagingSenderId:"21696461868",appId:"1:21696461868:web:73476ee43763d343"};r.a.initializeApp(O),i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(F)}}).$mount("#app")},"64a9":function(e,t,s){},be5a:function(e,t,s){}});
//# sourceMappingURL=app.d6152573.js.map