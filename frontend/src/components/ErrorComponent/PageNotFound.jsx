import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player';

const PageNotFound = () => {

    const navigate = useNavigate()

    return (

        <main className="grid min-h-screen m-4 place-items-center bg-white">
            <div className="w-full max-w-md">
                <Player
                    autoplay
                    loop
                    src="https://lottie.host/97dd1464-4a1b-4348-b20a-ae74a66bba16/Pq2MrWbTVJ.json"
                    style={{ height: '100%', width: '100%' }}
                />
                <button
                    className="bg-indigo-500 rounded w-full mt-5 py-2 text-white"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        </main>
    )
}

export default PageNotFound