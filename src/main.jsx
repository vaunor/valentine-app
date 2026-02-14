import React from 'react'
import { createRoot } from 'react-dom/client'
import LoveStepsApp from './LoveStepsApp'
import './index.css' // если есть, не обязательно

createRoot(document.getElementById('root')).render(<LoveStepsApp />)
