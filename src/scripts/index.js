import { applyRotate, generateCanvas, generateFigure } from './common'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const MAX_POINTS_COUNT = 50
// const MIN_POINTS_COUNT = 20

export const DEG_180 = 180
export const RADIAN_IN_ONE_DEG = Math.PI / DEG_180

let angle = 0

const canvas = generateCanvas(WIDTH, HEIGHT)
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const points = generateFigure(MAX_POINTS_COUNT, WIDTH, HEIGHT)

function render() {
  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'red'
  ctx.strokeWidth = 10
  ctx.moveTo(points[0].x, points[0].y)

  points.map((point, i) => {
    points[i] = applyRotate(angle, point)

    ctx.lineTo(point.x, point.y)
    ctx.arc(point.x, point.y, 2, 0, 360)
  })

  ctx.stroke()
  ctx.fill()
  ctx.closePath()

  angle += RADIAN_IN_ONE_DEG

  requestAnimationFrame(render)
}

render()
