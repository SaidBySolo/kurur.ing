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

  useEffect(() => {
    if (width <= 768) {
      setRealWidthHerta(widthHerta / 3)
      setRealHeightHerta(heightHerta / 3)
    } else {
      setRealWidthHerta(widthHerta / 1.5)
      setRealHeightHerta(heightHerta / 1.5)
    }
  }, [width, height])

  const [transform, setTransform] = useState({
    x: Math.random() * (realWidthHerta - width) + height,
    y: Math.random() * (realHeightHerta - height) + width,
    xSpeed: 1,
    ySpeed: 1,
  })

  useInterval(
    () => {
      setTransform(prevState => {
        const newX = prevState.x + prevState.xSpeed;
        const newY = prevState.y + prevState.ySpeed;
        let newXSpeed = prevState.xSpeed;
        let newYSpeed = prevState.ySpeed;

        if (newX + realWidthHerta / 2 >= width / 2 || newX - realWidthHerta / 2 <= -width / 2) {
          newXSpeed = -newXSpeed;
        }

        if (newY + realHeightHerta / 2 >= height / 2 || newY - realHeightHerta / 2 <= -height / 2) {
          newYSpeed = -newYSpeed;
        }

        return {
          x: newX,
          y: newY,
          xSpeed: newXSpeed,
          ySpeed: newYSpeed
        };
      });
    }, 6
  )
  return (
    <div className='Container'>
      <Heading>Kuru Kuru Kururing~</Heading>
      <Herta x={transform.x} y={transform.y} />
    </div>
  )
}

export default App
