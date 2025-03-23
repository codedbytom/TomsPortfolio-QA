import { useState } from 'react';

 function NightmareCard({ title, summary, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{title}</h5>
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setOpen(!open)}
                >
                    {open ? 'Collapse' : 'Read More'}
                </button>
            </div>
            <div className="card-body">
                <p className="card-text">{summary}</p>
                {open && (
                    <div className="mt-3 border-top pt-3">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

export default NightmareCard;