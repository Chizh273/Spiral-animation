import { compose, map } from 'ramda'
import { applyOffset, generateCanvas, generateFigure } from './common'
import {
  MAX_ANGLE,
  MIN_ANGLE,
  POINT_COUNT,
  RADIAN_IN_ONE_DEG
} from './constants'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const OFFSET = { x: WIDTH / 2, y: HEIGHT / 2 }

const canvas = generateCanvas(WIDTH, HEIGHT)
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

let angle = MIN_ANGLE
let angleStep = 0.23

ctx.strokeStyle = 'red'
ctx.fillStyle = 'red'
ctx.lineWidth = 2

const figureGenerator = generateFigure(POINT_COUNT, Math.min(WIDTH, HEIGHT), 25)
const canvasOffset = applyOffset(OFFSET)

function render() {
  const points = figureGenerator(angle * RADIAN_IN_ONE_DEG)
  const firstPoint = canvasOffset(points[0])

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  ctx.moveTo(firstPoint.x, firstPoint.y)

  map(
    compose(point => ctx.arc(point.x, point.y, 5, 0, 360), canvasOffset),
    points
  )

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
