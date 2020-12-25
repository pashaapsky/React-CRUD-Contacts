import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from "../context/AuthContext";
import Fuse from 'fuse.js'
import axios from "../axios";
import Button from "@material-ui/core/Button";
import Contact from "../components/contact";
import ContactForm from "../components/contactForm";

import '../scss/profile.scss'
import '../scss/contacts.scss'


function Profile(props) {
    const {user, logout} = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isShowAddForm, setIsShowAddForm] = useState(false);

    const addContact = async (values) => {
        try {
            await axios.post('/contacts', {
                "name": values.name,
                "phone": values.phone,
                "userId": userId
            });

            const newContacts = await axios.get('/contacts')
                .then(res => res.data.filter(item => item.userId === userId));

            if (newContacts) {
                setContacts(newContacts);
            }
        } catch (e) {
            console.error(e.message)
        }
    };

    const deleteContact = async (contactId) => {
        try {
            await axios.delete(`/contacts/${contactId}`);

            const newContacts = await axios.get('/contacts')
                .then(res => res.data.filter(item => item.userId === userId));

            if (newContacts) {
                setContacts(newContacts);
            }
        } catch (e) {
            console.error(e.message)
        }
    };

    const editContact = async (values, contactId) => {
        try {
            await axios.patch(`/contacts/${contactId}`, {
                "name": values.name,
                "phone": values.phone
            });

            const newContacts = await axios.get('/contacts')
                .then(res => res.data.filter(item => item.userId === userId));

            if (newContacts) {
                setContacts(newContacts);
            }
        } catch (e) {
            console.error(e.message)
        }
    };

    async function getUserContacts(user) {
        try {
            const userId = await axios.get('/users')
                .then(res => {
                    const userItem = res.data.filter(item => item.email === user.email);

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

    useEffect(() => {
        getUserContacts(user);
    }, [user]);


    // поиск контактов
    useEffect(() => {
        const fuse = new Fuse(contacts, {
            keys: ['phone', 'name'],
        });

        const results = fuse.search(searchTerm).map(({item}) => item);

        if (contacts.length > 0 && searchTerm.length > 2 && results.length > 0) {
            setContacts(results);
        } else {
            getUserContacts(user);
        }
    }, [searchTerm, user]);


    return (
        <div className="profile">
            <div className="profile__header">
                <h1 className="profile__heading">Profile Page</h1>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder="Поиск по контактам"
                />

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
                    <ContactForm
                        className="contacts__add-form"
                        buttonTitle="Добавить контакт"
                        handleSubmit={addContact}
                        contactId={userId}
                    />}
                </div>
            </div>
        </div>
    );
}

export default Profile;