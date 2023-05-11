using FluentAssertions.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NCRApplicationAPI.Data;
using NCRApplicationAPI.Models;

namespace NCRApplicationAPI.Services.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        //initialises a readable context
        private readonly DataContext _context;

        //constructs a context from DataContext
        public EmployeeService(DataContext context) {
            _context = context;
        }

        /*
         * Function which gets all the employees from 
         * the Database.
         */
        public async Task<List<Employee>> GetAllEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return employees;
        }

        /*
         * Function which add employee into 
         * the Database.
        */
        public async Task<List<Employee>> AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return await _context.Employees.ToListAsync();
        }

        /*
         * Function which delete employee from 
         * the Database.
        */
        public async Task<List<Employee>> DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if(employee == null)
            {
                return null;
            } else
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                return await _context.Employees.ToListAsync();
            }
        }

        /*
         * Function which get a single employee from 
         * the Database.
        */
        public async Task<Employee> GetEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if(employee == null)
            {
                return null;
            } else
            {
                return employee;
            }
        }

        /*
         * Function which updates an employee from 
         * the Database.
        */
        public async Task<List<Employee>> UpdateEmployee(Employee employee)
        {
            var emp = _context.Employees.Find(employee.Id);

            if(emp == null)
            {
                return null;
            } else
            {
                emp.Name = employee.Name;
                emp.Surname = employee.Surname;
                emp.DateOfBirth = employee.DateOfBirth.AddDays(+1);
                emp.PhoneNumber = employee.PhoneNumber;
                emp.Position = employee.Position;
                await _context.SaveChangesAsync();
                return await _context.Employees.ToListAsync();
            }
        }
    }
}
