<template>
  <div class="w-item h-item -my-6 flex flex-col items-center justify-center text-white" @click="addRep" :class="{ 'ml-auto': positionRight, 'text-green-light': isCompleted }">
    <svg width="140" class="progress absolute" height="140" viewBox="0 0 140 140">
      <circle class="progress__meter" cx="70" cy="70" r="60" stroke-width="7" />
      <circle ref="progress" class="progress__value" cx="70" cy="70" r="60" stroke-width="7" />
    </svg>

    <div class="font-black text-4xl">
      <div>{{item.reps}}/{{item.goal}}</div>
    </div>
    <div class="font-bold italic">{{item.title}}</div>
  </div>

</template>

<script>
export default {
  name: 'Item',
  props: ['item', 'index'],
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
    setProgress () {
      let progressValue = this.$refs['progress']

      const RADIUS = 60;
      const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

      progressValue.style.strokeDasharray = CIRCUMFERENCE;

      let value = this.item.reps / this.item.goal * 100

      let progress = value / 100;
      let dashoffset = CIRCUMFERENCE * (1 - progress);
      progressValue.style.strokeDashoffset = dashoffset;
    }
  },
  computed: {
    positionRight () {
      return this.index % 2 === 1
    },
    isCompleted () {
      return (this.item.reps >= this.item.goal)
    }
  },
  mounted () {
    this.setProgress()
  }
}
</script>

<style>
  .progress {
      transform: rotate(-90deg);
  }

  .progress__meter,
  .progress__value {
      fill: none;
  }

  .progress__meter {
      stroke: #5D5961;
  }

  .progress__value {
      stroke: #51d88a;
      stroke-linecap: round;
  }
</style>
