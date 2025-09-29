export class TrailCanvas {
  constructor(width = 512, height = 512) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width;
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')

    //@faridguzman91 - init with black background
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, width, height)

    //circle properties
    this.circleRadius = width*0.12
    this.fadeAlpha = 0.025 //control fade speed

  }

  update(mouse) {
    //apply fade effect by drawing a semi transparent black rect
    this.ctx.fillStyle = `rgba(0, 0, ${this.fadeAlpha})`
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)

    if (mouse && mouse.x !== undefined && mouse.y !== undefined) {
      //save state
      this.ctx.save()

      //apply blur
      this.ctx.filter = 'blur(4px)'

      const gradientRadius = this.circleRadius * 2.5
      const gradient = this.ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, gradientRadius
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)'); // slightly brighter center for blur
      gradient.addColorStop(0.08, 'rgba(255, 255, 255, 0.5)'); // very quick initial fade
      gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.35)'); // gentle fade
      gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.2)'); // gradual fade
      gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.12)'); // soft fade
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)'); // very soft
      gradient.addColorStop(0.65, 'rgba(255, 255, 255, 0.03)'); // almost invisible
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.01)'); // ultra soft
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // transparent edges

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath()
      this.ctx.arc(mouse.x, mouse.y, gradientRadius, 0, Math.PI * 2)
      this.ctx.fill()

      this.ctx.restore()
    }
  }
}
