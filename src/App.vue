<template>
  <div id="app" v-bind:class="{ 'night-mode': nightMode }">
    <h1>Music Recs</h1>
    <p><span class="link" @click="toggleNightMode">night mode</span></p>

    <span class="link" @click="filterNone">all</span> &nbsp;
    <span class="link" @click="filterYoutube()">youtube</span>&nbsp;
    <span class="link" @click="clearFilters();filterSpotify()">spotify</span>&nbsp;
    <span class="link" @click="clearFilters();filterBandcamp()">bandcamp</span>&nbsp;
    <span class="link" @click="clearFilters();filterSoundcloud()">soundcloud</span>&nbsp;
    <span class="link" @click="clearFilters();filterOther()">other</span>
    <br /><br />
    <h2>{{currentFilter}}</h2> 
    <!-- <Paginate v-bind:initialMessages="this.messages" v-on:next-ten="nextTenMessages"/> -->
    <hr />
    <br />

    <div v-if="this.currentFilter == 'All'">
      <RenderMessages v-bind:initialMessages="this.messages" />  
    </div>
    <div v-else>
      <RenderMessages v-bind:initialMessages="this.filteredMessages" />  
    </div>
      


<!-- <RenderMessages v-bind:initialMessages="this.youtubeMessages" />
<RenderMessages v-bind:initialMessages="this.messages" />    
     -->

    
    <!-- <section v-for="message in messages">
        <div v-if="message.type == 'youtube'">
          <iframe width="560" height="315" v-bind:src="'https://www.youtube.com/embed/' + message.youtubeId" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
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

        <p><small>Posted by {{message.user}} on {{message.createdTimestamp}}</small></p>
        <hr />
        <br />
    </section> -->
    
  </div>
</template>

<script>

import Paginate from './components/Paginate.vue'
import RenderMessages from './components/RenderMessages.vue'

export default {
  name: 'app',
  data: function(){
    return {
      allMessages: [],
      // filteredMessages: [],
      messages: [],
      currentFilter: 'All',
      nightMode: false
    }
  },
  components: {
    Paginate,
    RenderMessages
  },
  computed: {
    filteredMessages() {
      return this.messages.filter(message => {
         return message.type == this.currentFilter
      })
    },
  },
  methods: {
    clearFilters() {
      this.messages = this.allMessages;
      this.currentFilter = 'All'
    },
    filterYoutube() {
      this.currentFilter = 'youtube'
    }, 
    filterSoundcloud() {
      this.currentFilter = 'soundcloud'
    }, 
    filterBandcamp() {
      this.currentFilter = 'bandcamp'
    },    
    filterSpotify() {
      this.currentFilter = 'spotify'
    },  
    filterOther() {
      this.currentFilter = 'other'
    },               
    filterNone() {
      this.messages = this.allMessages
      this.currentFilter = 'All'
    },
    toggleNightMode() {
      this.nightMode = !this.nightMode
    }  
  },
  mounted() {

    
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");

     // load  messages

    firebase.firestore().collection("messages").orderBy("createdTimestamp", "desc").get().then((querySnapshot) => {
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
      })
    }).then(() =>{
      this.messages = this.allMessages
    })  

  }
}
</script>

<style>
  .link {
    color: blue;
    cursor: pointer;
  }

  body {
    padding: 0;
    margin: 0;
  }

  #app {
    padding: 10px;
    margin: 0;
    height: 100%;
  }

  .night-mode {
    background-color: #021626;
    color: white;

  }

  .night-mode .link, .night-mode a {
    color: #ffd874
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
