const db = require('../database/connection');

module.exports = {

  async index(request, response) {
    // Obter id da ong
    const ong_id = request.headers.authorization;
    
    // Obter incidentes por ong
    const dados = await db('incidents')
      .select('*')
      .where('ong_id', ong_id);
    
    // Retornar os dados
    return response.json(dados);
  },

};
