import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Container } from './styles';
import api from '~/services/api';
import history from '~/services/history';
import { toast } from 'react-toastify';

import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Row,
    Column,
} from '~/styles/form';

export default function Student({ location, title, match }) {

    const { id } = match.params;

    const stateStudent = (location.state) ? location.state.student : [];
    const initialData = stateStudent;
    const [student, setStudent] = useState(stateStudent);

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome e obrigatorio'),
        email: Yup.string()
            .email(`Insira um e-mail valido`)
            .required('O e-mail e obrigatorio'),
        age: Yup.number()
            .typeError('Idade invalida')
            .positive()
            .required('A idade e obrigatoria'),
        weight: Yup.number()
            .typeError('Peso invalido')
            .positive()
            .required('O peso e obrigatorio'),
        height: Yup.number()
            .typeError('Altura invalida')
            .positive()
            .required('A altura e obrigatoria'),
    });

    async function handleSubmit({ ...data }) {
        if (id) {
            update(data);
        } else {
            store(data);
        }
    }

    async function store({ ...data }) {
        try {
            const response = await api.post('students', data);

            if (response) {
                toast.success('Registro salvo!');
                history.push('/alunos');
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    async function update({ ...data }) {
        try {
            const response = await api.put(`students/${student.id}`, data);
            if (response) {
                toast.success('Registro atualizado!');
                history.push('/alunos');
            }

        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    return (

        <Container>
            <Form schema={schema} onSubmit={handleSubmit} initialData={initialData}>
                <FormHeader>
                    <Title>{title}</Title>
                    <Buttons>
                        <Link to="/alunos" className="back">
                            <MdSearch size={20} color="#FFF" />
                            <span>Voltar</span>
                        </Link>
                        <button type="submit" className="btnSave">
                            <MdAdd size={20} color="#FFF" />
                            <span>Salvar</span>
                        </button>
                    </Buttons>
                </FormHeader>
                <ContainerBody>
                    <Row>
                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="name"
                                label="Nome completo"
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                style={{}}
                                type="email"
                                name="email"
                                label="Endereco de e-mail"
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="age"
                                label="Idade"
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="weight"
                                label="Peso (em kg)"
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="height"
                                label="Altura"
                            />
                        </Column>
                    </Row>
                </ContainerBody>
            </Form>
        </Container>
    );
}
