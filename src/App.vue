<template>
  <div id="app">
    <h1>Music Recs</h1>

    <span class="link" @click="filterNone">all</span> &nbsp;
    <span class="link" @click="clearFilters();filterYoutube()">youtube</span>&nbsp;
    <span class="link" @click="clearFilters();filterSpotify()">spotify</span>&nbsp;
    <span class="link" @click="clearFilters();filterBandcamp()">bandcamp</span>&nbsp;
    <span class="link" @click="clearFilters();filterSoundcloud()">soundcloud</span>&nbsp;
    <span class="link" @click="clearFilters();filterOther()">other</span>
    <br /><br />
    <hr />
    <br />
    <section v-for="message in messages">
        <div v-if="message.type == 'youtube'">
          <iframe width="560" height="315" v-bind:src="'https://www.youtube.com/embed/' + message.youtubeId" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <!-- Need to use SoundCloud API to get Track ID for embedding-->
        <div v-else-if="message.type == 'soundcloud'">
          <a :href="message.url">{{message.url}}</a>
        </div>
        <div v-else-if="message.type == 'spotify'">
          <iframe v-if="message.spotifyTrackOrAlbum == 'album'" v-bind:src="'https://open.spotify.com/embed/album/' + message.spotifyId" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <iframe v-else-if="message.spotifyTrackOrAlbum == 'track'" v-bind:src="'https://open.spotify.com/embed/track/' + message.spotifyId" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>       
        
        <div v-else-if="message.type == 'bandcamp'">
          <a :href="message.url">{{message.url}}</a>
        </div>  

        <div v-else-if="message.type == 'other'">
          <a :href="message.url">{{message.url}}</a>
        </div>                 

      <!-- {{message.type}} -->
      <p><small>Posted by {{message.user}} on {{message.createdTimestamp}}</small></p>
      <hr />
      <br />
    </section>
    
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function(){
    return {
      allMessages: [],
      filteredMessages: [],
      messages: []
    }
  },
  methods: {
    clearFilters() {
      this.messages = this.allMessages;
      this.filteredMessages = []
    },
    filterYoutube() {
      console.log('youtube')
      return this.messages.filter((message) => {
        if(message.type == 'youtube') {
          this.filteredMessages.push(message)
        }
        this.messages = this.filteredMessages
        
      })
    }, 
    filterSoundcloud() {
      return this.messages.filter((message) => {
        if(message.type == 'soundcloud') {
          this.filteredMessages.push(message)
        }
        this.messages = this.filteredMessages
        
      })
    }, 
    filterBandcamp() {
      return this.messages.filter((message) => {
        if(message.type == 'bandcamp') {
          this.filteredMessages.push(message)
        }
        this.messages = this.filteredMessages
        
      })
    },    
    filterSpotify() {
      return this.messages.filter((message) => {
        if(message.type == 'spotify') {
          this.filteredMessages.push(message)
        }
        this.messages = this.filteredMessages
        
      })
    },  
    filterOther() {
      return this.messages.filter((message) => {
        if(message.type == 'other') {
          this.filteredMessages.push(message)
        }
        this.messages = this.filteredMessages
        
      })
    },               
    filterNone() {
      this.messages = this.allMessages
    }
  },
  mounted() {

    const Discord = require('discord.js');
    const client = new Discord.Client();
    
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");


    client.on('ready', () => {
      console.log('I am ready!');
    });

    // Create an event listener for messages
    client.on('message', message => {
      // If the message is "ping"
      if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong1');
        console.log('pong: ' + Date.now())
      } else if (message.content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
        
        message.react("🤖")
        console.log('link received')
        
        if (message.content.includes('youtube') === true || message.content.includes('youtu.be') === true ) {
          console.log('youtube received')
          // message.channel.send('youtube')
          var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
          var url = message.content.match(validUrlRegex)

          console.log(url)

          // Get youtube id from url
          
          var youtubeId;

          if (url[0].split('v=')[1] != undefined) {
            youtubeId = url[0].split('v=')[1];
            var ampersandPosition = youtubeId.indexOf('&');
            if(ampersandPosition != -1) {
              youtubeId = youtubeId.substring(0, ampersandPosition);
            }
          } else if (url[0].substring(url[0].lastIndexOf('/') + 1) != undefined) {
            youtubeId = url[0].substring(url[0].lastIndexOf('/') + 1)
          }


          firebase.firestore().collection("messages").add({
              message: message.content,
              user: message.author.username,
              createdTimestamp: message.createdTimestamp,
              youtubeId: youtubeId,
              type: 'youtube'
          })
        } else if (message.content.includes('spotify') === true) {

          console.log('spotify received')

          var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
          var url = message.content.match(validUrlRegex)
  
          // Get spotify id from url
          var spotifyId = url[0].substring(url[0].lastIndexOf('/') + 1)

          // check to see if this is an album
          if(url[0].includes('album')) {
            //then write the data
            firebase.firestore().collection("messages").add({
                message: message.content,
                user: message.author.username,
                createdTimestamp: message.createdTimestamp,
                url: url[0],
                type: 'spotify',
                spotifyId: spotifyId,
                spotifyTrackOrAlbum: 'album'
            })          
          // or if it is a track
          } else if (url[0].includes('track')) {
            // then write the data
            firebase.firestore().collection("messages").add({
                message: message.content,
                user: message.author.username,
                createdTimestamp: message.createdTimestamp,
                url: url[0],
                type: 'spotify',
                spotifyId: spotifyId,
                spotifyTrackOrAlbum: 'track'
            })    
          } else {
            console.log('Not a valid Spotify link')
          }
        }    
        else if (message.content.includes('soundcloud') === true) {

          console.log('soundcloud received')

          var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
          var url = message.content.match(validUrlRegex)
          
          firebase.firestore().collection("messages").add({
              message: message.content,
              user: message.author.username,
              createdTimestamp: message.createdTimestamp,
              url: url[0],
              type: 'soundcloud'
          })
        }   
        else if (message.content.includes('bandcamp') === true) {

          console.log('bandcamp received')

          var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
          var url = message.content.match(validUrlRegex)
          console.log(url)

          firebase.firestore().collection("messages").add({
              message: message.content,
              user: message.author.username,
              createdTimestamp: message.createdTimestamp,
              url: url[0],
              type: 'bandcamp'
          })
        } else {
          console.log('other link received')

          var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
          var url = message.content.match(validUrlRegex)

          firebase.firestore().collection("messages").add({
              message: message.content,
              user: message.author.username,
              createdTimestamp: message.createdTimestamp,
              url: url[0],
              type: 'other'
          })        
        }  
      }

    
    });

    // Log our bot in using the token from https://discordapp.com/developers/applications/me
    client.login(process.env.VUE_APP_CLIENT_TOKEN);


     // load existing messages

    firebase.firestore().collection("messages").orderBy("createdTimestamp").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().url);
        this.allMessages.push({
          url: doc.data().url,
          user: doc.data().user,
          type: doc.data().type,
          youtubeId: doc.data().youtubeId,
          spotifyId: doc.data().spotifyId,
          spotifyTrackOrAlbum: doc.data().spotifyTrackOrAlbum,
          createdTimestamp: new Date(doc.data().createdTimestamp)
        })
      });
    });    
  },
  created() {
    this.messages = this.allMessages

  }
}
</script>

<style>
  .link {
    color: blue;
    cursor: pointer;
  }
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
