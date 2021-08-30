<template>
<div class="container">
<h3 class=" text-center">Mensajes</h3>


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
                      <h5>{{user.userName}}</h5>
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
              <div :class="[message.author==authUser.displayName?'outgoing_msg':'incoming_msg']">
                <div :class="[message.author==authUser.displayName?'sent_msg':'received_msg']">
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
          <!--PARA OCULTAR SI NO SE HA SELECCIONADO
          <div :class="[message.author==authUser.displayName?'sent_msg':'received_msg']">-->
          <div class="type_msg">
            <div class="input_msg_write">
              <input @keyup.enter="sendMessage" v-model="message" type="text" class="write_msg" placeholder="Escribe un mensaje" />
              <button @click="sendMessage" class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true">►</i></button>
            </div>
          </div>
        </div>
      </div>
      
      <!--<p class="text-center top_spac"> Design by <a target="_blank" href="https://www.linkedin.com/in/sunil-rajput-nattho-singh/">Sunil Rajput</a></p>-->
      
    </div></div>
</template>

<script>

import firebase from 'firebase'

let usrlogedID = {};
let usrSelectedID = {};

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


        users:[],
        destinatario:{},
        idDestinatario: {},
        idContactoSeleccionado:{},
        contactoSeleccionado:{},
     }
  },
  methods: {
    scrollToBottom(){
      let box=document.querySelector('.msg_history');
      box.scrollTop=box.scrollHeight;
    },

    logout(){
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    },

    /// usuarios
    checkUser(){
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
      //Save to firestore
      db.collection("users").doc(this.authUser.uid).set({
        idUser: this.authUser.uid,
        userName: this.authUser.displayName,
        groups: {},
        registeredAt: new Date()
        
      }).then(() => {
        //el usuario no está en la base de datos y lo inserta.
        //console.log('Usuario agregado');

      }).catch((error) => {
      //el usuario ya está en la base de datos.
        console.log('Error: ', error);
      });
    },

    fetchUsers(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          //Recupera todos los usuarios excepto el actual
          //NOTA: Cambiar eL escuchador por un get() seria mejor???
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

    /// Mensajes
    checkMembers(){
      //REvisa si el chat con la persona existe existe
      const membersRef = db.collection('members');

      let members = membersRef
      .where('members', 'in', [[usrlogedID,usrSelectedID]])
      .get();

      console.log("CHAT:   ",members.id);

/*
      //Esto era para probar dividir el documento y hacerlo consumir menos recursos

      if(!members.id){
        //Es la id del chat que es tambien la del documento
        var newMemberRef = db.collection("members").doc();

        console.log("DOCID:  ",newMemberRef.id);


        console.log("uslog:  ",usrlogedID);
        console.log("usrselc:  ",usrSelectedID);
        //Guarda informacion del chat

        db.collection("members").doc(newMemberRef.id).set({
        //membersRef.doc(newMemberRef.id).add({
//        newMemberRef.add({
          id:newMemberRef.id,
          members:{usrlogedID,usrSelectedID}
        }).then(() => {
        //el usuario no está en la base de datos y lo inserta.
        console.log('Usuario agregado');

        }).catch((error) => {
        //el usuario ya está en la base de datos.
          console.log('Error: ', error);
        });

        
      }
      */

      
      
      
    },
    
    sendMessage() {
      console.log("usrlogedID:  ",usrlogedID);
      console.log("usrSelectedID;:  ",usrSelectedID);
      
      this.saveMessage();
      

      //TODO lo comentado  era para probar dividir el documento y hacerlo consumi menos recursos
      //this.checkMembers();
      
      //Guarda informacion del chat
//      db.collection('chats').add({
      //newChatRef.add({
        //idChat:newChatRef,
        //title:"titulo",
        // /lastMessage:"ultimo mensaje",
        //createdAt: new Date(),

        // /message: this.message,
        
      //}).then(function(docRef){
        //console.log
        //this.scrollToBottom();
//      })

      //Guardo el mensaje
      //Guarda informacion de los miembros participantes del chat
      //.doc(this.authUser.uid).set({
        /*
      db.collection('members').add({
        title:,
        lastMessage:

        createdAt: new Date(),

        message: this.message,
        
      }).then(()=>{
        this.scrollToBottom();
      })
      */

    },

    saveMessage() {
      //Save to firestore

      db.collection('chat').add({
        message: this.message,
        createdAt: new Date(),
        author: this.authUser.displayName,
        idUser: usrlogedID,
        idDestinatario: usrSelectedID,
        members:[usrlogedID,usrSelectedID]
        
      }).then(()=>{
        this.scrollToBottom();
      })
      this.message=null;
    },
  
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
    
    recuperarMensajes(){
      const chatRef = db.collection('chat');
      
      chatRef
      .where('members', 'in', [[usrSelectedID,usrlogedID],[usrlogedID,usrSelectedID]])
      .onSnapshot((querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        })

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
        },1000);
        
      })
      
    },

    selectUser(selectedUID){
      //este primero es neceasrio para cambiar de color cuando se selecciona el usuario
      this.idContactoSeleccionado = selectedUID;

      usrSelectedID = selectedUID;

      this.recuperarMensajes();
    },
    
  },
  created(){
    
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.authUser=user;
        usrlogedID = this.authUser.uid;
        this.checkUser();
      }else{
        this.authUser={}
      }
    })
    //this.fetchMessages();
    this.fetchUsers();
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          next();
        }else{
          vm.$router.push('/login')
        }
      })
      
    })
  }

}
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
</style>
