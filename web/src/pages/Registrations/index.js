import React, { useEffect, useState } from 'react';

import { MdAdd } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Table,
} from '~/styles/form';
import { Container } from './styles';
import api from '~/services/api';

export default function Registrations({ title }) {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        async function index() {

            const response = await api.get('registration');
            const data = response.data.map(registration => ({
                ...registration,
                startFormatted: format(
                    parseISO(registration.start_date),
                    "d 'de' MMMM 'de' yyyy",
                    {
                        locale: pt,
                    }
                ),
                endFormatted: format(
                    parseISO(registration.end_date),
                    "d 'de' MMMM 'de' yyyy",
                    {
                        locale: pt,
                    }
                ),
                activeText: registration.active ? 'Sim' : 'Nao',
            }));

            setRegistrations(data);
        }
        index();
    }, []);

    return (
        <Container>
            <Form>
                <FormHeader>
                    <Title>{title}</Title>
                    <Buttons>
                        <Link to="/matriculas/cadastro">
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
                                <th>Aluno</th>
                                <th className="tdCenter">Plano</th>
                                <th className="tdCenter">Inicio</th>
                                <th>Termino</th>
                                <th>Ativa</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map(registration => (
                                <tr key={registration.id}>
                                    <td>{registration.student.name}</td>
                                    <td>{registration.plan.title}</td>
                                    <td>{registration.startFormatted}</td>
                                    <td>{registration.endFormatted}</td>
                                    <td>{registration.activeText}</td>
                                    <td className="tdEnd">
                                        <Link
                                            to={{
                                                pathname: `/matriculas/${registration.id}`,
                                                state: {
                                                    registration: registration
                                                }
                                            }}
                                            className="editar"
                                        >
                                            <span>editar</span>
                                        </Link>
                                        <Link to="/apagar" className="apagar">
                                            <span>apagar</span>
                                        </Link>
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
