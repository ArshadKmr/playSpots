import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { format } from 'date-fns'
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement)

const ProviderBarChart = () => {

    const totalBookings = useSelector(state => state.providerBookings)
    const { totalBookingError, totalBooking } = totalBookings

    const data = {
        labels: totalBooking?.booking?.map((item) => format(new Date(Date.parse(item.date)), "dd-MM-yyyy")),
        datasets: [
            {
                label: 'Booked Turf Price',
                data: totalBooking?.booking?.map((item) => item.price),
                backgroundColor: 'indigo',
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
            <Bar data={data} />
        )
    )
}

export default ProviderBarChart