import css from 'components/ContactList/ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li className={css.li} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={css.btn}
              id={contact.id}
              onClick={() => deleteContact(contact.id)}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
