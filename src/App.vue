<template>
  <div id="app">
    <div class="bg-green-light pt-safe fixed pin-t pin-x">
      <div class="h-12 flex items-center justify-center relative">
        <div class="font-bold text-white">Daily goals</div>
        <button type="button" class="absolute pin-r pin-t h-12 px-4 text-white text-xs font-bold uppercase" @click="editMode = !editMode">
          <span v-if="editMode">Done</span>
          <span v-else>Edit</span>
        </button>
      </div>
    </div>

    <div class="h-screen flex flex-col items-center justify-center mx-4" v-if="!editMode && items.length === 0">
      <div class="font-bold w-32 text-center text-grey-dark">You dont have any goals yet</div>
      <button type="button" @click="editMode = true" class="mt-12 bg-green-light text-lg py-5 w-full rounded text-white font-bold">Let's add a new goal</button>
    </div>

    <div class="pb-safe pt-safe">
      <div class="pt-12">
        <item :item="item" :editMode="editMode" @update="update" @remove="remove" v-for="item in items" :key="item.id"></item>
        <div class="flex p-2 items-center -mx-1" v-if="editMode">
          <input class="appearance-none border-2 rounded flex-grow px-6 py-3 mx-1" autofocus type="text" ref="new-item-title" v-model="newItem.title" @keyup.enter="add">
          <input class="appearance-none border-2 rounded w-12 flex-none text-center py-3 mx-1" type="text" v-model="newItem.goal" @keyup.enter="add">
          <button type="button" class="mx-1 text-white font-bold uppercase px-6 py-3 rounded text-center bg-green-light" @click="add">Add</button>
        </div>
      </div>
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
      editMode: false,
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
      this.refs["new-item-title"].focus()
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
