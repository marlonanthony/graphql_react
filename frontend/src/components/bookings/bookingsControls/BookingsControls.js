import React from 'react'

import './BookingsControls.css'

export default function BookingsControls(props) {
  return (
    <div>
        <button 
          className={props.activeOutputType === 'list' ? 'active' : ''} 
          onClick={props.onChange.bind(this, 'list')} >
            List
        </button>
        <button 
          className={props.activeOutputType === 'chart' ? 'active' : ''} 
          onClick={props.onChange.bind(this, 'chart')} >
            Chart
        </button>
    </div>
  )
}
