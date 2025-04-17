import sequelize from '../database/db.js';
import {User as Usuario, Conta, Transacao, Instituicao as Institution} from '../models/associations.js'
import { faker } from '@faker-js/faker';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

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
            saldo: 10000.00,
        },
        {
            usuario: usuarios[1],
            instituicao: instituicoes[1],
            saldo: 10000.00,
        },
        {
            usuario: usuarios[2],
            instituicao: instituicoes[2],
            saldo: 10000.00,
        },
        {
        usuario: usuarios[3],
        instituicao: instituicoes[3],
        saldo: 10000.00,
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
const seedTransacoes = async () => {
    try {
        const contas = await Conta.findAll();
        const transacoes = [];
        
        if (contas.length === 0) {
             // eslint-disable-next-line
            console.warn('Nenhuma conta encontrada. Transações não serão criadas.');
            return;
        }
        
        for (let i = 0; i < 10; i++) {
            const contaOrigem = contas[faker.number.int({ min: 0, max: contas.length - 1 })];
            const contaDestino = contas[faker.number.int({ min: 0, max: contas.length - 1 })];

            if (contaOrigem.id === contaDestino.id) {
                continue;
            }

            const tipo = faker.helpers.arrayElement(['deposito', 'saque', 'transferencia']);
            const valor = faker.number.float({ min: 10, max: 1000, precision: 0.01 });
            const descricao = tipo === 'deposito'
                ? faker.helpers.arrayElement([
                    'Depósito via app', 'Transferência recebida', 'Pix recebido', 
                    'Depósito em dinheiro', 'Depósito via terminal bancário', 
                    'Depósito realizado por transferência', 'Depósito por cheque compensado', 
                    'Depósito de valor em caixa eletrônico', 'Depósito realizado via terminal bancário',
                    'Depósito'
                ])
                : tipo === 'transferencia'
                ? faker.helpers.arrayElement(['Transferência efetuada', 'Transferência'])
                : faker.helpers.arrayElement([
                    'Saque em caixa eletrônico',
                    'Saque realizado com cartão', 'Saque no caixa eletrônico',
                    'Saque local', 'Saque'
                ]);

            const data = dayjs
                .tz(faker.date.past(12, new Date()), 'America/Sao_Paulo')
                .toDate();

            transacoes.push({
                conta_id: contaOrigem.id,
                conta_destino_id: tipo === 'transferencia' ? contaDestino.id : null,
                tipo,
                valor,
                descricao,
                createdAt: data,
                updatedAt: data,
            });

            if (tipo === 'deposito') {
                contaOrigem.saldo = parseFloat(contaOrigem.saldo) + valor;
                await contaOrigem.save();
            } else if (tipo === 'saque') {
                contaOrigem.saldo = parseFloat(contaOrigem.saldo) - valor;
                await contaOrigem.save();
            } else if (tipo === 'transferencia') {
                contaOrigem.saldo = parseFloat(contaOrigem.saldo) - valor;
                contaDestino.saldo = parseFloat(contaDestino.saldo) + valor;
                await contaOrigem.save();
                await contaDestino.save();
            }
        }

        await Transacao.bulkCreate(transacoes);
        
    } catch (err) {
         // eslint-disable-next-line
        console.error('Erro ao popular banco de dados com transações:', err);
    }
};
const seedDatabase = async () => {
try {
    
    await sequelize.sync({ force: true });

    
    await seedUsers();
    await seedInstituicoes();
    await seedContas();
    await seedTransacoes();
} catch (err) {
     // eslint-disable-next-line
    console.error('Erro ao sincronizar banco de dados:', err);
} finally {
    
    await sequelize.close();
}
};

seedDatabase();
