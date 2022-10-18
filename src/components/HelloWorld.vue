<template>
  <canvas ref="Canvas" id="canvas" width="350" height="350">
  </canvas>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      canvas: '',
      isDrawing: false,
      X: '',
      Y: ''
    }
  },
  mounted () {
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')
    this.canvas = context
    canvas.addEventListener('touchstart', this.beginTouchDrawing, false)
    canvas.addEventListener('touchmove', this.TouchDrawing, false)
  },
  methods: {
    beginTouchDrawing (event) {
      this.isDrawing = true
      const pos = this.touchPose(event)
      this.drawLine(pos[0], pos[1])
      this.X = pos[0]
      this.Y = pos[1]
      event.preventDefault()
    },
    touchPose (e) {
      if (e.touches) {
        if (e.touches.length === 1) { // Only deal with one finger
          const touch = e.touches[0] // Get the information for finger #1
          return [touch.pageX - touch.target.offsetLeft, touch.pageY - touch.target.offsetTop]
        }
      }
    },
    TouchDrawing (event) {
      if (this.isDrawing) {
        const pose = this.touchPose(event)
        this.drawLine(this.X, this.Y, pose[0], pose[1])
        this.X = pose[0]
        this.Y = pose[1]
        event.preventDefault()
      }
    },
    drawLine (X, Y, newX, newY) {
      const ctx = this.canvas
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(X, Y)
      ctx.lineTo(newX, newY)
      ctx.stroke()
      ctx.closePath()
      ctx.lineCap = 'round'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
