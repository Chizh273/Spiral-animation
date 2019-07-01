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
  const offset = {
    x: canvasWidth / 3,
    y: canvasHeight / 2,
  }

  return range(points + 1, 1, -1).map(i => {
    return applyOffset(offset, {
      x: size / i,
      y: 0,
    })
  })
}

export const applyOffset = (offset, point) => ({
  x: offset.x + point.x,
  y: offset.y + point.y,
})
