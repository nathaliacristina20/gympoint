import React, { useEffect, useState } from 'react';
import { Form } from '@rocketseat/unform';

import {
    FormHeader,
    Title,
    ContainerBody,
    Table,
} from '~/styles/form';
import { Container } from './styles';
import api from '~/services/api';

import HelpOrderModal from '~/components/HelpOrderModal';

export default function HelpOrders({ title }) {
    const [helpOrders, setHelpOrders] = useState([]);

    useEffect(() => {
        async function loadPlans() {
            const response = await api.get('help-orders');
            setHelpOrders(response.data);
        }
        loadPlans();
    }, []);

    return (
        <Container>
            <Form>

                <FormHeader>
                    <Title>{title}</Title>
                    
                </FormHeader>
            </Form>

            <ContainerBody>
                <Table>
                    <table>
                        <thead>
                            <tr>
                                <th>Aluno</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {helpOrders.map(helpOrder => (
                                <tr key={helpOrder.id}>
                                    <td>{helpOrder.student.name}</td>
                                    <td className="tdEnd">
                                        <HelpOrderModal question={helpOrder.question} questionId={helpOrder.id} />
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
