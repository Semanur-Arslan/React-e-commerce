import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import '../ImageModal/style.css'
import { IoCloseOutline } from "react-icons/io5";

function ImageModal({ isOpen, closeModal, modalImage, handlePrevImage, handleNextImage }) {
    return (
        <div id="ımageModal" className={isOpen === true ? 'modal modal-open' : 'modal'}>
            <div className="fixed top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <button
                    className="absolute top-10 right-10 text-white "
                    onClick={closeModal}
                >
                    <IoCloseOutline size={32} />
                </button>
                <button
                    className="absolute top-1/2 z-10 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 hover:bg-gray-100"
                    onClick={handlePrevImage}
                >
                    <IoIosArrowBack />
                </button>
                <div className="modal-content flex items-center justify-center h-full">
                    <img src={modalImage} alt="Modal View" className="rounded-lg " />
                </div>
                <button
                    className="absolute top-1/2 z-10 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 hover:bg-gray-100"
                    onClick={handleNextImage}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}

export default ImageModal;
