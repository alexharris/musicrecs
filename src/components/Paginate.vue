<template>
  <div class="paginate">
      <span @click="getNext10Messages(); $emit('next-ten', messages)" >next</span>
      <section v-for="message in messages">
        {{message}}
      </section>
  </div>
</template>

<script>

import firebase from 'firebase/app'

export default {
  name: 'Paginate',
  props: ['initialMessages'],
  data: function(){
    return {
      startingPoint: 0,
      messages: this.initialMessages
    }
  },
  methods: {
    sayHello() {
      console.log('hello')
    },
    getNext10Messages() {
      this.messages = []
      this.messages = this.initialMessages.slice(this.startingPoint, this.startingPoint + 10);
      this.startingPoint = this.startingPoint  + 10
    },

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
