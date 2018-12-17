<template>
  <div class="flex p-2 items-center -mx-1">
    <input class="appearance-none bg-transparent text-white border-2 border-grey-darker rounded flex-grow px-6 py-3 mx-1" type="text" v-model="item.title">
    <input class="appearance-none bg-transparent text-white border-2 border-grey-darker rounded w-12 flex-none text-center py-3 mx-1" type="text" v-model="item.goal">

    <button type="button" class="mx-1 text-white font-bold uppercase px-6 py-3 rounded text-center bg-green-light" @click="create" v-if="isNew">Add</button>
    <button type="button" class="mx-1 text-grey-dark font-bold uppercase px-6 py-3 text-xs rounded text-center" @click="remove" v-else>Remove</button>
  </div>
</template>

<script>
export default {
  name: 'ItemForm',
  props: ['item', 'isNew'],
  watch: {
    'item.title' () {
      this.$emit("update")
    },
    'item.goal' () {
      this.$emit("update")
    }
  },
  methods: {
    create () {
      this.$emit("create", this.item)
    },
    remove () {
      this.$emit("remove", this.item)
    }
  }
}
</script>
