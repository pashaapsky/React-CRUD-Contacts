import React, {Fragment, useContext, useState} from 'react';
import AuthForm from "../components/authForm";
import Button from '@material-ui/core/Button';
import {AuthContext} from "../context/AuthContext";

function Home(props) {
    const {setUser, setToken, login, register} = useContext(AuthContext);
    const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);
    const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);

    const openLoginForm = () => {
        setIsOpenLoginForm(true);
        setIsOpenRegisterForm(false);
    };

    const openRegisterForm = () => {
        setIsOpenLoginForm(false);
        setIsOpenRegisterForm(true);
    };

    return (
        <Fragment>
            <div className="home-wrapper">
                <h1 className="heading">Домашняя страница</h1>

                <div className="btn-group">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={openRegisterForm}
                    >Зарегистрироваться
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={openLoginForm}
                    >Войти
                    </Button>
                </div>

                {isOpenLoginForm && <AuthForm className="auth-form" buttonTitle={"Войти"} handleSubmit={login}/>}

                {isOpenRegisterForm && <AuthForm className="auth-form" buttonTitle={"Зарегистрироваться"} handleSubmit={register}/>}
            </div>
        </Fragment>
    );
}

export default Home;