import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import api from '~/services/api';
import { Container, InputSearch } from './styles';
import AlertConfirm from '~/components/AlertConfirm';

import { useDispatch, useSelector } from 'react-redux';
import { showInRequest } from '~/store/modules/student/actions';

import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Table,
} from '~/styles/form';

export default function Students({ title }) {

    const dispatch = useDispatch();

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState([]);

    useEffect(() => {
        async function loadStudents() {
            dispatch(showInRequest());
        }
        loadStudents();
    }, []);

    const options = useMemo(
        () =>
            students.map(student => ({
                value: student.id,
                label: student.name,
            })),
        [students]
    );

    function handleChange(event) {
        const filtered = [students.find(student => student.id === event.value)];
        setStudent(filtered);
    }

    const customStyles = {
        valueContainer: base => ({
            ...base,
            padding: '0px 6px',
        }),
        input: base => ({
            ...base,
            margin: 0,
            padding: 0,
        }),
    };

    async function handleDelete(id) {

        try {
            const response = await api.delete(`students/${id}`);
            if (response) {
                toast.info('Registro deletado!');

                const filtered = students.filter(function (student) {
                    return student.id === id;
                });

                for (let student of filtered) {
                    let index = students.indexOf(student);
                    students.splice(index, 1);
                }

                setStudents(students);

            }
        } catch (err) {
            toast.error(err.response.data.error);
        }

    }

    return (
        <>
            <Container>
                <Form>
                    <FormHeader>
                        <Title>{title}</Title>
                        <Buttons>
                            <Buttons>
                                <Link to="/alunos/cadastro">
                                    <MdAdd size={20} color="#FFF" />
                                    <span>Cadastrar</span>
                                </Link>
                            </Buttons>
                            <InputSearch>
                                <Select
                                    onChange={handleChange}
                                    styles={customStyles}
                                    options={options}
                                />
                            </InputSearch>
                        </Buttons>
                    </FormHeader>
                </Form>

                <ContainerBody>
                    <Table>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th className="tdCenter">Idade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td className="tdCenter">
                                            {student.age}
                                        </td>
                                        <td className="tdEnd">
                                            <Link
                                                className="editar"
                                                to={{
                                                    pathname: `/alunos/${student.id}`,
                                                    state: {
                                                        student: student
                                                    }
                                                }}
                                            >
                                                <span>editar</span>
                                            </Link>
                                            <AlertConfirm confirm={() => handleDelete(student.id)} title="apagar" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Table>
                </ContainerBody>
            </Container>
        </>
    );
}
