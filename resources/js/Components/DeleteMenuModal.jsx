import { useState } from 'react';
import Modal from '@/Components/Modal.jsx';
import TextInput from '@/Components/TextInput.jsx';
import InputLabel from '@/Components/InputLabel.jsx';
import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import SecondaryButton from '@/Components/SecondaryButton.jsx';
import { useForm } from '@inertiajs/react';

export default function DeleteMenuModal({ show, onClose, id, setSelectedItem }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('menu.delete'), {
            onSuccess: () => {
                setSelectedItem(null);
                onClose();
                reset();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to delete this menu?
                </h2>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        Delete
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}