import { compose, map } from 'ramda'
import { applyOffset, generateCanvas, generateFigure } from './common'
import { RADIAN_IN_1_DEG } from './constants'

import * as dat from 'dat.gui'

const gui = new dat.GUI()

let angle = -360
const settings = {
  MIN_ANGLE: -360,
  MAX_ANGLE: 360,
  POINT_COUNT: 20,
  angleStep: 0.23,
  acceleration: 25,
  lineWidth: 2,
  color: '#ff0000'
}

gui
  .add(settings, 'MIN_ANGLE')
  .min(-360)
  .max(360)
  .onChange(val => (angle = angle < val ? val : angle))
gui
  .add(settings, 'MAX_ANGLE')
  .min(-360)
  .max(360)
  .onChange(val => (angle = angle > val ? val : angle))
gui
  .add(settings, 'POINT_COUNT')
  .min(10)
  .max(50)
gui
  .add(settings, 'angleStep')
  .min(0)
  .max(1)
gui
  .add(settings, 'acceleration')
  .min(10)
  .max(50)
gui
  .add(settings, 'lineWidth')
  .min(1)
  .max(5)
gui.addColor(settings, 'color')

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const OFFSET = { x: WIDTH / 2, y: HEIGHT / 2 }
const canvasOffset = applyOffset(OFFSET)

const { canvas, ctx } = generateCanvas(WIDTH, HEIGHT)

function render() {
  const points = generateFigure(
    settings.POINT_COUNT,
    Math.min(WIDTH, HEIGHT),
    settings.acceleration,
    angle * RADIAN_IN_1_DEG
  )
  const firstPoint = canvasOffset(points[0])

  ctx.strokeStyle = settings.color
  ctx.fillStyle = settings.color
  ctx.lineWidth = settings.lineWidth

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  ctx.moveTo(firstPoint.x, firstPoint.y)

  map(
    compose(point => ctx.arc(point.x, point.y, 5, 0, 360), canvasOffset),
    points
  )

  ctx.stroke()

  angle += settings.angleStep

  if (angle < settings.MAX_ANGLE + 1 && angle > settings.MAX_ANGLE - 1) {
    settings.angleStep = -0.1
  } else if (angle < settings.MIN_ANGLE + 1 && angle > settings.MIN_ANGLE - 1) {
    settings.angleStep = 0.1
  }

  requestAnimationFrame(render)
}

render()
