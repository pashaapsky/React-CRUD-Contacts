import React, {Fragment, useState, useContext, useEffect} from 'react';
import {AuthContext} from "../context/AuthContext";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import Contact from "../components/contact";
import ContactForm from "../components/contactForm";

import '../scss/profile.scss'
import '../scss/contacts.scss'

function Profile(props) {
    const {user, logout} = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isShowAddForm, setIsShowAddForm] = useState(false);

    const addContact = async (values, userId) => {
        try {
            const res = await axios.post('/contacts', {
                "name": values.name,
                "phone": values.phone,
                "userId": userId
            });

            if (res) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e.message)
        }
    };

    const deleteContact = async (contactId) => {
        try {
            const res = await axios.delete(`/contacts/${contactId}`);

            if (res) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e.message)
        }
    };

    const editContact = async (values, contactId) => {
        try {
            const res = await axios.patch(`/contacts/${contactId}`, {
                "name": values.name,
                "phone": values.phone
            });

            if (res) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e.message)
        }
    };

    useEffect(() => {
        async function getUserContacts(user) {
            try {
                const userId = await axios.get('/users')
                    .then(res => {
                        const userItem = res.data.filter(item => item.email === user);

                        if (userItem.length) {
                            return userItem[0].id;
                        } else {
                            return null
                        }
                    });

                if (userId) {
                    setUserId(userId);
                }

                const contacts = await axios.get(`/contacts?userId=${userId}`)
                    .then(res => res.data);

                if (contacts) {
                    setContacts(contacts);
                }
            } catch (e) {
                console.error(e.message)
            }
        }

        getUserContacts(user);
    }, [user]);

    console.log('user', user);
    console.log('contacts', contacts);

    return (
        <div className="profile">
            <div className="profile__header">
                <h1 className="profile__heading">Profile Page</h1>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={logout}
                >Выйти
                </Button>
            </div>

            <div className="profile__contacts contacts">
                <div className="contacts__container">
                    {contacts.length ? (
                        <ul className="contacts__list">
                            {contacts.map(item => <Contact key={item.id} contact={item}
                                                           deleteContact={deleteContact} editContact={editContact}/>)}
                        </ul>
                    ) : (
                        <p>Еще нет доступных контактов</p>
                    )}

                    <Button
                        color="primary" size="small" variant="contained"
                        onClick={() => setIsShowAddForm(!isShowAddForm)}
                    >
                        {isShowAddForm ? "Закрыть форму добавления" : "Добавить контакт"}
                    </Button>

                    {isShowAddForm &&
                    <ContactForm className="contacts__add-form" buttonTitle="Добавить контакт" handleSubmit={addContact}
                                 id={userId}/>}
                </div>
            </div>
        </div>
    );
}

export default Profile;