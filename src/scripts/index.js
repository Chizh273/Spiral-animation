import {
  applyOffset,
  applyRotate,
  generateCanvas,
  generateFigure,
} from './common'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const MAX_POINTS_COUNT = 50
// const MIN_POINTS_COUNT = 20
const DEG_180 = 180
const RADIAN_IN_ONE_DEG = Math.PI / DEG_180

let angle = 0

const canvas = generateCanvas(WIDTH, HEIGHT)
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const points = generateFigure(MAX_POINTS_COUNT, WIDTH, HEIGHT)
const offset = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'red'
  ctx.strokeWidth = 10

  const firstPoint = applyOffset(offset, applyRotate(angle, points[0]))

  ctx.moveTo(firstPoint.x, firstPoint.y)

  points.map(point => {
    const tempPoint = applyOffset(offset, applyRotate(angle, point))

    ctx.lineTo(tempPoint.x, tempPoint.y)
    ctx.arc(tempPoint.x, tempPoint.y, 2, 0, 360)
  })

  ctx.stroke()
  ctx.fill()
  ctx.closePath()

  angle += RADIAN_IN_ONE_DEG

  requestAnimationFrame(render)
}

render()
