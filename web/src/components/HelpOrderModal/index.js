import React, { useState } from 'react';
import Modal from 'react-modal';
import { Container, ModalStyle } from './styles';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import { toast } from 'react-toastify';

export default function HelpOrderModal({ question, questionId }) {

    const [loading, setLoading] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            position: `fixed`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
    };
    // let subtitle;
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function handleSubmit({ ...data }) {
        
        try {
            const response = await api.put(`/help-orders/${questionId}/answer`, data);
            if (response) {
                toast.success('Registro salvo!');
                closeModal();
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }

    }

    return (
        <Container>
            <div>
                <button type="button" onClick={openModal} className="btAnswer">responder</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <div>
                        <button
                            type="button"
                            onClick={openModal}
                        >
                            Responder
                                            </button>
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                            <ModalStyle>
                                <Form onSubmit={handleSubmit}>
                                    <div>
                                        <strong>Pergunta do aluno</strong>
                                        <p>{question}</p>
                                    </div>
                                    <div>
                                        <strong>Sua resposta</strong>
                                        <Input
                                            multiline
                                            name="answer"
                                        />
                                        <button type="submit">{loading ? 'Aguarde...' : 'Responder aluno'}</button>
                                    </div>
                                </Form>
                            </ModalStyle>
                        </Modal>
                    </div>
                </Modal>
            </div>
        </Container>
    );
}
