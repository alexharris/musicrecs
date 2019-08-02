<template>
  <div>
    <p>
      <span v-if="this.startingPoint >= 10" @click="getPrevious10Messages();" ><span class="link"><< 10</span> | </span>    
      <span v-if="this.startingPoint >= 10">Viewing {{startingPoint + 1}}—{{endNumber}} of {{initialMessages.length}}</span>
      <span v-else>Viewing 1—10 of {{initialMessages.length}}</span>  
      <span v-if="this.startingPoint + 10 < initialMessages.length" @click="getNext10Messages();" > | <span class="link"> >> 10</span></span>
    </p>

    <hr />  
    <div v-for="(message, index) in messages">
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
    </div>  
  </div>
</template>

<script>

import firebase from 'firebase/app'

export default {
  name: 'RenderMessages',
  props: ['initialMessages', 'initialStartingPoint', 'resetPagination'],
  data: function(){
    return {
      startingPoint: this.initialStartingPoint,
    }
  },
  computed: {
    messages() {
      return this.initialMessages.slice(this.startingPoint, this.startingPoint + 10);
    },
    endNumber() {
      if(this.startingPoint + 10 > this.initialMessages.length) {
        return this.initialMessages.length
      } else {
        return this.startingPoint + 10
      }
    }
  },
  watch: {
    // When a filter button is clicked, this resets the pagination
    resetPagination() {
      this.startingPoint = 0
    },
  }, 
  methods: {
    getNext10Messages() {
      this.startingPoint = this.startingPoint  + 10
    },
    getPrevious10Messages() {
      this.startingPoint = this.startingPoint - 10
    }    
  }
}
</script>