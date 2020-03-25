const crypto = require('crypto');
const db = require('../database/connection');

module.exports = {

  async index(request, response) {
    // Obter a página
    const { page = 1 } = request.query;

    // Obter total de registros
    const [ count ] = await db('ongs')
      .count('* as qtde');
    response.header('X-Total-Count', count.qtde);

    // Obter os dados
    const dados = await db('ongs')
      .select('*')
      .limit(5)
      .offset((page - 1) * 5);
    
    // Retornando os dados
    return response.json(dados);
  },

  async create(request, response) {
    // Obter as variáveis
    const { name, email, whatsapp, city, uf } = request.body;

    // Gerar id da ong
    const id = crypto.randomBytes(4).toString('HEX');

    // Inserir os dados
    await db('ongs')
      .insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
      });

    // Retorno do id da ong
    return response.json({ id });
  },

}
