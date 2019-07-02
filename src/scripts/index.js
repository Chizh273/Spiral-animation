import { applyOffset, generateCanvas, generateFigure } from './common'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const POINTS_COUNT = 20
const DEG_180 = 180
const RADIAN_IN_ONE_DEG = Math.PI / DEG_180
const OFFSET = { x: WIDTH / 2, y: HEIGHT / 2 }

const MIN_ANGLE = -360
const MAX_ANGLE = 360

const canvas = generateCanvas(WIDTH, HEIGHT)
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

let angle = MIN_ANGLE
let angleStep = 0.21

ctx.strokeStyle = 'red'
ctx.fillStyle = 'red'
ctx.lineWidth = 2

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()

  let points = generateFigure(
    POINTS_COUNT,
    Math.min(WIDTH, HEIGHT),
    25,
    angle * RADIAN_IN_ONE_DEG
  )
  const firstPoint = applyOffset(OFFSET, points[0])

  ctx.moveTo(firstPoint.x, firstPoint.y)

  points.map(point => {
    const tempPoint = applyOffset(OFFSET, point)

    ctx.lineTo(tempPoint.x, tempPoint.y)
    ctx.moveTo(tempPoint.x, tempPoint.y)
    ctx.arc(tempPoint.x, tempPoint.y, 5, 0, 360)
  })

  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  angle += angleStep

  if (angle < MAX_ANGLE + 1 && angle > MAX_ANGLE - 1) {
    angleStep = -0.1
  } else if (angle < MIN_ANGLE + 1 && angle > MIN_ANGLE - 1) {
    angleStep = 0.1
  }

  requestAnimationFrame(render)
}

render()
