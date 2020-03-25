const db = require('../database/connection');

module.exports = {

  async index(request, response) {
    // Obter a página
    const { page = 1 } = request.query;

    // Obter total de registros
    const [ count ] = await db('incidents')
      .count('* as qtde');
    response.header('X-Total-Count', count.qtde);
    
    // Obter os dados
    const dados = await db('incidents')
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5);

    // Retornando os dados
    return response.json(dados);
  },

  async create(request, response) {
    // Obter as variáveis
    const {title, description, value} = request.body;
    
    // Obter o código da ong
    const ong_id = request.headers.authorization;
    
    // Inserir os dados
    const [ id ] = await db('incidents')
      .insert({
        ong_id,
        title,
        description,
        value,
      });
    
    // Retorno do id do incidente
    return response.json({ id });
  },

  async delete(request, response) {
    // Obter id do incidente
    const { id } = request.params;
    
    // Obter id da ong
    const ong_id = request.headers.authorization;
    
    // Validando id do acidente
    const title = await db('incidents')
      .select('title')
      .where('id', id)
      .first();
    if (!title) {
      return response.status(400).json({ error: 'No Incident found with this ID' });
    }
    
    // Validando se o incidente é da ong
    const incident = await db('incidents')
      .select('ong_id')
      .where('id', id)
      .first();
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({error: 'Operation not permitted!'});
    }
    
    // Excluindo o registro
    await db('incidents')
      .delete()
      .where('id', id);
    
    // Retorno
    return response.status(204).send();
  },

};
