import React from 'react'

export default function NotFound(props) {
    const { history } = props;
    return (
        <div>
            Error: Page Not Found
            <button onClick={() => {
                history.replace("/login")
            }}>Go to home</button>
        </div>
    )
}

