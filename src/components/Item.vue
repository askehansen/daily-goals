<template>
  <div class="flex items-center my-4">
    <div class="w-16 h-16 mx-6 border-4 font-bold rounded-full flex-none flex justify-center items-center" :class="{ 'border-green-light': isCompleted }" @click="addRep">
      <div>{{item.reps}}/{{item.goal}}</div>
    </div>
    <div class="flex-grow font-bold">{{item.title}}</div>
    <button v-if="editMode" type="button" class="text-grey p-4 text-xs font-bold uppercase rounded text-center" @click="remove(item)">Remove</button>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item', 'editMode'],
  methods: {
    addRep () {
      this.item.reps++
      this.$emit("update")
    },
    remove (item) {
      this.$emit("remove", item)
    }
  },

  computed: {
    isCompleted () {
      return (this.item.reps >= this.item.goal)
    }
  }
}
</script>
