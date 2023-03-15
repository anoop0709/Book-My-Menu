import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createWallet,
  deleWallet,
  walletInfo,
} from "../../../../actions/UserActions";
import "./Mywallet.css";

function Mywallet({Wallet}) {
  const wallet = useSelector((state) => {
    return state.WalletInfo.authData;
  });
  const user = useSelector((state) => {
    return state?.UserInfo.authData;
  });
  const [showwallet, setShowWallet] = useState(false);
  const [walletinfo, setWalletinfo] = useState({
    accountname: "",
    cardnumber: "",
    balance: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(walletInfo(user?._id));
    }
  }, []);
  const handleChange = (e) => {
    setWalletinfo({ ...walletinfo, [e.target.name]: e.target.value });
  };
  const handleSaveWallet = () => {
    dispatch(createWallet(walletinfo, user?._id));
    setShowWallet(false);
  };
  const Delewallet = () => {
    dispatch(deleWallet(user?._id));
  };
  console.log(walletinfo);
  return (
    <div className="walletContainer">
      <div className="walletWrapper">
        {Object.keys(Wallet).length ? (
          <div className="rowDiv">
            <div className="walletRow">
              <div className="walletItems">
                <p>ACCOUNT NAME</p>
                <p>{wallet?.accountname}</p>
              </div>
              <div className="walletItems">
                <p>ACCOUNT NUMBER</p>
                <p>{wallet?.cardnumber}</p>
              </div>
              <div className="walletItems">
                <p>BALANCE</p>
                <p>£ {wallet?.balance} .00</p>
              </div>
              <div className="deleBtn">
                <FontAwesomeIcon
                  className="btnDel"
                  icon={faTrash}
                  onClick={Delewallet}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="createBtn">
              <button
                className="walletCreate"
                onClick={() => setShowWallet(true)}
              >
                Create Wallet
                <FontAwesomeIcon className="iconplus" icon={faPlus} />
              </button>
            </div>
          </>
        )}
      </div>
      {showwallet && (
        <Modal
          show={showwallet}
          onHide={() => {
            setShowWallet(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalInp">
              <div className="inp">
                <label htmlFor="">Account Name:</label>
                <input
                  type="text"
                  name="accountname"
                  value={walletinfo?.accountname}
                  onChange={handleChange}
                />
              </div>
              <div className="inp">
                <label htmlFor="">Account Number:</label>
                <input
                  type="number"
                  name="cardnumber"
                  value={walletinfo?.cardnumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowWallet(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveWallet}>
              Create Wallet
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Mywallet;
