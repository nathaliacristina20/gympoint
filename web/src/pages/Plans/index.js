import React, { useEffect, useState } from 'react';

import { MdAdd } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Table,
} from '~/styles/form';
import { Container } from './styles';
import api from '~/services/api';
import { formatPrice } from '../../util/format';
import AlertConfirm from '~/components/AlertConfirm';
import { toast } from 'react-toastify';

export default function Plans() {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function loadPlans() {
            const response = await api.get('plans');

            const data = response.data.map(plan => ({
                ...plan,
                priceFormatted: formatPrice(plan.price),
            }));

            setPlans(data);
        }
        loadPlans();
    }, []);

    async function handleDelete(data) {
        try {

            const response = await api.delete(`plans/${data.id}`, data);

            if (response) {

                const filtered = plans.filter(function (plan) {
                    return plan.id !== data.id;
                });

                setPlans(filtered);
                toast.success('Registro deletado!');

            }

        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    return (
        <Container>
            <Form>
                <FormHeader>
                    <Title>Gerenciando planos</Title>
                    <Buttons>
                        <Link to="/planos/cadastro">
                            <MdAdd size={20} color="#FFF" />
                            <span>Cadastrar</span>
                        </Link>
                    </Buttons>
                </FormHeader>
            </Form>

            <ContainerBody>
                <Table>
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th className="tdCenter">Duracao</th>
                                <th className="tdCenter">Valor por mes</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {plans.map(plan => (
                                <tr key={plan.id}>
                                    <td>{plan.title}</td>
                                    <td className="tdCenter">
                                        {plan.duration > 1
                                            ? `${plan.duration} meses`
                                            : `${plan.duration} mes`}
                                    </td>
                                    <td className="tdCenter">
                                        {plan.priceFormatted}
                                    </td>
                                    <td className="tdEnd">
                                        <Link
                                            to={{
                                                pathname: `/planos/${plan.id}`,
                                                state: {
                                                    plan: plan
                                                }
                                            }}
                                            className="editar"
                                        >
                                            <span>editar</span>
                                        </Link>
                                        <AlertConfirm confirm={() => handleDelete(plan)} title="apagar" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Table>
            </ContainerBody>
        </Container>
    );
}
