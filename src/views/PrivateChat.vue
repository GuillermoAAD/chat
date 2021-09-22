<template>

<div class="container">
<h3 class=" text-center">Mensajes</h3>

<!--LOGOUT-->
<div class="">
  <button @click="logout" class="exit_btn" type="button"><i aria-hidden="true">SALIR</i></button>
</div>

<div class="messaging">
      <div class="inbox_msg">
        <!--INBOX-->
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <div id="showMenuChats" class="hide">
                <div class="left">
                  <button @click="showChats"><i class="fas fa-arrow-left"></i></button>
                </div>
                <div class="right">Nuevo chat</div>
              </div>
              <div id="showMenuContacts" class="show">
                <div class="left">Chats</div>
                <div class="right">
                  <button @click="showContacts"><i class="fas fa-address-book"></i></button>
                </div>
              </div>
            </div>
          </div>

          <div class="inbox_chat">
            <div id="contacts" class="hide">
              <div  v-for="user in users" :key="user.id">
                <!--<div :class="[idContactoSeleccionado==user.idUser?'active_chat':'']">-->
                  <a @click="selectUser(user.idUser ,user)">
                    <div class="chat_list ">
                      <div class="chat_people">
                        <div class="chat_ib">
                          <div :class="[user.active==true?['status','active']:['status','inactive']]"></div>
                          <h5>{{user.userName}}</h5>
                          <h5>{{user.phoneNumber}}</h5>
                        </div>
                      </div>
                    </div>
                  </a>
                <!--</div>-->
              </div>
            </div>

            <div id="chats" class="show">
              <!--<div  v-for="group in groups" :key="groups.id">-->
                <div  v-for="group in groups" :key="group.id">
                
                <div :class="[idChatSeleccionado==group.id_group?'active_chat':'']">
                  <a @click="selectChat(group.id_group)">
                    <div class="chat_list ">
                      <div class="chat_people">
                        <div class="chat_ib">
                          <!--<div :class="[user.active==true?['status','active']:['status','inactive']]"></div>-->
                          <!--<h5>{{group.id_group}}</h5>-->
                          <div :class="[checkIfIsRead(group.read)?'hide':'show']">
                            <i class="fas fa-envelope"></i>
                          </div>
                          
                          <h5>{{chatTitulo(group.id_group)}}</h5>
                        </div>
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
              <div :class="[message.idUser==authUser.uid?'outgoing_msg':'incoming_msg']">
                <div :class="[message.idUser==authUser.uid?'sent_msg':'received_msg']">
                  <div class="received_withd_msg">
                    <span class="time_date">
                      {{message.author}}
                    </span>
                    <p>{{message.message}}</p>
                    <span class="time_date">
                      {{message.timestamp.toDate().toLocaleString()}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!--Escribir y mandar mensaje-->
          <!--<div :class="[!idContactoSeleccionado?'hide':'show']">-->
            <div id="inputMessages" :class="[!idContactoSeleccionado?'hide':'show']">
            <div class="type_msg">
              <div class="input_msg_write">
                  <input @keyup.enter="sendMessage" v-model="message" type="text" class="write_msg" placeholder="Escribe un mensaje"/>
                  <button @click="sendMessage" class="msg_send_btn" type="button"><i class="fas fa-paper-plane" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
</template>

<script>

import firebase from 'firebase'

//let usrloged = null;
let usrlogedID = null;
let usrlogedName = null;
let usrSelected = null;
let usrSelectedID = null;
let usrSelectedName = null;
let idSelectedChat = null;
let usrloged = null;
let usrlogedGroups = null;


var unsubscribeListenerMSG = null;

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
        idContactoSeleccionado:null,
        idChatSeleccionado:null,
                
        contactoSeleccionado:{},

        myGroups:[],
        chats:{},
        groups:[],

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

    showChats(){
      let divShowMenuChats = document.getElementById("showMenuChats");
      let divShowMenuContacts = document.getElementById("showMenuContacts");
      let divContacts = document.getElementById("contacts");
      let divChats = document.getElementById("chats");

      if (divShowMenuChats.style.display != "none") {
        divShowMenuChats.style.display = "none";
        divShowMenuContacts.style.display = "inline";
        divContacts.style.display = "none";
        divChats.style.display = "inline";
      }
    },

    showContacts(){
      let divShowMenuChats = document.getElementById("showMenuChats");
      let divShowMenuContacts = document.getElementById("showMenuContacts");
      let divContacts = document.getElementById("contacts");
      let divChats = document.getElementById("chats");

      if (divShowMenuChats.style.display != "inline") {
        divShowMenuChats.style.display = "inline";
        divShowMenuContacts.style.display = "none";
        divContacts.style.display = "inline";
        divChats.style.display = "none";
      }
    },

    showInputMessages(){
      let divInputMessages = document.getElementById("inputMessages");
      divInputMessages.style.display = "inline";
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
          db.collection('users')
          .where("idUser", "!=", uid)
          .orderBy("idUser")
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
      if(this.message != null) {
        this.saveMessageNewVersion();
      }
    },    

    saveMessageNewVersion() {
     //console.log("idSelectedChat:  ",idSelectedChat);

      db.collection('messages').doc(idSelectedChat).collection('messages').doc().set({
        message: this.message,
        createdAt: new Date(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        author: this.authUser.displayName,
        idUser: usrlogedID,
        
      }).then(()=>{
        this.scrollToBottom();
      })
      
      let id_group = idSelectedChat;
      //this.editChatInfo(id_group, this.message);
      this.editTimestampGroup(id_group, this.message);
      
      this.message=null;

      this.setOthersAsUnread(usrlogedID, this.idChatSeleccionado);
    },

    recuperarMensajesNewVersion(){
      //console.log("recuperarMensajesNewVersion");
      //console.log("idSelectedChat:  ",idSelectedChat);

      const chatRef = db.collection('messages').doc(idSelectedChat).collection('messages');
      
      this.unsubscribeListenerMSG = 
      chatRef
      .orderBy("timestamp")
      //.limit(5) no funciona el limit como quiero, investigar mas
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

      //console.log("ANTES DE EDITAR LEIDOS");
      //console.log(this.idChatSeleccionado);
      // /console.log(usrlogedID);
      this.setOthersAsUnread(usrlogedID, this.idChatSeleccionado);
			
    },

    //CHATS
    saveChatInfo(id_group, myMapMembers) {
      //console.log("saveChatInfo()");
      //console.log("idSelectedChat:  ",id_group);

      db.collection("chatsInfo").doc(id_group).set({
        id_group: id_group,
        lastMessage: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        members: myMapMembers,
      }).then(() => {
      }).catch((error) => {
        console.log('Error: ', error);
      });
    },

    /*
    editChatInfo(id_group, msg){
      //console.log("editChatInfo");
      //console.log("id_group:  ",id_group);
      //console.log("msg:  ",msg);

      const usersRef = db.collection("chatsInfo").doc(id_group);
      return usersRef.update({
        lastMessage: msg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
          //console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },
    */

    /*
    fetchChatsInfo(){
      //console.log("fetchChatsInfo");
      //this.getMyGroups();
    },
    */

    /*
    getMyGroups(){
      ///la deje pendiente porque creo que seria mejor usar la coleccion de grupos en lugar
      //console.log("getMyGroups()");

      let grupos = {}
      db.collection("users").doc(usrlogedID)
      //.get()
      //.then((querySnapshot) => {
      .onSnapshot((querySnapshot) => {

        if(querySnapshot.exists){
          //let groups = null;
          
          if(querySnapshot.data().groups != null){
            let groups = querySnapshot.data().groups;

            //console.log("groups",groups);

            groups = Object.keys(groups);
            //console.log("groups",groups);
            
            db.collection("chatsInfo")
            .where("id_group", "in", groups)
            .get((querySnapshot_1) => { 
              let allChats = [];               
              querySnapshot_1.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                allChats.push(doc.data());
              });
              this.chats=allChats;
              //console.log("Chats:  ",this.chats);
            });
            
          } else {
            // /console.log("No hay datos");
          }
        }
            
      })
    },
    */

    /*
    fetchGroupsBUENO(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          //Recupera todos los grupos del usuario
          let userDat=db.collection('users')
          .where("idUser","==", uid).get();
          //console.log("userDat",userDat);
          
          //Recupera todos los grupos del usuario
          let query="members." + uid;
          db.collection("groups")
          .where(query, "==", true)
          //.orderBy("timestamp","desc")
          .onSnapshot((querySnapshot)=>{
            var allGroups=[];
            querySnapshot.forEach((doc) => {
              allGroups.push(doc.data());

            });

            allGroups = this.orderGroups(allGroups);

            this.groups=allGroups;
          });
        } else {
          // User is signed out
          // ...
        }
      });
    },
    */

    fetchGroups(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          //Recupera todos los grupos del usuario
          db.collection('users')
          .where("idUser","==", uid)
          //.get()
          //.then((querySnapshot) => {
          .onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
              let myGroups = doc.data().groups;
              myGroups = Object.keys(myGroups);
              //console.log("mygroups", myGroups);
              db.collection("groups")
              .where("id_group", "in", myGroups)
              .orderBy("timestamp","desc")
              .onSnapshot((querySnapshot)=>{
                var allGroups=[];
                querySnapshot.forEach((doc) => {
                  allGroups.push(doc.data());
                });

                this.groups=allGroups;
              });
            })
          })
        }
      })
    },

    /*
    orderGroups(allGroups){
      let m = allGroups.sort(function (a, b) {
              if( a.timestamp < b.timestamp){
                return 1;
              }
              if( a.timestamp > b.timestamp){
                return -1;
              }
              return 0;
            });

      return m;
    },
    */

    editTimestampGroup(id_group, msg){
      //console.log("id_group:  ",id_group);
      //console.log("msg:  ",msg);

      const usersRef = db.collection("groups").doc(id_group);
      return usersRef.update({
        lastMessage: msg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
          //console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },

    setOthersAsUnread(usrlogedID, idChatSelected){
      console.log("setOthersAsUnread");

      //let myGrupo = this.myObjectToMap(this.groups);
      var myGrupo = this.myObjectToArray(this.groups);
      console.log(myGrupo);
      let myGrupo2 = myGrupo.filter(obj => {
        return obj.id_group === idChatSelected
      })
      console.log("myGrupo2",myGrupo2);

      let myGrupo3 = this.myObjectToMap(myGrupo2);
      console.log("myGrupo3",myGrupo3);

      
      //this.

    },

    setAsRead(id_user, id_group){    
      console.log("setAsRead");
      //console.log("id_group:  ",id_group);
      let newRead = "read." + id_user;

      const usersRef = db.collection("groups").doc(id_group);
      return usersRef.update({
        [newRead]: true, //true significa que ha liedo los mensajes
      })
      .then(() => {
          //console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },

    setAsUnread(id_user, id_group){    
      console.log("setAsUnread");
      //console.log("id_group:  ",id_group);
      let newRead = "read." + id_user;

      const usersRef = db.collection("groups").doc(id_group);
      return usersRef.update({
        [newRead]: false, //true significa que ha liedo los mensajes
      })
      .then(() => {
          //console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },

    checkIfIsRead(read){
      //read = this.myObjectToArray(read);
      //myGroups = Object.keys(myGroups);
      read = this.myObjectToMap(read);
      //console.log("READ",read);
      //console.log("logeado",usrlogedID);
      //console.log("mi estado",read.get(usrlogedID));
      let isRead = false;

      isRead = read.get(usrlogedID);

      return isRead;
    },

    myObjectToArray(objectVar){
      var arrayVar = Object.keys(objectVar).map(key => {
        return objectVar[key];
      })
      return arrayVar;
    },

    myObjectToMap(objectVar){
      let keys = Object.keys(objectVar);
      let map = new Map();
      for(let i = 0; i < keys.length; i++){
        //inserting new key value pair inside map
        map.set(keys[i], objectVar[keys[i]]);
      };
      return map;
    },

    chatTitulo(id_group){
      //convierto el objeto de objetos en arreglo
      //var arrayGroups = Object.keys(this.groups).map(key => {
        //return this.groups[key];
      //})
      var arrayGroups = this.myObjectToArray(this.groups);
      //arrayGroups


      //extraigo el grupo actual a mostrar
      let actualGroup = arrayGroups.find(group => group.id_group === id_group);
      //console.log("actualGroup",actualGroup);

      let title = actualGroup.name;
      //console.log("actualGroupName",actualGroup.name);

      if (actualGroup.name == null) {
        let actualMembers = Object.keys(actualGroup.members);
        //console.log("actualGroupMembers",actualMembers);

        let idContacto = null;

        for(let member of actualMembers) {
          if(member != usrlogedID){
            //en este punto conseguimos el id del contacto
            idContacto = member;
          }
        }

        //ahora a buscar el nombre o telefeono del usuario con el que se tiene la conversacion
        var arrayUsers = this.myObjectToArray(this.users);
        //console.log("arrayUsers: ", arrayUsers);

        let actualUser = arrayUsers.find(user => user.idUser === idContacto);
        //console.log("actualUser: ", actualUser);
        //console.log("actualUser.userName: ", actualUser.userName);
        title = actualUser.userName;

        //en caso de que el nombre este vacio pone el numero
        if(title === null){
          title = actualUser.phoneNumber;
        }
      }
      
      return title;
    },

    selectChat(id_group){
      this.showInputMessages();
      this.idChatSeleccionado = id_group;
      idSelectedChat = id_group;
      this.stopListener();

      //console.log(idSelectedChat);
      this.recuperarMensajesNewVersion();//descomentar
      
    },

    /*
    async getUserData(id){
      var usersRef = db.collection("users").doc(id);
      let usrrname =null;
      let userData = await usersRef.get()
      .then((doc) => {
        if (doc.exists) {
          
          usrrname=doc.data().userName;
          // /console.log('username: ',usrrname);
        } else {
        }
      }).catch((error) => {
        //el usuario ya está en la base de datos.
      });

      //console.log("USERDATA", usrrname);
      return usrrname;
    },
    */

    selectUser(selectedUID, selectedUser){
      this.showChats();
      //console.log("selectUser");

      //console.log("selectuseridSelectedChat",idSelectedChat);
      
      idSelectedChat = null;
      
      //este primero es neceasrio para cambiar de color cuando se selecciona el usuario
      //this.idContactoSeleccionado = selectedUID;
      this.idContactoSeleccionado = selectedUser.idUser;
      
      //usrSelectedID = selectedUID;
      usrSelectedID = selectedUser.idUser;

      usrSelected = selectedUser;
      //console.log("id: ",usrSelectedID);
      //console.log("name: ",usrSelected.userName);
      //console.log("usr: ",usrSelected);

      //LO siguiente es para que no haya tantos escuchadores activos
      this.stopListener();
      /*
      if(this.unsubscribeListenerMSG){

        this.unsubscribeListenerMSG();
        this.unsubscribeListenerMSG = {};
        //console.log("SE DETUVO A ESCUCHA");
      }
      */

      //console.log(usrSelectedID);
      //Revisa si han hablado el usuario logeado y el seleccionado
      this.checkGroupBetweenTwo();
      
    },

    stopListener(){
      if(this.unsubscribeListenerMSG){
        this.unsubscribeListenerMSG();
        this.unsubscribeListenerMSG = {};
        //console.log("SE DETUVO A ESCUCHA");
      }
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
      //console.log(idSelectedChat);

      db.collection("groups")
      .where('members', '==', myMapMembers)
      .get()
      .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
            countGrupos++;
            idSelectedChat = doc.data().id_group;
            this.idChatSeleccionado = idSelectedChat;
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
      let id_group = this.generateDocID("groups");

      idSelectedChat = id_group;
      this.idChatSeleccionado = idSelectedChat;

      db.collection("groups").doc(id_group).set({
        id_group: id_group,
        //name: id_group,
        name: null,
        //createdAt: new Date(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        members: {
          [usrlogedID]: true,
          [usrSelectedID]: true
        },
        lastMessage: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(() => {
      }).catch((error) => {
        console.log('Error: ', error);
      });

      let myMapMembers = {
          [usrlogedID]: true,
          [usrSelectedID]: true
        };

      this.saveChatInfo(id_group, myMapMembers);

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
        usrlogedName = this.authUser.userName;
        //Revisa si tengo guardado el usuario logeado en la BD
        this.checkUser();
        //Pone el estado del usuario como activo
        this.setUserActive();

        //this.fetchChatsInfo();
        
      }else{
        //console.log("ESTE MENSAJE SE VE CUANDO SALE");
        this.authUser={}
      }
    })

    //Recupera todos los usuarios
    this.fetchUsers();
    this.fetchGroups();
    
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
.headind_srch{
  padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;
}

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

.active_chat{ 
  background:#b6b4b4;
  }

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
  display: inline;
}

.left{
  float: left;
}

.right{
  float: right;
}

#chats div:hover{
  background:#d8d6d6;
}

#contacts div:hover{
  background:#d8d6d6;
}

#chats, #contacts div:active{
  background:#b6b4b4;
}



</style>