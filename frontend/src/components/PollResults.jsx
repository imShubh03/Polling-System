import React from 'react';

function PollResults({ poll }) {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold" style={{ color: '#373737' }}>Poll Results</h2>
            <p style={{ color: '#6E6E6E' }}>{poll.question}</p>
            <ul className="mt-2">
                {Object.entries(poll.options).map(([key, option]) => (
                    <li key={key} className="mb-2">
                        <span style={{ color: '#373737' }}>{option}: </span>
                        <span style={{ color: '#6E6E6E' }}>
                            {poll.results && Object.values(poll.results).filter(ans => ans === option).length} votes
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PollResults;