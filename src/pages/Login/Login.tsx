import React, {SyntheticEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Routes} from '~/constants';
import {login} from '~/api/services';
import ErrorBlock from '../../components/common/ErrorBlock';
import {LoadingScreen} from "~/components/common/LoadingScreen";
import {validateForm} from "~/utils/formValidator";

import './login-style.scss';
import {ValidatedInput} from "~/components/common/ValidatedInput";


const initialFormData = {
    username: '',
    password: ''
}

export const Login = () => {
    const {push} = useHistory();
    const [formData, updateFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string>();
    const [errorMessages, setErrorMessages] = useState(null);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setServerErrorMessage(null);
        const formErrors = validateForm(formData)

        console.log(formErrors)


        setIsLoading(true)
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
                    value={formData.username}
                    error={errorMessages?.username}
                    handleChange={handleChange}
                    name="username"
                    placeholder="Username"
                />
                <ValidatedInput
                    value={formData.password}
                    error={errorMessages?.password}
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
