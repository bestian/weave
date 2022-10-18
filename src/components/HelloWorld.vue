<template>
  <div>
    <canvas ref="Canvas" id="canvas" width="350" height="350">
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

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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
      while (this.h < window.innerWidth / 2 || this.h < 40 + window.innerHeight / 2) {
        if (this.h < 40 + window.innerHeight / 2) {
          this.drawH(this.h)
          this.drawH(window.innerHeight - this.h)
          await delay(1)
        }
        if (this.h < window.innerWidth / 2) {
          this.drawL(this.h)
          this.drawL(window.innerWidth - this.h)
          await delay(1)
        }
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
      var delta = 0
      while (t < window.innerHeight) {
        delta += Math.floor(Math.random() * 5) - 2
        this.ctx.beginPath()
        this.ctx.moveTo(delta + k, t)
        this.ctx.lineTo(delta + k, t + 10)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.moveTo(getRandomInt(0, 2) + delta + k, getRandomInt(0, 2) + t)
        this.ctx.lineTo(getRandomInt(0, 2) + delta + k, getRandomInt(0, 2) + t + 10)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.moveTo(delta + k + 20, t)
        this.ctx.lineTo(delta + k + 20, t + 10)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.moveTo(getRandomInt(0, 2) + delta + k + 20, getRandomInt(0, 2) + t)
        this.ctx.lineTo(getRandomInt(0, 2) + delta + k + 20, getRandomInt(0, 2) + t + 10)
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
      var t = -20
      var delta = 0
      while (t < window.innerWidth) {
        delta += Math.floor(Math.random() * 5) - 2
        this.ctx.beginPath()
        this.ctx.moveTo(t, delta + h)
        this.ctx.lineTo(t + 10, delta + h)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.moveTo(getRandomInt(0, 2) + t, getRandomInt(0, 2) + delta + h)
        this.ctx.lineTo(getRandomInt(0, 2) + t + 10, getRandomInt(0, 2) + delta + h)
        this.ctx.stroke()
        await delay(0.005)
        t += 10
      }
      this.h += 30
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

  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:200,900');

  * {
    box-sizing: border-box;
  }

  button {
    position:relative;
    z-index: 2;
    font-size: 22px;
    padding: 10px 20px;
    border: none;
    background: none;
    cursor: pointer;
    font-family: "Source Code Pro";
    font-weight: 900;
    text-transform: uppercase;
    font-size: 30px;
    color: purple;
    background-color: #9f9;
    box-shadow: gray 2px 2px 22px;
    border-radius: 4px;
    z-index: 0;
    overflow: hidden;
  }

  button:focus {
    outline-color: transparent;
    box-shadow: blue 2px 2px 22px;
  }

  .right::after, button::after {
    content: purple;
    display: block;
    position: absolute;
    white-space: nowrap;
    padding: 40px 40px;
    pointer-events:none;
  }

  button::after{
    font-weight: 200;
    top: -30px;
    left: -20px;
  }

  .right, .left {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .right {
    left: 66%;
  }
  .left {
    right: 66%;
  }
  .right::after {
    top: -30px;
    left: calc(-66% - 20px);
    background-color: blue;
    color:transparent;
    transition: transform .4s ease-out;
    transform: translate(0, -90%) rotate(0deg)
  }

  button:hover .right::after {
    transform: translate(0, -47%) rotate(0deg)
  }

  button .right:hover::after {
    transform: translate(0, -50%) rotate(-7deg)
  }

  button .left:hover ~ .right::after {
    transform: translate(0, -50%) rotate(7deg)
  }

  /* bubbles */
  button::before {
    content: '';
    pointer-events: none;
    opacity: .6;
    background:
      radial-gradient(circle at 20% 35%,  transparent 0,  transparent 2px, black 3px, blue 4px, transparent 4px),
      radial-gradient(circle at 75% 44%, transparent 0,  transparent 2px, black 3px, blue 4px, transparent 4px),
      radial-gradient(circle at 46% 52%, transparent 0, transparent 4px, black 5px, blue 6px, transparent 6px);

    width: 100%;
    height: 300%;
    top: 0;
    left: 0;
    position: absolute;
    animation: bubbles 5s linear infinite both;
  }

  @keyframes bubbles {
    from {
      transform: translate();
    }
    to {
      transform: translate(0, -66.666%);
    }
  }

</style>
