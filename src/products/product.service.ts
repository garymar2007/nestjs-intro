/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product';

@Injectable()
export class ProductService {
    products: Product[] = [];

    insertProduct(title:string, desc: string, price: number){
        const prodId = new Date().getTime().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getAllProducts(){
        return [...this.products];
    }

    getSingleProduct(prodId: string){
        const product = this.findProduct(prodId)[0];
        return {...product};
    }

    updateProduct(prodId: string, title:string, desc: string, price: number) {
        const [product, index] = this.findProduct(prodId);
        const updateProduct = {...product, }
        if(title) {
            updateProduct.title = title;
        }
        if(desc) {
            updateProduct.description = desc;
        }
        if(price){
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;
        return updateProduct;
    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.slice(index, 1);
    }

    private findProduct(prodId: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === prodId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product with product id: ' + prodId);
        }
        return [product, productIndex];
    }
}
