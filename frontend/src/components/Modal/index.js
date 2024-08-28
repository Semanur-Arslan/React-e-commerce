

function LoadButton({ isOpen, title, text, onClose, onConfirm }) {
    return (

        <div id="modal" className={isOpen == true ? 'modal modal-open' : ''} >
            <div className="modal-box">
                <h3 className="text-lg font-bold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 shrink-0 stroke-current text-orange-300"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    {title}
                </h3>
                <p className="py-4">
                    {text}
                </p>
                <div className="modal-action">
                    <button className="btn btn-outline btn-success btn-sm mx-2" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="btn btn-outline hover:btn-accent btn-sm mx-2" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    )
}

export default LoadButton;