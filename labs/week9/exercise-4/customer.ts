export class Customer {
    private firstName: string
    private lastName: string
    private age: number

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName
        this.lastName = lastName
        this.GetAge()
    }

    public greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`)
    }

    public GetAge() {
        return this.age
    }
}

let customer = new Customer("John", "Smith", 10)
customer.greeter()


