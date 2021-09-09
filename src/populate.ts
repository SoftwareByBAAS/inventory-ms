import faker from 'faker';
import mongoose from 'mongoose';
import { Db } from 'mongodb';
import connectDb from './utils/connectDb';

class Random {
	supplierIds: string[];
	categoryIds: string[];
	productIds: string[];
	changeLogIds: string[];

	constructor() {
		this.supplierIds = [];
		this.categoryIds = [];
		this.productIds = [];
		this.changeLogIds = [];
	}

	private randomNumber = (length: number) => {
		return Math.floor(Math.random() * length);
	};

	addId(type: 'supplier' | 'category' | 'product' | 'changeLog', id: string): void {
		switch (type) {
			case 'supplier':
				this.supplierIds.push(id);
				break;
			case 'category':
				this.categoryIds.push(id);
				break;
			case 'product':
				this.supplierIds.push(id);
				break;
			case 'changeLog':
				this.changeLogIds.push(id);
				break;
			default:
				return;
		}
	}

	getRandomSupplier(): string {
		return this.supplierIds[this.randomNumber(this.supplierIds.length)];
	}
	getRandomCategory(): string {
		return this.categoryIds[this.randomNumber(this.categoryIds.length)];
	}
	getRandomProduct(): string {
		return this.productIds[this.randomNumber(this.productIds.length)];
	}
	getRandomChangeLog(): string {
		return this.changeLogIds[this.randomNumber(this.changeLogIds.length)];
	}
}

async function main() {
	let result: any;
	const random: Random = new Random();

	try {
		await connectDb();

		const db: Db = mongoose.connection.db;

		console.log('Dropping database...');
		await db.dropDatabase();
		console.log('Database dropped!');

		console.log('Creating Suppliers...');
		for (let i = 0; i < 200; i++) {
			let supplier = {
				name: faker.company.companyName(),
				phone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				address: {
					lineOne: faker.address.streetAddress(),
					lineTwo: '',
					city: faker.address.city(),
					state: faker.address.state(),
					country: faker.address.country(),
					postalCode: faker.address.zipCode(),
				},
			};

			result = await db.collection('suppliers').insertOne(supplier);
			random.addId('supplier', result.ops[0]._id);
		}
		console.log('Suppliers created!');

		console.log('Creating Categories...');
		for (let i = 0; i < 100; i++) {
			let category = {
				name: faker.commerce.department(),
				description: faker.lorem.sentences(2),
			};

			result = await db.collection('categories').insertOne(category);
			random.addId('category', result.ops[0]._id);
		}
		console.log('Categories created!');

		console.log('Creating Products...');
		for (let i = 0; i < 1000; i++) {
			let product = {
				category: random.getRandomCategory(),
				supplier: random.getRandomSupplier(),
				description: faker.commerce.productDescription(),
				quantity: faker.datatype.number(100),
				name: faker.commerce.productName(),
				unitType: faker.commerce.productMaterial(),
				price: faker.commerce.price(),
				image: faker.image.sports(),
			};

			result = await db.collection('products').insertOne(product);
			random.addId('product', result.ops[0]._id);
		}
		console.log('Products Created!');

		console.log('DB Populated!');
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

main();
