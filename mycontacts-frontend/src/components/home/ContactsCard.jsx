import ContactSingleCard from "./ContactSingleCard";

function ContactsCard({ contacts }) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {contacts.map((contact) => 
            <ContactSingleCard key={contact._id} contact={contact}/>
        )}
    </div>
  )
}

export default ContactsCard;