package com.mountacir.customer;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    private final CustomerRepository customer;

    public CustomerController(CustomerRepository customer) {
        this.customer = customer;
    }

    @GetMapping
    public List<Customer> getCustomers() {
        return customer.findAll();
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Integer id) {
        return customer.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    @PostMapping
    public void postCustomers(@RequestBody PostCustomer Data) {
        customer.save(new Customer(Data.name(), Data.email(), Data.age()));
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Integer id) {
        customer.deleteById(id);
    }

    @PutMapping("/{id}")
    public void putCustomer(@PathVariable Integer id, @RequestBody  PostCustomer Data) {
        Customer customerFound = customer.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        customerFound.setName(Data.name());
        customerFound.setEmail(Data.email());
        customerFound.setAge(Data.age());
        customer.save(customerFound);
    }
}
