
const CategoryRepository = require("../repositories/CategoryRepository");


class CategoryController {
    async index(request, response) {
        const {orderBy} = request.query;


        const categories = await CategoryRepository.findAll(orderBy);

        response.json(categories);
    }

    async show(request, response) {
        //Obter Um Registro 
        const { id } = request.params;
        const contact = await CategoryRepository.findById(id)

        if (!contact) {
            return response.status(404).json({ error: "Contact Not Found" })
        }

        response.json(contact)

    }

    async store(request, response) {
        //Criar um registro
        const { name} = request.body

        if (!name) {
            return response.status(404).json({ error: "Name Is Required" })
        }
        
       

        const category = await CategoryRepository.create({
            name,
    
        })

        response.json(category)

    }


    async update(request, response) {
        //Editar um registro
        const { name, email, phone, category_id } = request.body

        const { id } = request.params

        const ContactExists = await CategoryRepository.findById(id)

        if (!ContactExists) {
            return response.status(404).json({ erro: 'User Not Found' })
        }

        if (!name) {
            return response.status(404).json({ error: "Name Is Required" })

        }


        const ContactByEmail = await CategoryRepository.findByEmail(email)
        if (ContactByEmail && ContactByEmail.id !== id ) {
            return response.status(404).json({ error: "this e-mail is already taken" })

        }

        const contact= await CategoryRepository.update(id,{name,email,phone,category_id})
        response.json(contact)


    }
    async delete(request, response) {
        //deletar um registro

        const { id } = request.params;
     

        await CategoryRepository.delete(id)

        response.sendStatus(204)

    }

}


module.exports = new CategoryController();

