package com.backend.repository;

import com.backend.model.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface IEmployeeRepo extends PagingAndSortingRepository<Employee,Long> {
    List<Employee> searchByNameEmployeeContaining(String search);
}
