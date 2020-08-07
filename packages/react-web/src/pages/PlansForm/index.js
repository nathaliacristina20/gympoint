import React, { useState, useMemo } from 'react';

import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdSearch } from 'react-icons/md';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Row,
    Column,
} from '~/styles/form';

import api from '~/services/api';
import history from '~/services/history';
import { toast } from 'react-toastify';

export default function RegistrationPlans({ location, title, match }) {

    const { id } = match.params;

    const statePlan = (location.state) ? location.state.plan :
        {
            duration: 0,
            price: 0,
        };

    const initialData = statePlan;

    const [plan, setPlan] = useState(statePlan);

    const priceTotal = useMemo(() => (plan.price * plan.duration).toLocaleString('pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
        }),
        [plan]);

    const schema = Yup.object().shape({
        title: Yup.string().required('O titulo do plano e obrigatorio'),
        duration: Yup.number()
            .typeError('A duracao e obrigatoria')
            .positive()
            .required('A duracao e obrigatoria'),
        price: Yup.number()
            .typeError('Preco invalido')
            .positive()
            .required('O preco e obrigatorio'),
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
            const response = await api.post( 'plans', data);
            if (response) {
                toast.success('Registro salvo!');
                history.push('/planos');
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    async function update({ ...data }) {
        try {
            const response = await api.put(`plans/${plan.id}`, data);
            if (response) {
                toast.success('Registro atualizado!')
                history.push('/planos');
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    return (
        <Container>
            <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
                <FormHeader>
                    <Title>{title}</Title>
                    <Buttons>
                        <Link to="/planos" className="back">
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
                                type="text"
                                name="title"
                                label="Titulo do plano"
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                type="text"
                                name="duration"
                                label="Duracao (em meses)"
                                onBlur={(evt) => { setPlan({ ...plan, duration: evt.target.value }) }}
                            />
                        </Column>

                        <Column>
                            <Input
                                type="text"
                                name="price"
                                label="Preco mensal"
                                onBlur={(evt) => { setPlan({ ...plan, price: evt.target.value }) }}
                            />
                        </Column>

                        <Column>
                            <Input
                                type="text"
                                name="height"
                                label="Preco total"
                                readOnly
                                value={priceTotal}
                            />
                        </Column>
                    </Row>
                </ContainerBody>
            </Form>
        </Container>
    );
}
