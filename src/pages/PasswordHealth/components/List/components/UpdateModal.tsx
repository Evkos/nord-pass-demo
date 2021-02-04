import React, {FC, useState} from 'react';
import Modal from 'react-modal';

import {updateItem} from '~/api/services';
import {IItem} from '~/types'

interface IUpdateModal {
    item: IItem;
}

export const UpdateModal: FC<IUpdateModal> = ({item}) => {
    const [showModal, setShowModal] = useState(false);
    const [newPass, setNewPass] = useState('');


    const updatePassword = async () => {
        await updateItem({
            ...item,
            password: newPass,
        })
        setShowModal(false)
    }

    const closeModal = () => {
        setNewPass('');
        setShowModal(false)
    }

    return (
        <>
            <button className="update" onClick={() => setShowModal(true)}>
                Update Password
            </button>
            <Modal
                className="modal"
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Example Modal"
            >
                <h1>Update Password</h1>
                <input
                    placeholder="new password"
                    className="input"
                    value={newPass}
                    onChange={(event) => setNewPass(event.target.value)}
                />
                <div className="pt-12px text-center">
                    <button className="button" onClick={updatePassword}>Change</button>
                    <button className="button ml-12px" onClick={closeModal}> Cancel</button>
                </div>
            </Modal>
        </>
    );
}
