import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import StudentsForm from '~/pages/StudentsForm';
import Plans from '~/pages/Plans';
import PlansForm from '~/pages/PlansForm';
import Registrations from '~/pages/Registrations';
import RegistrationsForm from '~/pages/RegistrationsForm';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route
                path="/alunos/cadastro"
                exact
                isPrivate
                component={StudentsForm}
                title="Cadastro de aluno"
            />
            <Route
                path="/alunos/:id"
                exact
                isPrivate
                component={StudentsForm}
                title="Edicao de aluno"
            />
            <Route
                path="/alunos"
                exact
                isPrivate
                component={Students}
                title="Gerenciando alunos"
            />
            <Route
                path="/planos/cadastro"
                exact
                isPrivate
                component={PlansForm}
                title="Cadastro de plano"
            />
            <Route
                path="/planos/:id"
                exact
                isPrivate
                component={PlansForm}
                title="Edicao de plano"
            />
            <Route
                path="/planos"
                exact
                isPrivate
                component={Plans}
                title="Gerenciando planos"
            />
            <Route
                path="/matriculas"
                isPrivate
                exact
                component={Registrations}
                title="Gerenciando matriculas"
            />
             <Route
                path="/matriculas/cadastro"
                isPrivate
                exact
                component={RegistrationsForm}
                title="Cadastro de matricula"
            />
            <Route
                path="/matriculas/:id"
                isPrivate
                exact
                component={RegistrationsForm}
                title="Edicao de matricula"
            />
            <Route
                path="/auxilio"
                isPrivate
                exact
                component={HelpOrders}
                title="Pedidos de auxilio"
            />
        </Switch>
    );
}
