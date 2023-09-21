import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS,registerables } from 'chart.js';
import { useSelector } from 'react-redux'
import {format} from 'date-fns'
ChartJS.register(...registerables)

const ProviderGraphChart = () => {

    const totalBookings = useSelector(state => state.providerBookings)
    const { totalBookingError, totalBooking } = totalBookings

    const data = {
        labels: totalBooking?.booking?.map((item) => format(new Date(Date.parse(item.date)), "dd-MM-yyyy")),
        datasets: [
            {
                label: 'Total Booking',
                data: totalBooking?.booking?.map((item) => item.price),
                backgroundColor: 'red',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'blue',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
            },
        ],
    }

    return (
        totalBookingError ? (
            <p className='text-red-600 text-center'>{totalBookingError}</p>
        ) : (
            <Line data={data} />
        )
    )
}

export default ProviderGraphChart