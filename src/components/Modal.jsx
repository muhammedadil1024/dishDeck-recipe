import React from "react";

const Modal = ({ isModalOpen, setModalOpen, contentData }) => {
    if (!isModalOpen) return null;

    return (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <button className="close-button" onClick={() => setModalOpen(false)}>
                    &times;
                </button>
                {contentData ? (
                    <div className="modal-body">
                        <h4 className="modal-title">{contentData.title}</h4>
                        <hr className="modal-divider" />
                        <img className="modal-image" src={contentData.image} alt="Recipe img" />
                        <div className="modal-section">
                            <h5>Ingredients</h5>
                            <ul className="modal-list">
                                {contentData.extendedIngredients.map((item) => (
                                    <li key={item.id}>{item.original}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-section">
                            <h5>Instructions</h5>
                            <p className="modal-text" dangerouslySetInnerHTML={{ __html: contentData.instructions }}></p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Modal;