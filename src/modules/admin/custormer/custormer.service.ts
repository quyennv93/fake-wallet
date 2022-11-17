import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Customer } from 'src/entities/custormer.entity';
import { CustomerType } from 'src/enums/custormer.enum';
import { CustomerException } from 'src/exceptions/customer.exception';
import { FindOneOptions, Like } from 'typeorm';
import { CustomerRepository } from './customer.repository';
import { CreateCustormerPersonalDto } from './dto/create-custormer-personal.dto';
import {
  CustomerPageDto,
  CustomerPageOptionsDto,
} from './dto/custormer-pagination.dto';
import { CustomerDetailDto, CustomerDto } from './dto/custormer.dto';

@Injectable()
export class CustormerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async findAll(queryDto: CustomerPageOptionsDto): Promise<CustomerPageDto> {
    let where: FindOneOptions<Customer>['where'] = null;
    if (queryDto.query) {
      where = [
        { email: Like(`%${queryDto.query}`) },
        { fullName: Like(`%${queryDto.query}`) },
      ];
    }
    const pageDto = await this.customerRepository.pagination(
      queryDto,
      where,
      {},
      CustomerDto,
    );
    return pageDto;
  }
  async findOne(id: number): Promise<CustomerDetailDto> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    return plainToInstance(CustomerDetailDto, customer);
  }

  async toggerActive(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException('customer not found');
    }
    customer.status = !customer.status;
    return await this.customerRepository.save(customer);
  }

  async createPersonalCustomer(
    createCustomerDto: CreateCustormerPersonalDto,
  ): Promise<CustomerDto> {
    const phoneNumber = createCustomerDto.phoneNumber;
    const customer = await this.customerRepository.findByPhone(phoneNumber);
    if (customer) {
      throw CustomerException.phoneExited();
    }
    const newCustomer = plainToInstance(Customer, createCustomerDto);
    newCustomer.type = CustomerType.PERSONAL;
    const savedCustomer = await this.customerRepository.save(newCustomer);
    return plainToInstance(CustomerDto, savedCustomer);
  }
}
