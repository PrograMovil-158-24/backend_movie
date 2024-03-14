import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Game} from '../models';
import {GameRepository} from '../repositories';

const baseUrl: string = '/games';
export class GameController {
  constructor(
    @repository(GameRepository)
    public gameRepository: GameRepository,
  ) {}

  @post(baseUrl)
  @response(200, {
    description: 'Game model instance',
    content: {'application/json': {schema: getModelSchemaRef(Game)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {
            title: 'NewGame',
          }),
        },
      },
    })
    game: Game,
  ): Promise<Game> {
    return this.gameRepository.create(game);
  }

  @get(`${baseUrl}/count`)
  @response(200, {
    description: 'Game model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Game) where?: Where<Game>): Promise<Count> {
    return this.gameRepository.count(where);
  }

  @get(baseUrl)
  @response(200, {
    description: 'Array of Game model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Game, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Game) filter?: Filter<Game>): Promise<Game[]> {
    return this.gameRepository.find(filter);
  }

  @patch(baseUrl)
  @response(200, {
    description: 'Game PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {partial: true}),
        },
      },
    })
    game: Game,
    @param.where(Game) where?: Where<Game>,
  ): Promise<Count> {
    return this.gameRepository.updateAll(game, where);
  }

  @get(`${baseUrl}/{id}`)
  @response(200, {
    description: 'Game model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Game, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Game, {exclude: 'where'}) filter?: FilterExcludingWhere<Game>,
  ): Promise<Game> {
    return this.gameRepository.findById(id, filter);
  }

  @patch(`${baseUrl}/{id}`)
  @response(204, {
    description: 'Game PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {partial: true}),
        },
      },
    })
    game: Game,
  ): Promise<void> {
    await this.gameRepository.updateById(id, game);
  }

  @put(`${baseUrl}/{id}`)
  @response(204, {
    description: 'Game PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() game: Game,
  ): Promise<void> {
    await this.gameRepository.replaceById(id, game);
  }

  @del(`${baseUrl}/{id}`)
  @response(204, {
    description: 'Game DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gameRepository.deleteById(id);
  }
}
