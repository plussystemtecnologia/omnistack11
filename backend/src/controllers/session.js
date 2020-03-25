const db = require('../database/connection');

module.exports = {

  async create(request, response) {
    // Obter id da ong
    const { id } = request.body;

    // Validando id da ong
    const ong = await db('ongs')
      .select('name')
      .where('id', id)
      .first();
    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    // Retorno do o nome da ong
    return response.json(ong);
  },

};
