<template>
  <div>
    <div v-for="message in messages">
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
  props: ['initialMessages'],
  data: function(){
    return {
      startingPoint: 0,
    }
  },
  computed: {
    messages() {
      return this.initialMessages
    }
  }
}
</script>