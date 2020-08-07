import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Container, LogoGympoint, LogoGympointImage } from './styles';

import logo1 from '~/assets/Group.svg';
import logo2 from '~/assets/GYMPOINT.svg';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    email: Yup.string()
        .email(`Insira um e-mail valido`)
        .required('O e-mail e obrigatorio'),
    password: Yup.string().required('A senha e obrigatoria'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <Container>
            <Form schema={schema} onSubmit={handleSubmit}>
                <LogoGympointImage>
                    <img src={logo1} alt="GymPoint" />
                </LogoGympointImage>
                <LogoGympoint>
                    <img src={logo2} alt="GymPoint" />
                </LogoGympoint>
                <Input
                    type="text"
                    name="email"
                    label="Seu e-mail"
                    placeholder="exemplo@email.com"
                />
                <Input
                    type="password"
                    name="password"
                    label="Sua senha"
                    placeholder="***************"
                />
                <button type="submit">
                    {loading ? 'Carregando..' : 'Entrar no sistema'}
                </button>
            </Form>
        </Container>
    );
}
