import React, {SyntheticEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Routes} from '~/constants';
import {login} from '~/api/services';
import ErrorBlock from '../../components/common/ErrorBlock';
import {LoadingScreen} from "~/components/common/LoadingScreen";
import {validateField, validateForm} from "~/utils/formValidator";

import './login-style.scss';
import {ValidatedInput} from "~/components/common/ValidatedInput";


export const Login = () => {
    const {push} = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string>();
    const [errorsState, setErrorsState] = useState(null);

    const handleChange = e => {
        let errorsStateNew = {...errorsState}
        delete errorsStateNew[e.target.name]

        const fieldErrors = validateField(e.target)
        errorsStateNew = {...errorsStateNew, ...fieldErrors}
        setErrorsState(errorsStateNew)
    };

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        const formDataObj = new FormData(event.target)
        const formData = {
            username: `${formDataObj.get('username')}`,
            password: `${formDataObj.get('password')}`
        }

        const formErrors = validateForm(formData)
        setErrorsState(formErrors)

        if (Object.keys(formErrors).length !== 0) {
            return
        }

        //Get result from server
        setServerErrorMessage(null);
        setIsLoading(true);
        try {
            await login(formData.username, formData.password);
            push(Routes.PasswordHealth);
        } catch (error) {
            setServerErrorMessage(error.message);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="text-center"> Password Health </h1>
                <ValidatedInput
                    error={errorsState?.username}
                    handleChange={handleChange}
                    name="username"
                    placeholder="Username"
                />
                <ValidatedInput
                    error={errorsState?.password}
                    handleChange={handleChange}
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <ErrorBlock error={serverErrorMessage}/>
                {isLoading && <LoadingScreen/>}
                <button type="submit" className="button mt-24px">
                    Login
                </button>
            </form>

        </div>
    )
};
