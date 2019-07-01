import { range } from 'lodash'

export const generateCanvas = (width, height) => {
  const canvas = document.createElement('canvas')
  canvas.classList.add('canvas')

  canvas.width = width
  canvas.height = height

  return canvas
}

export const generateFigure = (points, canvasWidth, canvasHeight) => {
  const size = Math.min(canvasWidth, canvasHeight)
  const step = size / points / 2
  const rangedArray = range(1, points + 1)

  const negativePart = rangedArray.map(i => ({ x: step * i * -1, y: 0 }))
  const positivePart = rangedArray.map(i => ({ x: step * i, y: 0 }))

  return [...negativePart, { x: 0, y: 0 }, ...positivePart]
}

export const applyOffset = (offset, point) => ({
  x: offset.x + point.x,
  y: offset.y + point.y,
})

export const applyRotate = (angle, point) => ({
  x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
  y: point.x * Math.sin(angle) + point.y * Math.cos(angle),
})
