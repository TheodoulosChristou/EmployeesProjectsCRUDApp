using NCRApplicationAPI.Models;

namespace NCRApplicationAPI.Services.EmployeeService
{
    /*
     * Employee Service Interface which
     * initialises CRUD methods for Employees.
     * 
     */
   public interface IEmployeeService
    {
        Task<List<Employee>> GetAllEmployees();

        Task<List<Employee>> AddEmployee(Employee employee);

        Task<List<Employee>> DeleteEmployee(int id);

        Task<Employee> GetEmployee(int id);

        Task<List<Employee>> UpdateEmployee(Employee employee);
    }
}
