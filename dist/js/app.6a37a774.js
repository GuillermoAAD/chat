(function(e){function t(t){for(var s,o,i=t[0],c=t[1],u=t[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);h&&h(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],s=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(s=!1)}s&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},r={app:0},a=[];function o(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"4257844e"}[e]+".js"}function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var s=new Promise((function(t,s){n=r[e]=[t,s]}));t.push(n[2]=s);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=o(e);var u=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var s=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+s+": "+a+")",u.name="ChunkLoadError",u.type=s,u.request=a,n[1](u)}r[e]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var h=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},a=[],o=(n("034f"),n("2877")),i={},c=Object(o["a"])(i,r,a,!1,null,null,null),u=c.exports,l=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"home"},[s("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),s("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},d=[],v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),e._m(0),n("h3",[e._v("Installed CLI Plugins")]),e._m(1),n("h3",[e._v("Essential Links")]),e._m(2),n("h3",[e._v("Ecosystem")]),e._m(3)])},f=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v(" For a guide and recipes on how to configure / customize this project,"),n("br"),e._v(" check out the "),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(". ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router",target:"_blank",rel:"noopener"}},[e._v("router")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex",target:"_blank",rel:"noopener"}},[e._v("vuex")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),n("li",[n("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),n("li",[n("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),n("li",[n("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],p={name:"HelloWorld",props:{msg:String}},m=p,g=(n("7def"),Object(o["a"])(m,v,f,!1,null,"1935ec24",null)),_=g.exports,b={name:"Home",components:{HelloWorld:_}},y=b,C=Object(o["a"])(y,h,d,!1,null,null,null),k=(C.exports,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("h3",{staticClass:" text-center"},[e._v("Mensajes")]),n("div",{},[n("button",{staticClass:"exit_btn",attrs:{type:"button"},on:{click:e.logout}},[n("i",{staticClass:"fa ",attrs:{"aria-hidden":"true"}},[e._v("SALIR")])])]),n("div",{staticClass:"messaging"},[n("div",{staticClass:"inbox_msg"},[n("div",{staticClass:"inbox_people"},[e._m(0),n("div",{staticClass:"inbox_chat"},e._l(e.users,(function(t){return n("div",{key:t.id},[n("div",{class:[e.idContactoSeleccionado==t.idUser?"active_chat":""]},[n("div",{staticClass:"chat_list "},[n("a",{on:{click:function(n){return e.selectUser(t.idUser)}}},[n("div",{staticClass:"chat_people"},[n("div",{staticClass:"chat_ib"},[n("h5",[e._v(e._s(t.userName))])])])])])])])})),0)]),n("div",{staticClass:"mesgs"},[n("div",{staticClass:"msg_history"},e._l(e.messages,(function(t){return n("div",{key:t.id},[n("div",{class:[t.author==e.authUser.displayName?"outgoing_msg":"incoming_msg"]},[n("div",{class:[t.author==e.authUser.displayName?"sent_msg":"received_msg"]},[n("div",{staticClass:"received_withd_msg"},[n("span",{staticClass:"time_date"},[e._v(" "+e._s(t.author)+" ")]),n("p",[e._v(e._s(t.message))]),n("span",{staticClass:"time_date"},[e._v(" "+e._s(t.createdAt.toDate().toLocaleString())+" ")])])])])])})),0),n("div",{staticClass:"type_msg"},[n("div",{staticClass:"input_msg_write"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"write_msg",attrs:{type:"text",placeholder:"Escribe un mensaje"},domProps:{value:e.message},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.sendMessage.apply(null,arguments)},input:function(t){t.target.composing||(e.message=t.target.value)}}}),n("button",{staticClass:"msg_send_btn",attrs:{type:"button"},on:{click:e.sendMessage}},[n("i",{staticClass:"fa fa-paper-plane-o",attrs:{"aria-hidden":"true"}},[e._v("►")])])])])])])])])}),w=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"headind_srch"},[n("div",{staticClass:"recent_heading"},[n("h4",[e._v("Contactos")])])])}],j=(n("159b"),n("4e82"),n("2591")),S={},x={},U={name:"PrivateChat",data:function(){return{message:null,messages:[],messagesReceived:[],messagesSended:[],authUser:{},idUser:{},userName:{},users:[],destinatario:{},idDestinatario:{},idContactoSeleccionado:{},contactoSeleccionado:{}}},methods:{scrollToBottom:function(){var e=document.querySelector(".msg_history");e.scrollTop=e.scrollHeight},logout:function(){j["a"].auth().signOut().then((function(){})).catch((function(e){}))},checkUser:function(){var e=this,t=db.collection("users").doc(this.authUser.uid);t.get().then((function(t){t.exists||e.saveUser()})).catch((function(e){}))},saveUser:function(){db.collection("users").doc(this.authUser.uid).set({idUser:this.authUser.uid,userName:this.authUser.displayName,groups:{},registeredAt:new Date}).then((function(){})).catch((function(e){console.log("Error: ",e)}))},fetchUsers:function(){var e=this;j["a"].auth().onAuthStateChanged((function(t){if(t){var n=t.uid;db.collection("users").where("idUser","!=",n).onSnapshot((function(t){var n=[];t.forEach((function(e){n.push(e.data())})),e.users=n}))}}))},checkMembers:function(){var e=db.collection("members"),t=e.where("members","in",[[S,x]]).get();console.log("CHAT:   ",t.id)},sendMessage:function(){console.log("usrlogedID:  ",S),console.log("usrSelectedID;:  ",x),this.saveMessage()},saveMessage:function(){var e=this;db.collection("chat").add({message:this.message,createdAt:new Date,author:this.authUser.displayName,idUser:S,idDestinatario:x,members:[S,x]}).then((function(){e.scrollToBottom()})),this.message=null},fetchMessages:function(){var e=this;db.collection("chat").orderBy("createdAt").onSnapshot((function(t){var n=[];t.forEach((function(e){n.push(e.data())})),e.messages=n,setTimeout((function(){e.scrollToBottom()}),1e3)}))},recuperarMensajes:function(){var e=this,t=db.collection("chat");t.where("members","in",[[x,S],[S,x]]).onSnapshot((function(t){var n=[];t.forEach((function(e){n.push(e.data())})),n.sort((function(e,t){return e.createdAt>t.createdAt?1:e.createdAt<t.createdAt?-1:0})),e.messages=n,setTimeout((function(){e.scrollToBottom()}),1e3)}))},selectUser:function(e){this.idContactoSeleccionado=e,x=e,this.recuperarMensajes()}},created:function(){var e=this;j["a"].auth().onAuthStateChanged((function(t){t?(e.authUser=t,S=e.authUser.uid,e.checkUser()):e.authUser={}})),this.fetchUsers()},beforeRouteEnter:function(e,t,n){n((function(e){j["a"].auth().onAuthStateChanged((function(t){t?n():e.$router.push("/login")}))}))}},E=U,A=(n("d75f"),Object(o["a"])(E,k,w,!1,null,"9e871458",null)),O=A.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("h3",[e._v("Please login with your google account to continue")]),n("button",{on:{click:e.login}},[e._v("Login with google")])])},T=[],P={methods:{login:function(){var e=this,t=new j["a"].auth.GoogleAuthProvider;t.addScope("https://www.googleapis.com/auth/contacts.readonly"),j["a"].auth().signInWithPopup(t).then((function(t){var n=t.credential;n.accessToken,t.user;e.$router.push("/")})).catch((function(e){e.code,e.message,e.email,e.credential}))}}},$=P,I=Object(o["a"])($,M,T,!1,null,null,null),D=I.exports;s["a"].use(l["a"]);var H=[{path:"/",name:"Home",component:O},{path:"/login",name:"login",component:D},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],N=new l["a"]({mode:"history",base:"/",routes:H}),B=N,L=n("2f62");s["a"].use(L["a"]);var W=new L["a"].Store({state:{},mutations:{},actions:{},modules:{}});n("e71f");var z={apiKey:"AIzaSyDo7yCn5gJC8lKSib84sFWM3tg0Wcjvg6s",authDomain:"vue-firestore-chat-72182.firebaseapp.com",projectId:"vue-firestore-chat-72182",storageBucket:"vue-firestore-chat-72182.appspot.com",messagingSenderId:"1079409550784",appId:"1:1079409550784:web:925478a204f37e707b1425",measurementId:"G-9BMH3TZZXX"};j["a"].initializeApp(z),j["a"].analytics();var F=j["a"].firestore();window.db=F,s["a"].config.productionTip=!1,new s["a"]({router:B,store:W,render:function(e){return e(u)}}).$mount("#app")},"7def":function(e,t,n){"use strict";n("8e33")},"85ec":function(e,t,n){},"8e33":function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},d75f:function(e,t,n){"use strict";n("fd1f")},fd1f:function(e,t,n){}});
//# sourceMappingURL=app.6a37a774.js.map