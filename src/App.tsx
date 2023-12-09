import { useWindowSize, useInterval } from 'usehooks-ts'
import "./css/herta.css"
import { useState } from 'react'

const Herta = ({ left, top }: { left: number, top: number }) => {
  return <div className='Herta' style={{
    left: left,
    top: top
  }} />

}

const Heading = ({ children = '' }: { children: string }) => {
  return <h1 className='Heading'>{children}</h1>
}

const App = () => {
  const { width, height } = useWindowSize()
  const left = Math.random() * (width - 300)
  const top = Math.random() * (height - 300)
  const [element, setElement] = useState(<Herta left={left} top={top} />)

  useInterval(
    () => {
      const left = Math.random() * (width - 300)
      const top = Math.random() * (height - 300)

      setElement(<Herta left={left} top={top} />)
    },
    2500
  )

  return (
    <div className='Container'>
      <Heading>Kuru Kuru Kururing~</Heading>
      {element}
    </div>
  )
}

export default App
