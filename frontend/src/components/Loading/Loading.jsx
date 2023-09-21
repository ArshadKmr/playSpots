import React from 'react'
import { useSelector } from 'react-redux'
import { InfinitySpin } from 'react-loader-spinner'

const Loading = () => {
    const loading = useSelector(state => state.loading)
    return (
        loading ? <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <InfinitySpin color="indigo" />
            </div>
        </div> : ''
    )
}

export default Loading