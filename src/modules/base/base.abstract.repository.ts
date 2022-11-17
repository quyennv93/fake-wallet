import { plainToInstance } from 'class-transformer';
import { PageMetaDto } from 'src/common/pagination/page-meta.dto';
import { PageOptionsDto } from 'src/common/pagination/page-options.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import {
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export abstract class BaseAbstractRepository<T> extends Repository<T> {
  private repository: Repository<T>;
  protected constructor(repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner);
    this.repository = repository;
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  public async findOneByIdOrFail(id: number | string): Promise<T> {
    const condition = {
      where: {
        id: id,
      },
    } as FindOneOptions;
    return this.repository.findOneOrFail(condition);
  }

  public async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  public async pagination(
    pageOptionsDto: PageOptionsDto,
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    orderOption?: FindOptionsOrder<T>,
    dto?: any,
    relations?: FindOptionsRelations<T>,
  ): Promise<PageDto<any>> {
    const entities = await this.repository.find({
      skip: (pageOptionsDto.page - 1) * pageOptionsDto.take || 0,
      where,
      order: {
        [pageOptionsDto.orderBy]: pageOptionsDto.order,
        ...orderOption,
      },
      relations,
    });
    const itemCount = await this.repository.count({
      where,
    });
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    if (dto) {
      return new PageDto<T>(
        entities.map((entity: T) => {
          return plainToInstance(dto, entity);
        }),
        pageMetaDto,
      );
    }
    return new PageDto<T>(entities, pageMetaDto);
  }

  public async convertToPagination(
    entities: T[],
    itemCount: number,
    pageOptionsDto: PageOptionsDto,
    dto?: any,
  ): Promise<PageDto<any>> {
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    if (dto) {
      return new PageDto<T>(
        entities.map((entity) => {
          return plainToInstance(dto, entity);
        }),
        pageMetaDto,
      );
    }
    return new PageDto<T>(entities, pageMetaDto);
  }
}
