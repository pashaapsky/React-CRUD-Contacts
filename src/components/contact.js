import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ContactForm from "./contactForm";

function Contact({contact, editContact, deleteContact}) {
    const [isShowEditForm, setIsShowEditForm] = useState(false);

    return (
        <li className="contacts__item">
            <div className="contacts__info">
                <span>{contact.name}</span>
                <span>{contact.phone}</span>
            </div>

            <div className="contacts__actions">
                <Button
                    color="secondary" size="small" variant="contained"
                    onClick={() => setIsShowEditForm(!isShowEditForm)}
                >
                    {isShowEditForm ? "Закрыть форму изменения" : "Изменить контакт"}
                </Button>

                <Button color="secondary" size="small" variant="contained"
                    onClick={() => deleteContact(contact.id)}
                >
                    Удалить контакт
                </Button>
            </div>

            {isShowEditForm && <ContactForm className="contacts__add-form" buttonTitle="Изменить контакт" values={contact} handleSubmit={editContact} id={contact.id}/>}
        </li>
    );
}

export default Contact;