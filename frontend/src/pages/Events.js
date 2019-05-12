import React, { Component, Fragment } from 'react' 

import Modal from '../components/Modal/Modal'
import Backdrop from '../components/backdrop/Backdrop'
import './Events.css'

class EventsPage extends Component {
    state = { creating: false }

    startCreateEventHandler = () => {
        this.setState({ creating: true })
    }

    modalConfirmHandler = () => {
        this.setState({ creating: false })
    }

    modalCancelHandler = () => {
        this.setState({ creating: false })
    }

    render() {
        const { creating } = this.state 
        return (
            <Fragment>
                { creating && <Backdrop />}
                { creating && (
                    <Modal 
                        title='Add Event' 
                        canCancel 
                        canConfirm 
                        onCancel={this.modalCancelHandler} 
                        onConfirm={this.modalConfirmHandler}
                    >
                        <p>Modal Content</p>
                    </Modal>
                )}
                <div className='events-control'>
                    <p>Share your events</p>
                    <button className='btn' onClick={this.startCreateEventHandler}>Create Event</button>
                </div>
            </Fragment>
        )
    }
}

export default EventsPage