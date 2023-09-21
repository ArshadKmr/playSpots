import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS,registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { adminUserGraph } from '../../Actions/adminActions';
ChartJS.register(...registerables)

const GraphChart = () => {
    const dispatch = useDispatch()

    const adminUser = useSelector((state) => state.adminUserGraph)
    const { graphError, graphData } = adminUser

    useEffect(() => {
        dispatch(adminUserGraph())
    }, [dispatch])

    const data = {
        labels: graphData?.userData?.map((item) => item.name),
        datasets: [
            {
                label: 'Turf Price',
                data: graphData?.userData?.map((item) => item.price),
                backgroundColor: 'Green',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'blue',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
            },
        ],
    }

    return (
        graphError ? (
            <p className='text-red-600 text-center'>{graphError}</p>
        ) : (
            <Line data={data} />
        )
    )
}

export default GraphChart