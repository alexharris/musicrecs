<template>
  <div id="app" v-bind:class="{ 'night-mode': nightMode }">
    <h1>Music Recs</h1>
    <p><span class="link" @click="toggleNightMode">night mode</span></p>

    <span v-bind:class="{ link: currentFilter != 'All' }" @click="filterNone">all</span> &nbsp;
    <span v-bind:class="{ link: currentFilter != 'youtube' }" @click="clearFilters();filterYoutube()">youtube</span>&nbsp;
    <span v-bind:class="{ link: currentFilter != 'spotify' }" @click="clearFilters();filterSpotify()">spotify</span>&nbsp;
    <span v-bind:class="{ link: currentFilter != 'bandcamp' }" @click="clearFilters();filterBandcamp()">bandcamp</span>&nbsp;
    <span v-bind:class="{ link: currentFilter != 'soundcloud' }" @click="clearFilters();filterSoundcloud()">soundcloud</span>&nbsp;
    <span v-bind:class="{ link: currentFilter != 'other' }" @click="clearFilters();filterOther()">other</span>
    <br /><br />
    <h2>{{currentFilter}}</h2> 

      <!-- {{filteredMessages}} -->
      <RenderMessages 
        v-bind:initialMessages="this.filteredMessages"
        v-bind:initialStartingPoint="this.initialStartingPoint" 
        v-bind:resetPagination="this.resetPagination"
      />  
  


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

import RenderMessages from './components/RenderMessages.vue'

export default {
  name: 'app',
  data: function(){
    return {
      allMessages: [], // this holds all the messages as originally queried from firebase
      messages: [], // this is used for transitioning between all and filtered
      currentFilter: 'All',
      nightMode: false,
      initialStartingPoint: 0, // the first ten show initially, so start paginating at 11
      resetPagination: 0  //this is jsut something to iterate on to force the child component to notice whena  filter button is clicked
    }
  },
  components: {
    RenderMessages
  },
  computed: {
    filteredMessages() {
      if(this.currentFilter == 'All') {
        return this.allMessages
      } else {
        return this.messages.filter(message => {
          return message.type == this.currentFilter
        })
      }

    },
  },
  methods: {
    clearFilters() {
      console.log('clear filters')
      this.messages = this.allMessages;
      this.currentFilter = 'All'
      this.resetPagination = this.resetPagination + 1
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
    },
    nextTenMessages(messages) {
      console.log(messages)
      this.messages = messages
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
    text-decoration: underline;
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
    color: #ffd874;
    text-decoration: underline;
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
