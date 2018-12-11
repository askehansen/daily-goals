<template>
  <div class="flex items-center my-4 pl-6">
    <svg width="70" class="progress absolute" height="70" viewBox="0 0 70 70" @click="addRep">
      <circle class="progress__meter" cx="35" cy="35" r="30" stroke-width="4" />
      <circle ref="progress" class="progress__value" cx="35" cy="35" r="30" stroke-width="4" />
    </svg>
    <div style="width: 70px; height: 70px" class="font-bold rounded-full flex-none flex justify-center items-center" :class="{ 'text-green-light': isCompleted }" @click="addRep">
      <div>{{item.reps}}/{{item.goal}}</div>
    </div>
    <div class="ml-6 flex-grow font-bold" @click="addRep">{{item.title}}</div>
    <button v-if="editMode" type="button" class="text-grey p-4 text-xs font-bold uppercase rounded text-center" @click="remove(item)">Remove</button>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item', 'editMode'],
  methods: {
    addRep () {
      if (this.item.reps < this.item.goal) {
        this.item.reps++
      }
      else {
        this.item.reps = 0
      }

      this.$emit("update")
      this.setProgress()
    },
    remove (item) {
      this.$emit("remove", item)
    },
    setProgress () {
      let progressValue = this.$refs['progress']

      const RADIUS = 30;
      const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

      progressValue.style.strokeDasharray = CIRCUMFERENCE;

      let value = this.item.reps / this.item.goal * 100

      let progress = value / 100;
      let dashoffset = CIRCUMFERENCE * (1 - progress);
      progressValue.style.strokeDashoffset = dashoffset;
    }
  },
  computed: {
    isCompleted () {
      return (this.item.reps >= this.item.goal)
    }
  },
  mounted () {
    this.setProgress()
  }
}
</script>
