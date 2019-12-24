const lineColor = '#27e8a7'
const borderColor = lineColor
const gridColor = '#303e49'
const bgColor = '#232937'
const textColor = '#91d4b5'

export const drawTools = {
  methods: {
    drawLine(startCircle, endCircle) {
      const lineWidth = 3

      this.linesCount += 0.5 // count lines for calc genus

      this.ctx.beginPath()
      this.ctx.strokeStyle = lineColor
      this.ctx.lineWidth = lineWidth
      this.ctx.moveTo(startCircle.x, startCircle.y)
      this.ctx.lineTo(endCircle.x, endCircle.y)
      this.ctx.stroke()
      this.ctx.closePath()
    },
    drawCircle(item) {
      const radius = this.colWidth / 2.5
      const circleBackground = item.value >= 0 ? lineColor : bgColor
      const borderWidth = 3

      this.ctx.beginPath()
      this.ctx.fillStyle = borderColor
      this.ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI)
      this.ctx.fill()

      this.ctx.beginPath()
      this.ctx.fillStyle = circleBackground
      this.ctx.arc(item.x, item.y, radius - borderWidth, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.closePath()
    },
    drawText(item) {
      this.ctx.beginPath()
      this.ctx.font = `${this.colWidth / 25}rem Roboto`
      this.ctx.fillStyle = item.value >= 0 ? bgColor : textColor
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(item.value, item.x, item.y)
      this.ctx.closePath()
    },
    showGrid() {
      this.ctx.beginPath()
      for (let rowIndex = 0; rowIndex < this.grid.rows; rowIndex++) {
        for (let colIndex = 0; colIndex < this.grid.cols; colIndex++) {
          this.ctx.strokeStyle = gridColor
          this.ctx.lineWidth = 1
          this.ctx.rect(this.colWidth * colIndex, this.rowHeight * rowIndex, this.colWidth, this.rowHeight)
          this.ctx.stroke()
        }
      }
      this.ctx.closePath()
    }
  }
}
