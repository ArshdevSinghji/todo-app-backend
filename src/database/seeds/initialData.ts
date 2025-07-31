// import { Customer } from 'src/customer/entities/customer.entity';
// import { DataSource } from 'typeorm';
// import { Seeder, SeederFactoryManager } from 'typeorm-extension';

// export class InitialCustomerData implements Seeder {
//   public async run(
//     dataSource: DataSource,
//     factoryManager: SeederFactoryManager,
//   ): Promise<any> {
//     const customerRepository = dataSource.getRepository(Customer);

//     const existingCustomers = await customerRepository.find();
//     if (existingCustomers.length > 0) {
//       console.log('Customer already exist, skipping seeding.');
//       return;
//     }

//     const userData = [
//       {
//         name: 'John Snow',
//         phoneNumber: '7876XXXYYY',
//         email: 'johnSnow@gmail.com',
//       },
//       {
//         name: 'Robb Stark',
//         phoneNumber: '7876XXXZZZ',
//         email: 'robbStark@gmail.com',
//       },
//     ];

//     await customerRepository.save(userData);
//     console.log('Seeding successful!');
//   }
// }
