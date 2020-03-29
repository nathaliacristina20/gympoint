import React, { useState } from 'react';

import { Container } from './styles';

import SweetAlert from 'react-bootstrap-sweetalert';

export default function AlertConfirm({ confirm, title }) {

    const [state, setState] = useState({ alert: null });

    function onCancel() {
        setState({});
    }

    function handleConfirm(){
        confirm();
        onCancel();
    }

    function deleteThisGoal() {

        const getAlert = () => (
            <SweetAlert
                showCancel
                confirmBtnText="Sim, apague isto!"
                confirmBtnStyle={{ backgroundColor: '#ee4d64' }}
                cancelBtnText="Cancelar"
                cancelBtnStyle={{ backgroundColor: '#CCCCCC' }}
                title="Tem certeza?"
                onConfirm={handleConfirm}
                onCancel={onCancel}
                focusCancelBtn
            >
                Este registro nao podera ser recuperado!
            </SweetAlert>
        );

        setState({
            alert: getAlert()
        });
    }

    return (
        <Container>
            <a 
                type="button"
                className="apagar"
                onClick={() => deleteThisGoal()}
            >
                {title}
                {state.alert}
            </a>
        </Container>
    );
}
