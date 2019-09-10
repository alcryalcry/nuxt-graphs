const lineColor = '#27e8a7'
const borderColor = lineColor
const gridColor = '#303e49'
const bgColor = '#232937'
const textColor = '#91d4b5'

const drawLine = (ctx, startCircle, endCircle, component) => {
  const lineWidth = 3

  if (component) component.linesCount += 0.5 // count lines for calc genus

  ctx.beginPath()
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.moveTo(startCircle.x, startCircle.y)
  ctx.lineTo(endCircle.x, endCircle.y)
  ctx.stroke()
  ctx.closePath()
}

const drawCircle = (ctx, colWidth, item) => {
  const radius = colWidth / 2.5
  const circleBackground = item.value >= 0 ? lineColor : bgColor
  const borderWidth = 3

  ctx.beginPath()
  ctx.fillStyle = borderColor
  ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.fillStyle = circleBackground
  ctx.arc(item.x, item.y, radius - borderWidth, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
}

const drawText = (ctx, colWidth, item) => {
  ctx.beginPath()
  ctx.font = `${colWidth / 25}rem Roboto`
  ctx.fillStyle = item.value >= 0 ? bgColor : textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(item.value, item.x, item.y)
  ctx.closePath()
}

const showGrid = (ctx, grid, rowHeight, colWidth) => {
  ctx.beginPath()
  for (let rowIndex = 0; rowIndex < grid.rows; rowIndex++) {
    for (let colIndex = 0; colIndex < grid.cols; colIndex++) {
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1
      ctx.rect(colWidth * colIndex, rowHeight * rowIndex, colWidth, rowHeight)
      ctx.stroke()
    }
  }
  ctx.closePath()
}

export { drawLine, drawCircle, drawText, showGrid }
