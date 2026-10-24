const roomNodeJsonSchema = {
  bsonType: ['object', 'null'],
  required: ['id', 'name', 'x', 'y'],
  additionalProperties: false,
  properties: {
    id: {
      bsonType: 'string',
      minLength: 1,
      description: 'Identificador único da sala (obrigatório)',
    },
    name: {
      bsonType: 'string',
      minLength: 1,
      maxLength: 60,
      description: 'Nome de exibição da sala no mapa (obrigatório)',
    },
    x: {
      bsonType: ['int', 'double'],
      description: 'Coordenada X acoplada ao quadrado azul (obrigatório)',
    },
    y: {
      bsonType: ['int', 'double'],
      description: 'Distância vertical Y da sala (obrigatório)',
    },
  },
};

export const hospitalMapValidator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'isActive', 'basePosition', 'blueSquares'],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: 'objectId',
      },
      name: {
        bsonType: 'string',
        minLength: 1,
        description: 'Nome do mapa/ala hospitalar',
      },
      isActive: {
        bsonType: 'bool',
        description: 'Define se este é o mapa ativo em operação',
      },
      basePosition: {
        bsonType: 'object',
        required: ['x', 'y'],
        additionalProperties: false,
        properties: {
          x: { bsonType: ['int', 'double'] },
          y: { bsonType: ['int', 'double'] },
        },
      },
      blueSquares: {
        bsonType: 'array',
        description: 'Lista de quadrados azuis (bifurcações) do corredor',
        items: {
          bsonType: 'object',
          required: ['index', 'x', 'y', 'rooms'],
          additionalProperties: false,
          properties: {
            index: {
              bsonType: 'int',
              minimum: 1,
              description: 'Ordem sequencial do quadrado azul a partir da base',
            },
            x: { bsonType: ['int', 'double'] },
            y: { bsonType: ['int', 'double'] },
            rooms: {
              bsonType: 'object',
              required: ['left', 'right'],
              additionalProperties: false,
              properties: {
                left: roomNodeJsonSchema,
                right: roomNodeJsonSchema,
              },
            },
          },
        },
      },
    },
  },
};