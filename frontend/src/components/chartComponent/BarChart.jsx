import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { adminBookingGraph } from '../../Actions/adminActions'
import { format } from 'date-fns'

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement)

const BarChart = () => {
    const dispatch = useDispatch()

    const adminGraph = useSelector((state) => state.adminBookingGraph)
    const { barGraphData, barGraphError } = adminGraph

    useEffect(() => {
        dispatch(adminBookingGraph())
    }, [dispatch])

    const data = {
        labels: barGraphData?.bookingData?.map((item) => format(new Date(Date.parse(item.date)), "dd-MM-yyyy")),
        datasets: [
            {
                label: 'Total Booking',
                data: barGraphData?.bookingData?.map((item) => item.price),
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
        barGraphError ? (
            <p className='text-red-600 text-center'>{barGraphError}</p>
        ) : (
            <Bar data={data} />
        )
    )
}

export default BarChart