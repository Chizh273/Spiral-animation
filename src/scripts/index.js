import { generateCanvas, generateFigure } from './common'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const MAX_POINTS_COUNT = 100
// const MIN_POINTS_COUNT = 20

const canvas = generateCanvas(WIDTH, HEIGHT)
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const points = generateFigure(MAX_POINTS_COUNT, WIDTH, HEIGHT)

ctx.strokeStyle = 'red'
ctx.strokeWidth = 10
ctx.moveTo(points[0].x, points[0].y)

points.map(point => {
  ctx.lineTo(point.x, point.y)
  ctx.arc(point.x, point.y, 10, 0, 360)
})

ctx.stroke()
ctx.closePath()
