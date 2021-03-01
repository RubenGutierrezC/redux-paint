import { MouseEvent, useEffect } from 'react';

import { useCanvas } from './CanvasContext';
import { clearCanvas, drawStroke, setCanvasSize } from './utils/canvasUtils';
// componetns
import { ColorPanel } from './components/ColorPanel';
import { EditPanel } from './components/EditPanel';
import { FilePanel } from './components/FilePanel';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { beginStroke, updateStroke } from './redux/currentStroke/slice';
import { endStroke } from './redux/sharedActions'

// selectors
import { currentStrokeSelector } from './redux/currentStroke/selectors';
import { historyIndexSelector } from './redux/historyIndex/selectors';
import { strokesSelector } from './redux/strokes/selectors';
import { ModalLayer } from './components/ModalLayer';


const WIDTH = 1024
const HEIGHT = 768


function App() {
  // redux
  const dispatch = useDispatch()
  const currentStroke = useSelector(currentStrokeSelector)
  const historyIndex = useSelector(historyIndexSelector)
  const strokes = useSelector(strokesSelector)
  const isDrawing = !!currentStroke.points.length

  // canvas
  const canvasRef = useCanvas()
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {
      canvas,
      context: canvas?.getContext('2d')
    }
  }

  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) {
      return
    }

    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    )
  }, [currentStroke])


  useEffect(() => {
    const {canvas, context } = getCanvasWithContext()
    if (!context || !canvas) {
      return
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas)
      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach((stroke) => {
          drawStroke(context, stroke.points, stroke.color)
        })
    })
    //eslint-disable-next-line
  }, [historyIndex, strokes])

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!canvas || !context) {
      return
    }

    setCanvasSize(canvas, WIDTH, HEIGHT)

    context.lineJoin = "round"
    context.lineCap = "round"
    context.lineWidth = 5
    context.strokeStyle = "black"

    clearCanvas(canvas)
  }, [])

  const startDrawing = (
    { nativeEvent }: MouseEvent<HTMLCanvasElement>
  ) => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke({x: offsetX, y: offsetY}))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ stroke: currentStroke, historyIndex }))
    }
  }

  const draw = (
    { nativeEvent }: MouseEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    dispatch(updateStroke({ x: offsetX, y: offsetY }))
  }

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <ColorPanel />
      <EditPanel />
      <FilePanel />
      <ModalLayer />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;
