<template>
  <div id="app">
    <div class="bg-green-light h-12 fixed pin-t pin-x flex items-center justify-center font-bold text-white">
      <div>Daily goals</div>
    </div>

    <div class="pt-12 pb-16">
      <item :item="item" @update="update" @remove="remove" v-for="item in items" :key="item.id"></item>
    </div>

    <div class="fixed pin-x pin-b bg-white flex h-16 px-2 items-center -mx-2">
      <input class="border-2 rounded flex-grow px-6 py-3 mx-2" type="text" v-model="newItem.title" @keyUp.enter="add">
      <input class="border-2 rounded w-12 flex-none text-center py-3 mx-2" type="text" v-model="newItem.goal" @keyUp.enter="add">
      <button type="button" class="mx-2 text-white font-bold uppercase px-6 py-3 rounded text-center bg-green" @click="add">Add</button>
    </div>

  </div>
</template>

<script>
import '@/assets/styles/main.css'

import Item from './components/Item'

export default {
  name: 'App',
  components: {
    Item
  },
  data () {
    return {
      items: [],
      newItem: {}
    }
  },
  methods: {
    remove (item) {
      this.$delete(this.items, this.items.indexOf(item))
    },
    updatedAt () {
      let date = new Date()
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    },
    add () {
      this.items.push(this.newItem)
      this.initNewItem()
    },
    update () {
      localStorage.items = JSON.stringify(this.items)
    },
    initNewItem () {
      this.newItem = {
        title: '',
        id: Math.round(Math.random() * 10000),
        reps: 0,
        goal: 1
      }
    }
  },
  watch: {
    items () {
      this.update()
    }
  },
  mounted () {
    this.initNewItem()
    if (localStorage.items) {
      this.items = JSON.parse(localStorage.items)
    }
    if (localStorage.updatedAt !== this.updatedAt()) {
      this.items.forEach((item) => {
        item.reps = 0
      })
      localStorage.updatedAt = this.updatedAt()
    }
  }
}
</script>
