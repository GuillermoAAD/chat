<template>
<div class="container">
<h3 class=" text-center">Mensajes</h3>

<!--LOGOUT-->
<div class="">
  <button @click="logout" class="exit_btn" type="button"><i class="fa " aria-hidden="true">SALIR</i></button>
</div>

<div class="messaging">
      <div class="inbox_msg">
        <!--INBOX-->
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Contactos</h4>
            </div>
          </div>

          <div class="inbox_chat">
            <div v-for="user in users" :key="user.id">
              <div :class="[idContactoSeleccionado==user.idUser?'active_chat':'']">
                <div class="chat_list ">
                  <a @click="selectUser(user.idUser)">
                  <div class="chat_people">
                    <div class="chat_ib">
                      <div :class="[user.active==true?['status','active']:['status','inactive']]"></div>
                      <h5>{{user.userName}}</h5>
                      <h5>{{user.phoneNumber}}</h5>
                    </div>
                  </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--CHAT-->
        <div class="mesgs">
          <div class="msg_history">
            <div v-for="message in messages" :key="message.id">
              <!--
              <div :class="[message.author==authUser.displayName?'outgoing_msg':'incoming_msg']">
                <div :class="[message.author==authUser.displayName?'sent_msg':'received_msg']">
                  -->
              <div :class="[message.idUser==authUser.uid?'outgoing_msg':'incoming_msg']">
                <div :class="[message.idUser==authUser.uid?'sent_msg':'received_msg']">
                  <div class="received_withd_msg">
                    <span class="time_date">
                      {{message.author}}
                    </span>
                    <p>{{message.message}}</p>
                    <span class="time_date">
                      {{message.createdAt.toDate().toLocaleString()}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--Escribir y mandar mensaje-->
          <div :class="[!idContactoSeleccionado?'hide':'show']">
            <div class="type_msg">
              <div class="input_msg_write">
                  <input @keyup.enter="sendMessage" v-model="message" type="text" class="write_msg" placeholder="Escribe un mensaje"/>
                  <button @click="sendMessage" class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true">►</i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!--<p class="text-center top_spac"> Design by <a target="_blank" href="https://www.linkedin.com/in/sunil-rajput-nattho-singh/">Sunil Rajput</a></p>-->
      
    </div></div>
</template>

<script>

import firebase from 'firebase'

let usrlogedID = null;
let usrSelectedID = null;
let idSelectedChat = null;


let unsubscribeListenerMSG = {};

export default {
  name: 'PrivateChat',

  data() {
     return {
        message:null,
        messages:[],
        messagesReceived:[],
        messagesSended:[],
        
        authUser:{},

        idUser:{},
        userName: {},
        phoneNumber:null,

        users:[],
        destinatario:{},
        idDestinatario: {},
        idContactoSeleccionado:null,
        
        contactoSeleccionado:{},

        groups:{},
     }
  },
  methods: {
    scrollToBottom(){
      let box=document.querySelector('.msg_history');
      box.scrollTop=box.scrollHeight;
    },

    logout(){
      //Cambia el estado del usuario logeado como inactivo
      this.setUserInactive();
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    },

    /// USUARIOS
    checkUser(){
      //console.log("checkUser");
      //REvisa y agrega el usuario logeado a la BD
      var docRef =  db.collection("users").doc(this.authUser.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          //console.log('Usuario ya existe');
        } else {
          this.saveUser();
        }
      }).catch((error) => {
        //el usuario ya está en la base de datos.
      });
    },

    saveUser(){
      //console.log("saveUser");
      db.collection("users").doc(this.authUser.uid).set({
        idUser: this.authUser.uid,
        userName: this.authUser.displayName,
        //registeredAt: new Date(),
        registeredAt: firebase.firestore.FieldValue.serverTimestamp(),
        active: true,
        phoneNumber: this.authUser.phoneNumber,
        groups: {}
      }).then(() => {
        //el usuario no está en la base de datos y fue insertado.
        // /console.log('Usuario agregado');

      }).catch((error) => {
      //el usuario ya está en la base de datos.
      //console.log("el usuario ya está en la base de datos.");
        console.log('Error: ', error);
      });
    },

    fetchUsers(){
      //console.log("fetchUsers");
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          //Recupera todos los usuarios excepto el actual
          db.collection('users').where("idUser", "!=", uid)
          .onSnapshot((querySnapshot)=>{
            var allUsers=[];
            querySnapshot.forEach((doc) => {
              allUsers.push(doc.data());
            });
              this.users=allUsers;
          });
        } else {
          // User is signed out
          // ...
        }
      });
    },

    setUserActive(){
      //console.log("setUserActive");
      const usersRef = db.collection("users").doc(usrlogedID);
      return usersRef.update({
          active: true
      })
      .then(() => {
          //console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    },

    setUserInactive(){
      //console.log("setUserInactive");
      const usersRef = db.collection("users").doc(this.authUser.uid);
      //const res = await cityRef.update({active: false});
      //usersRef.update({active: false});

      return usersRef.update({
          active: false
      })
      .then(() => {
          //console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },

    /// Mensajes
    
    sendMessage() {
      //console.log("usrlogedID:  ",usrlogedID);
      //console.log("usrSelectedID;:  ",usrSelectedID);

      if(this.message != null) {
        //this.saveMessage();
        //console.log("idSelectedChat:  ",idSelectedChat);
        this.saveMessageNewVersion();
      }
    },

    saveMessage() { ///YA NO SE VA A USAR,BORRAR
      db.collection('chat').add({
        message: this.message,
        //createdAt: new Date(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        author: this.authUser.displayName,
        idUser: usrlogedID,
        idDestinatario: usrSelectedID,
        members:[usrlogedID,usrSelectedID]
      }).then(()=>{
        this.scrollToBottom();
      })
      this.message=null;
    },
    

    saveMessageNewVersion() {
     //console.log("idSelectedChat:  ",idSelectedChat);

      db.collection('chats').doc(idSelectedChat).collection('messages').doc().set({
        message: this.message,
        createdAt: new Date(),
        //createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        author: this.authUser.displayName,
        idUser: usrlogedID,
        
      }).then(()=>{
        this.scrollToBottom();
      })
      this.message=null;
    },


  
    //Borrar despues, no se usa, es la fomra mas basica de recuperacion  de todos los mensaje
    fetchMessages(){ 
      db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot)=>{
        let allMessages=[];
        querySnapshot.forEach(doc=>{
          allMessages.push(doc.data())
        }) 
        this.messages=allMessages;

        setTimeout(()=>{
          this.scrollToBottom();
        },1000);
      })
    },
    
    recuperarMensajes(){ ///YA NO SE VA A USAR
      const chatRef = db.collection('chat');
      
      this.unsubscribeListenerMSG = 
      chatRef
      .where('members', 'in', [[usrSelectedID,usrlogedID],[usrlogedID,usrSelectedID]])
      //.limit(3)
      .onSnapshot((querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        })

        //Ordena los mensajes en base a las fechas
        allMessages.sort(function (a, b) {
          if( a.createdAt > b.createdAt){
            return 1;
          }
          if( a.createdAt < b.createdAt){
            return -1;
          }
          return 0;
        });
        
        this.messages=allMessages;
        
        setTimeout(()=>{
          this.scrollToBottom();
        },100);
        
      })
      
    },


    recuperarMensajesNewVersion(){
      //console.log("recuperarMensajesNewVersion");
      //console.log("idSelectedChat:  ",idSelectedChat);

      const chatRef = db.collection('chats').doc(idSelectedChat).collection('messages');
      
      this.unsubscribeListenerMSG = 
      chatRef
      .orderBy("createdAt")
      //.limit(5)
      .onSnapshot((querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        })
        
        this.messages=allMessages;
        
        setTimeout(()=>{
          this.scrollToBottom();
        },100);
      })
    },

    selectUser(selectedUID){
      //console.log("selectUser");

      idSelectedChat = null;
      
      //este primero es neceasrio para cambiar de color cuando se selecciona el usuario
      this.idContactoSeleccionado = selectedUID;


      usrSelectedID = selectedUID;

      //LO siguiente es para que no haya tantos escuchadores activos
      if(this.unsubscribeListenerMSG){
        this.unsubscribeListenerMSG();
        this.unsubscribeListenerMSG = {};
        //console.log("SE DETUVO A ESCUCHA");
      }

      //console.log(usrSelectedID);
      //Revisa si han hablado el usuario logeado y el seleccionado
      this.checkGroupBetweenTwo();
      // /console.log("NO HAY ESCUCHAS ACTIVOS");
      // /console.log("this.unsubscribeListenerMSG:  ", this.unsubscribeListenerMSG);
      
      //this.recuperarMensajes();
      //this.recuperarMensajesNewVersion();

      //console.log("ESCUCHA ACTIVADO");
      //console.log("this.unsubscribeListenerMSG:  ", this.unsubscribeListenerMSG);      
    },


    //GRUPOS

    checkUser(){
      //console.log("checkUser");
      //REvisa y agrega el usuario logeado a la BD
      var docRef =  db.collection("users").doc(this.authUser.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          //console.log('Usuario ya existe');
        } else {
          this.saveUser();
        }
      }).catch((error) => {
        //el usuario ya está en la base de datos.
      });
    },

    checkGroupBetweenTwo(){
      //Revisa si han hablado el usuario logeado y el seleccionado
      //console.log("checkGroupBetweenTwo");

      var countGrupos = 0;

      var myMapMembers = {
          [usrlogedID]: true,
          [usrSelectedID]: true
        };
      
      //console.log("myMapMembers:  ",myMapMembers);
      //console.log(idSelectedChat);

      db.collection("groups")
      .where('members', '==', myMapMembers)
      .get()
      .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
            countGrupos++;
            idSelectedChat = doc.data().id_group;
            //console.log(doc.id, " => ", doc.data());
        });
        
        //Si no hay grupo entre dos usuarios los agrega a uno nuevo
        //console.log("countGrupos:  ",countGrupos);
        //console.log("idSelectedChat:  ",idSelectedChat);
        if(countGrupos == 0){
          this.saveGroupBetweenTwo();
        }
        this.recuperarMensajesNewVersion();
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      

    },

    generateDocID(collectionName){
      let ref = db.collection(collectionName).doc();
      let id_group = ref.id;

      return id_group;
    },

    saveGroupBetweenTwo() {
      //console.log("saveGroupBetweenTwo");
      
      //let ref = db.collection("groups").doc();
      //let id_group = ref.id;
      let id_group = this.generateDocID("groups");

      idSelectedChat = id_group;

      //console.log("id_group:  ", id_group);

      db.collection("groups").doc(id_group).set({
      //db.collection("groups").add({
        id_group: id_group,
        name: id_group,
        //createdAt: new Date(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        members: {
          [usrlogedID]: true,
          [usrSelectedID]: true
        }
      }).then(() => {
        //el usuario no está en la base de datos y fue insertado.
        // /console.log('Usuario agregado');

      }).catch((error) => {
      //el usuario ya está en la base de datos.
      //console.log("el usuario ya está en la base de datos.");
        console.log('Error: ', error);
      });

      //Agrega el id del grupo al mapa grupos de cada usuario
      this.addGroupToUser(usrlogedID, id_group);
      this.addGroupToUser(usrSelectedID, id_group);
      
    },


    addGroupToUser(id_user, id_group){    
      //console.log("addGroupToUser");
      //console.log("id_group:  ",id_group);

      let newGroup = "groups." + id_group;

      const usersRef = db.collection("users").doc(id_user);
      return usersRef.update({
        [newGroup]: true,
      })
      .then(() => {
          //console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    },

  },

  created(){
    //console.log("CREATED");
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.authUser=user;
        usrlogedID = this.authUser.uid;
        //Revisa si tengo guardado el usuario logeado en la BD
        this.checkUser();
        //Pone el estado del usuario como activo
        this.setUserActive();
        
      }else{
        //console.log("ESTE MENSAJE SE VE CUANDO SALE");
        this.authUser={}
      }
    })
    //this.fetchMessages(); //Borrar despues

    //Recupera todos los usuarios
    this.fetchUsers();
  },

  beforeRouteEnter(to,from,next){
    next(vm=>{
      //Este listener es necesario para que detecte si el usuario no esta logeado
      // o se deslogeo y  regrese a la pagina de login
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          next();
        }else{

        setTimeout(()=>{
          vm.$router.push('/login');
          // Cierra todas las conexiones abiertas
          location.reload();
        },500);
        }
      })
      
    })
  }

}

/*
ESTRUCTURA BD

  // Chats contains only meta info about each conversation
  // stored under the chats's unique ID
  "chats": {
    "one": {
      "title": "Historical Tech Pioneers",
      "lastMessage": "ghopper: Relay malfunction found. Cause: moth.",
      "timestamp": 1459361875666
    },
    "two": { ... },
    "three": { ... }
  },
}
*/

</script>


<style scoped="">
.container{
  max-width:1170px;
  margin:auto;
}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 46%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ 
  overflow:hidden; margin:2px 0 2px ;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.exit_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 7%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 77px;
}

.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}


/*Seccion de Estado si esta activo o inactivo*/
.status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}
.active {
  background: lightgreen;
}
.inactive {
  background: lightgray;
}

/*Sección para ocultar o mostrar input para escribir mensaje */
.hide{
  display: none;
}
.show{
  display: block;
}

</style>