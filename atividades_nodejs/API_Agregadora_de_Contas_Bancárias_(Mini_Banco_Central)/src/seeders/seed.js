import sequelize from '../database/db.js';
import Usuario from '../models/User.js';
import Institution from '../models/Institution.js';
import Conta from '../models/Conta.js';
import { faker } from '@faker-js/faker';

const seedUsers = async () => {
try {

    const usuariosPadrao = [
    { nome: 'Luiz Fantin Neto', cpf: faker.string.numeric({ length: 11 }) },
    { nome: 'Wandreus Muhl Dourado', cpf: faker.string.numeric({ length: 11 }) },
    { nome: 'Gabriel Missio da Silva', cpf: faker.string.numeric({ length: 11 }) },
    ]

    const usuarios = Array.from({ length: 7 }).map(() => ({
    nome: faker.person.fullName(),
    cpf: faker.string.numeric({ length: 11 })
    }));

    await Usuario.bulkCreate(usuariosPadrao);
    await Usuario.bulkCreate(usuarios);

} catch (err) {
     // eslint-disable-next-line
    console.error('Erro ao popular banco de dados com usuários:', err);
}
};

const seedInstituicoes = async () => {
try {
    
    const instituicoesPadrao = [
    { nome: 'Itaú', cnpj: '60701190000104' },
    { nome: 'Banco do Brasil', cnpj: '00000000000191' },
    { nome: 'Santander', cnpj: '90400888000142' },
    { nome: 'Caixa Econômica Federal', cnpj: '00360305000104' }
    ];


    const instituicoes = Array.from({ length: 6 }).map(() => ({
    nome: faker.company.name(),
    cnpj: faker.string.numeric({ length: 14 })
    }));

    await Institution.bulkCreate(instituicoesPadrao);
    await Institution.bulkCreate(instituicoes);

} catch (err) {
     // eslint-disable-next-line
    console.error('Erro ao popular banco de dados com instituições:', err);
}
};

const seedContas = async () => {
    try {
    const usuarios = await Usuario.findAll();
    const instituicoes = await Institution.findAll();
    
    const contasPadrao = [
        {
            usuario: usuarios[0],
            instituicao: instituicoes[0],
            saldo: 5340.23,
        },
        {
            usuario: usuarios[1],
            instituicao: instituicoes[1],
            saldo: 3500.60,
        },
        {
            usuario: usuarios[2],
            instituicao: instituicoes[2],
            saldo: 7200.50,
        },
        {
        usuario: usuarios[3],
        instituicao: instituicoes[3],
        saldo: 1000.00,
        },
    ].map(({ usuario, instituicao, saldo }) => ({
        usuario_id: usuario.id,
        instituicao_id: instituicao.id,
        saldo,
        nome_usuario: usuario.nome,
        cpf_usuario: usuario.cpf,
        nome_instituicao: instituicao.nome,
    }));
    const contas = Array.from({ length: 2 }).map(() => {
        const usuario = usuarios[faker.number.int({ min: 0, max: usuarios.length - 1 })];
        const instituicao = instituicoes[faker.number.int({ min: 0, max: instituicoes.length - 1 })];

        return {
        usuario_id: usuario.id,
        instituicao_id: instituicao.id,
        saldo: faker.number.float({ min: 0, max: 10000, precision: 0.01 }),
        nome_usuario: usuario.nome,
        cpf_usuario: usuario.cpf,
        nome_instituicao: instituicao.nome,
        };
    });
    await Conta.bulkCreate(contasPadrao);
    await Conta.bulkCreate(contas);
    } catch (err) {
      // eslint-disable-next-line
    console.error('Erro ao popular banco de dados com contas:', err);
    }
};
const seedDatabase = async () => {
try {
    
    await sequelize.sync({ force: true });

    
    await seedUsers();
    await seedInstituicoes();
    await seedContas();
} catch (err) {
     // eslint-disable-next-line
    console.error('Erro ao sincronizar banco de dados:', err);
} finally {
    
    await sequelize.close();
}
};

seedDatabase();
