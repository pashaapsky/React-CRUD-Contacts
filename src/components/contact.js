import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ContactForm from "./contactForm";

function Contact({contact, editContact, deleteContact}) {
    const [isShowEditForm, setIsShowEditForm] = useState(false);

    return (
        <li className="contacts__item">
            <div className="contacts__info">
                <span>
                    <strong>Имя: </strong>
                    {contact.name}
                </span>

                <span>
                    <strong>Номер: </strong>
                    {contact.phone}
                </span>
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

            {isShowEditForm && <ContactForm className="contacts__edit-form" buttonTitle="Изменить контакт" values={contact} handleSubmit={editContact} contactId={contact.id}/>}
        </li>
    );
}

export default Contact;