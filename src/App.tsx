import { useWindowSize, useInterval } from 'usehooks-ts'
import "./css/herta.css"
import { useEffect, useState } from 'react'

// { left, top }: { left: number, top: number }

const widthHerta = 425
const heightHerta = 340


const Herta = ({ x, y }: { x: number, y: number }) => {
  const styles = {
    transform: `translate(${x}px, ${y}px)`
  };
  return <div className='Herta' style={styles} />

}

const Heading = ({ children = '' }: { children: string }) => {
  return <h1 className='Heading'>{children}</h1>
}

const App = () => {
  const { width, height } = useWindowSize()
  const [realWidthHerta, setRealWidthHerta] = useState(widthHerta / 1.5)
  const [realHeightHerta, setRealHeightHerta] = useState(heightHerta / 1.5)

  const setHertaSize = () => {
    if (width <= 768) {
      setRealWidthHerta(widthHerta / 2.5)
      setRealHeightHerta(heightHerta / 2.5)
    } else {
      setRealWidthHerta(widthHerta / 1.5)
      setRealHeightHerta(heightHerta / 1.5)
    }
  }

  useEffect(() => {
    setHertaSize()
  }, [width])

  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    xSpeed: 1,
    ySpeed: 1,
  })

  useInterval(() => {
    setTransform(prevState => {
      const { x, y, xSpeed, ySpeed } = prevState;
      const halfWidth = realWidthHerta / 2;
      const halfHeight = realHeightHerta / 2;
      const halfWindowWidth = width / 2;
      const halfWindowHeight = height / 2;

      let newX = x + xSpeed;
      let newY = y + ySpeed;
      let newXSpeed = xSpeed;
      let newYSpeed = ySpeed;

      if (newX + halfWidth >= halfWindowWidth || newX - halfWidth <= -halfWindowWidth) {
        newX = newX + halfWidth >= halfWindowWidth ? halfWindowWidth - halfWidth : -halfWindowWidth + halfWidth;
        newXSpeed = -xSpeed;
      }

      if (newY + halfHeight >= halfWindowHeight || newY - halfHeight <= -halfWindowHeight) {
        newY = newY + halfHeight >= halfWindowHeight ? halfWindowHeight - halfHeight : -halfWindowHeight + halfHeight;
        newYSpeed = -ySpeed;
      }

      return {
        x: newX,
        y: newY,
        xSpeed: newXSpeed,
        ySpeed: newYSpeed
      };
    });
  }, 6);
  return (
    <div className='Container'>
      <Heading>Kuru Kuru Kururing~</Heading>
      <Herta x={transform.x} y={transform.y} />
    </div>
  )
}

export default App
