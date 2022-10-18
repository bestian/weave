<template>
  <div>
    <canvas ref="Canvas" id="canvas" width="350" height="350" @mousedown="startPainting" @mouseup="finishedPainting" @mousemove="draw" @touchstart="startTouchPainting" @touchmove="drawTouch" @touchend="finishedPainting">
    </canvas>
    <button @click="weave()" v-show="!d">開始紡織(Start Weaving)</button>
    <button @click="clear()" v-show="q">清除(Clear)</button>
  </div>
</template>

<script>

function delay (n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000)
  })
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      d: false,
      q: false,
      vueCanvas: null,
      painting: false,
      canvas: null,
      ctx: null,
      color: '#4060BF',
      k: 5,
      h: 5
    }
  },
  mounted () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Resize canvas
    this.canvas.height = window.innerHeight - 100
    this.canvas.width = window.innerWidth - 20
  },
  methods: {
    async weave () {
      this.d = true
      this.k = 5
      /* while (this.k < window.innerWidth) {
        this.drawL(this.k)
        await delay(0.2)
      } */
      this.h = 5
      while (this.h < window.innerWidth || this.h < window.innerHeight) {
        this.drawH(this.h)
        await delay(1)
        this.drawL(this.h)
        await delay(1)
      }
      this.q = true
    },
    async drawL (k) {
      k -= 40
      // const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      this.ctx.lineWidth = Math.floor(Math.random() * 5) + 5
      var gradient = this.ctx.createLinearGradient(0, 0, window.innerWidth, 0)
      gradient.addColorStop('0', 'red')
      gradient.addColorStop('0.2', 'orange')
      gradient.addColorStop('0.3', 'yellow')
      gradient.addColorStop('0.5', 'green')
      gradient.addColorStop('0.7', 'blue')
      gradient.addColorStop('0.9', '#4B0082')
      gradient.addColorStop('1.0', 'purple')
      this.ctx.fillStyle = gradient
      this.ctx.strokeStyle = gradient
      this.ctx.lineCap = 'round'
      var t = 0
      while (t < window.innerHeight) {
        this.ctx.beginPath()
        this.ctx.moveTo(k, t)
        this.ctx.lineTo(k, t + 10)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.moveTo(k + 20, t)
        this.ctx.lineTo(k + 20, t + 10)
        this.ctx.stroke()
        await delay(0.005)
        t += 10
      }
    },
    async drawH (h) {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      this.ctx.lineWidth = Math.floor(Math.random() * 5) + 5
      this.ctx.fillStyle = randomColor
      this.ctx.strokeStyle = randomColor
      this.ctx.lineCap = 'round'
      var t = 0
      while (t < window.innerWidth) {
        this.ctx.beginPath()
        this.ctx.moveTo(t, h)
        this.ctx.lineTo(t + 10, h)
        this.ctx.stroke()
        await delay(0.005)
        t += 10
      }
      this.h += 40
    },
    startPainting (e) {
      this.painting = true
      console.log(this.painting)
      this.draw(e)
    },
    startTouchPainting (e) {
      e.preventDefault()
      this.painting = true
      console.log(this.painting)
      this.drawTouch(e)
    },
    finishedPainting () {
      this.painting = false
      console.log(this.painting)
      this.ctx.beginPath()
      this.toBlob()
    },
    drawTouch (e) {
      e.preventDefault()
      console.log(e)
      if (!this.painting) return
      this.ctx.lineWidth = 10
      this.ctx.fillStyle = this.color
      this.ctx.strokeStyle = this.color
      this.ctx.lineCap = 'round'
      this.ctx.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    },
    draw (e) {
      if (!this.painting) return
      this.ctx.lineWidth = 10
      this.ctx.fillStyle = this.color
      this.ctx.strokeStyle = this.color
      this.ctx.lineCap = 'round'
      this.ctx.lineTo(e.clientX, e.clientY)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(e.clientX, e.clientY)
    },
    clear () {
      this.d = false
      this.q = false
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.finishedPainting()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  canvas {
    border: 3px gold ridge;
    position: absolute;
    top: 0;
    left: 0;
  }

  button {
    position: relative;
    z-index: 2;
    font-size: 22px;
  }

</style>
