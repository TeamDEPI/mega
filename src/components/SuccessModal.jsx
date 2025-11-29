import React from "react";

function SuccessModal({ visible, message, onClose, onOk }) {
  if (!visible) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <h4 className="fw-bold text-center mb-3">Request Received</h4>
          <p className="text-center">{message}</p>

          <button className="btn btn-success w-100 mt-3" onClick={onOk}>
            OK
          </button>
          <button className="btn btn-secondary w-100 mt-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
