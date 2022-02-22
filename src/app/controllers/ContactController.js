
const ContactsRepository = require("../repositories/ContactsRepository");



class ContactController {
    async index(request, response) {
            const {orderBy} = request.query;


        const contacts = await ContactsRepository.findAll(orderBy);

        response.json(contacts);
    }

    async show(request, response) {
        //Obter Um Registro 
        const { id } = request.params;
        const contact = await ContactsRepository.findById(id)

        if (!contact) {
            return response.status(404).json({ error: "Contact Not Found" })
        }

        response.json(contact)

    }

    async store(request, response) {
        //Criar um registro
        const { name, email, phone, category_id } = request.body

        if (!name) {
            return response.status(404).json({ error: "Name Is Required" })

        }
        const ContactExists = await ContactsRepository.findByEmail(email)

        if (ContactExists) {
            return response.status(404).json({ error: "this e-mail is already taken" })

        }

        const contact = await ContactsRepository.create({
            name,
            email,
            phone,
            category_id
        })

        response.json(contact)

    }


    async update(request, response) {
        //Editar um registro
        const { name, email, phone, category_id } = request.body

        const { id } = request.params

        const ContactExists = await ContactsRepository.findById(id)

        if (!ContactExists) {
            return response.status(404).json({ erro: 'User Not Found' })
        }

        if (!name) {
            return response.status(404).json({ error: "Name Is Required" })

        }


        const ContactByEmail = await ContactsRepository.findByEmail(email)
        if (ContactByEmail && ContactByEmail.id !== id ) {
            return response.status(404).json({ error: "this e-mail is already taken" })

        }

        const contact= await ContactsRepository.update(id,{name,email,phone,category_id})
        response.json(contact)


    }
    async delete(request, response) {
        //deletar um registro

        const { id } = request.params;
     

        await ContactsRepository.delete(id)

        response.sendStatus(204)

    }

}


module.exports = new ContactController();

