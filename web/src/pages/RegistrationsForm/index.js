import React, { useEffect, useState, useMemo } from 'react';

import Select from 'react-select';

import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from '../../components/DatePicker';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Row,
    Column,
} from '~/styles/form';
import { Container } from './styles';

export default function Registration({ title, location }) {

    const state = (location.state) ? location.state.registration :
        {
            plan: {
                price: 0,
                duration: 0,
            },
        };

    const [registration, setRegistration] = useState(state);
    const [plans, setPlans] = useState([]);
    const [students, setStudents] = useState([]);

    // Melhorar aqui
    const initialData = {
        ...state,
        student: registration.student ? registration.student.name : "",
        plan: registration.plan ? registration.plan.title : "",
        start_date: registration.student ? format(
            parseISO(registration.start_date),
            "dd'/'MM'/'yyyy",
            {
                locale: pt,
            }
        ) : "",
        end_date: registration.student ? format(
            parseISO(registration.end_date),
            "dd'/'MM'/'yyyy",
            {
                locale: pt,
            }
        ) : "",
    };

    const priceTotal = useMemo(() => (registration.plan.price * registration.plan.duration).toLocaleString('pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
        }),
        [registration]);

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

    function handleSubmit() { }

    useEffect(() => {
        async function loadPlans() {

            try {

                const response = await api.get('plans');
                const data = response.data;

                const options = data.map(plan => ({
                    value: plan.id,
                    label: plan.title,
                }));

                setPlans(options);

                return options;

            } catch (err) {
                toast.error(err.response.data.error);
            }

        }
        loadPlans();
    }, []);

    // async function loadStudents() {

    //     try {

    //         const response = await api.get('students');
    //         const data = response.data;

    //         const options = data.map(student => ({
    //             value: student.id,
    //             label: student.name,
    //         }));

    //         return options;

    //     } catch (err) {
    //         toast.error(err.response.data.error);
    //     }

    // }

    async function loadStudents(inputValue) {
        const response = await api
            .get('students', {
                params: { name: `${inputValue}` },
            })
            .then(r => r.data)
            .then(r =>
                r.map(student => ({
                    label: `${student.id} - ${student.name}`,
                    value: student.id,
                }))
            );
        return response;
    }

    return (
        <Container>
            <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
                <FormHeader>
                    <Title>{title}</Title>
                    <Buttons>
                        <Link to="/matriculas" className="back">
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
                            <AsyncSelect
                                name="student"
                                loadOptions={loadStudents}
                                label="ALUNO"
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Select
                                options={plans}
                                name="plan"
                                label="Plano"
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="start_date"
                                label="Data de inicio"
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="end_date"
                                label="Data de termino"
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="priceTotal"
                                label="Valor final"
                                value={priceTotal}
                            />
                        </Column>
                    </Row>
                </ContainerBody>
            </Form>
        </Container>
    );
}
