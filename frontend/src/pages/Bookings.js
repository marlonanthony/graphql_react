import React, { Component, Fragment } from 'react' 

import AuthContext from '../context/auth-context'
import Spinner from '../components/spinner/Spinner'
import BookingList from '../components/bookings/bookingList/BookingList'
import BookingsChart from '../components/bookings/bookingsChart/BookingsChart'
import BookingsControls from '../components/bookings/bookingsControls/BookingsControls'

class BookingsPage extends Component {
    state = { isLoading: false, bookings: [], outputType: 'list' }

    static contextType = AuthContext

    componentDidMount() {
        this.fetchBookings() 
    }

    fetchBookings = () => {
        this.setState({ isLoading: true })

        const reqBody = {
            query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                            price
                        }
                    }
                }
            `
            
        }

        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token 
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!')
            }
            return res.json()
        })
        .then(resData => {
            const bookings = resData.data.bookings 
            this.setState({ bookings, isLoading: false })
        })
        .catch(err => {
            console.log(err)
            this.setState({ isLoading: false })
        })
    }

    deleteBookingHandler = bookingId => {
        this.setState({ isLoading: true })

        const reqBody = {
            query: `
                mutation CancelBooking($id: ID!) {
                    cancelBooking(bookingId: $id) {
                        _id
                        title
                    }
                }
            `,
            variables: {
                id: bookingId 
            }
            
        }

        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token 
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!')
            }
            return res.json()
        })
        .then(resData => {
            this.setState( prevState => { 
                const updatedBookings = prevState.bookings.filter(booking => {
                    return booking._id !== bookingId 
                })
                return { bookings: updatedBookings, isLoading: false }
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({ isLoading: false })
        })
    }

    changeOutputTypeHandler = outputType => {
        if(outputType === 'list') {
            this.setState({ outputType: 'list' })
        } else {
            this.setState({ outputType: 'chart' })
        }
    }

    render() {
        let content = <Spinner />
        if(!this.state.isLoading) {
            content = (
                <Fragment>
                    <BookingsControls  
                        activeOutputType={this.state.outputType} 
                        onChange={this.changeOutputTypeHandler}
                    />
                    <div>
                        { this.state.outputType === 'list' 
                        ? <BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler} /> 
                        : <BookingsChart bookings={this.state.bookings} /> }
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                { content }
            </Fragment>
        )
    }
}

export default BookingsPage