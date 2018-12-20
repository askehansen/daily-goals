<template>
  <button type="button" class="w-item h-item -my-6 flex flex-col items-center justify-center text-white active-animated" @click="addRep" @touchstart="active=true" @touchend="active=false" :class="{ 'active': active, 'ml-auto': positionRight, 'text-green-light': isCompleted }">
    <svg width="140" class="progress absolute" height="140" viewBox="0 0 140 140">
      <circle class="progress__meter" cx="70" cy="70" r="60" stroke-width="7" />
      <circle ref="progress" class="progress__value" :class="animationClass" cx="70" cy="70" r="60" stroke-width="7" />
    </svg>

    <div class="font-black text-4xl">
      <div>{{item.reps}}/{{item.goal}}</div>
    </div>
    <div class="font-bold italic">{{item.title}}</div>



    <div class="star-wrapper1" v-if="isCompleted">

      <svg class="star" width="71px" height="22px" viewBox="0 0 71 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Artboard" transform="translate(-213.000000, -52.000000)" fill-rule="nonzero">
                  <g id="Group" transform="translate(213.000000, 52.000000)">
                      <polygon id="Star" fill="#F5A623" points="59 17.922433 51.946577 21.7082039 53.3674315 13.8301325 47.5873218 8.29179607 55.5188812 7.20865103 59 0 62.4811188 7.20865103 70.4126782 8.29179607 64.6325685 13.8301325 66.053423 21.7082039"></polygon>
                      <rect id="Rectangle" fill="#FFFFFF" opacity="0.496512277" x="0" y="11" width="30" height="3" rx="1.5"></rect>
                  </g>
              </g>
          </g>
      </svg>
    </div>
    <div class="star-wrapper2" v-if="isCompleted">

      <svg class="star" width="71px" height="22px" viewBox="0 0 71 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Artboard" transform="translate(-213.000000, -90.000000)" fill-rule="nonzero">
                  <g id="Group-Copy-3" transform="translate(213.000000, 90.000000)">
                      <polygon id="Star" fill="#B41680" points="59 17.922433 51.946577 21.7082039 53.3674315 13.8301325 47.5873218 8.29179607 55.5188812 7.20865103 59 0 62.4811188 7.20865103 70.4126782 8.29179607 64.6325685 13.8301325 66.053423 21.7082039"></polygon>
                      <rect id="Rectangle" fill="#FFFFFF" opacity="0.496512277" x="0" y="11" width="30" height="3" rx="1.5"></rect>
                  </g>
              </g>
          </g>
      </svg>
    </div>
    <div class="star-wrapper3" v-if="isCompleted">

      <svg class="star" width="71px" height="22px" viewBox="0 0 71 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Artboard" transform="translate(-214.000000, -124.000000)" fill-rule="nonzero">
                  <g id="Group-Copy-4" transform="translate(214.000000, 124.000000)">
                      <polygon id="Star" fill="#00DA80" points="59 17.922433 51.946577 21.7082039 53.3674315 13.8301325 47.5873218 8.29179607 55.5188812 7.20865103 59 0 62.4811188 7.20865103 70.4126782 8.29179607 64.6325685 13.8301325 66.053423 21.7082039"></polygon>
                      <rect id="Rectangle" fill="#FFFFFF" opacity="0.496512277" x="0" y="11" width="30" height="3" rx="1.5"></rect>
                  </g>
              </g>
          </g>
      </svg>
    </div>

  </button>

</template>

<script>
export default {
  name: 'Item',
  props: ['item', 'index'],
  data () {
    return {
      active: false,
      isAnimated: false
    }
  },
  methods: {
    addRep () {
      if (this.item.reps < this.item.goal) {
        this.item.reps++
      }
      else {
        this.item.reps = 0
      }

      this.$emit("update")
      this.$nextTick(() => {
        this.setProgress()
      })
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
    },
    animationClass () {
      if (this.item.goal === 1) {
        return 'spring-none'
      }
      else if (this.item.reps === 0) {
        return 'spring-end'
      }
      else if (this.item.reps == this.item.goal) {
        return 'spring-start'
      }
      else {
        return 'spring-both'
      }
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
  .spring-none {
    transition: all 300ms cubic-bezier(0.68, -0.00, 0.265, 1.00);
  }
  .spring-both {
    transition: all 300ms cubic-bezier(0.68, -0.30, 0.265, 1.50);
  }
  .spring-end {
    transition: all 300ms cubic-bezier(0.68, -0.00, 0.265, 1.50);
  }
  .spring-start {
    transition: all 300ms cubic-bezier(0.68, -0.30, 0.265, 1.00);
  }

  .star-wrapper1 {
    position: absolute;
    transform: rotate(-60deg);
  }
  .star-wrapper2 {
    position: absolute;
    transform: rotate(90deg);

  }
  .star-wrapper3 {
    position: absolute;
    transform: rotate(200deg);

  }


  .star {
    opacity: 0;
    animation: star 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-iteration-count: 1;
  }

  @keyframes star {
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(150px);
    }
  }
</style>
